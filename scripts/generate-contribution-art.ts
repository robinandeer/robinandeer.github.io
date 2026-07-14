import fs from 'node:fs/promises';
import path from 'node:path';
import RunwayML from '@runwayml/sdk';

const GITHUB_USERNAME = 'robinandeer';
const OUTPUT_DIR = path.join(import.meta.dirname, '..', 'public', 'generated');
const OUTPUT_IMAGE = path.join(OUTPUT_DIR, 'contribution-art.webp');
const OUTPUT_META = path.join(OUTPUT_DIR, 'contribution-art.json');

type ContributionDay = { contributionCount: number; date: string };
type ContributionWeek = { contributionDays: Array<ContributionDay> };
type WeekProfile = {
	total: number;
	peak: number;
	activeDays: number;
	intensity: 'silent' | 'sparse' | 'moderate' | 'dense' | 'intense';
};

// ── GitHub data fetching ──────────────────────────────────────────

const GITHUB_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

async function fetchContributions() {
	const token = process.env.GITHUB_TOKEN;
	if (!token) throw new Error('GITHUB_TOKEN is required');

	const response = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			Authorization: `bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: GITHUB_QUERY,
			variables: { username: GITHUB_USERNAME },
		}),
	});

	const json = await response.json();
	const calendar =
		json.data?.user?.contributionsCollection?.contributionCalendar;

	if (!calendar) throw new Error('Could not fetch contribution data');

	return {
		totalContributions: calendar.totalContributions as number,
		weeks: calendar.weeks.slice(-12) as Array<ContributionWeek>,
	};
}

// ── Pattern analysis ──────────────────────────────────────────────

function classifyIntensity(total: number): WeekProfile['intensity'] {
	if (total === 0) return 'silent';
	if (total <= 5) return 'sparse';
	if (total <= 15) return 'moderate';
	if (total <= 30) return 'dense';
	return 'intense';
}

function analyzeWeeks(weeks: Array<ContributionWeek>): Array<WeekProfile> {
	return weeks.map((week) => {
		const counts = week.contributionDays.map((d) => d.contributionCount);
		const total = counts.reduce((a, b) => a + b, 0);
		return {
			total,
			peak: Math.max(...counts),
			activeDays: counts.filter((c) => c > 0).length,
			intensity: classifyIntensity(total),
		};
	});
}

function describeRhythm(profiles: Array<WeekProfile>): string {
	const intensities = profiles.map((p) => p.intensity);
	const totals = profiles.map((p) => p.total);
	const trend = totals[totals.length - 1] - totals[0];
	const silentCount = intensities.filter((i) => i === 'silent').length;
	const intenseCount = intensities.filter((i) => i === 'intense').length;

	const fragments: Array<string> = [];

	if (silentCount >= 6) {
		fragments.push('mostly empty with isolated clusters');
	} else if (intenseCount >= 4) {
		fragments.push('densely packed throughout');
	} else if (intenseCount >= 2 && silentCount >= 2) {
		fragments.push('alternating between dense clusters and open space');
	} else {
		fragments.push('evenly distributed, uniform rhythm');
	}

	if (trend > 15) {
		fragments.push('density increasing from left to right');
	} else if (trend < -15) {
		fragments.push('density decreasing from left to right');
	}

	return fragments.join('. ');
}

function describeFlow(profiles: Array<WeekProfile>): string {
	const mapping: Record<WeekProfile['intensity'], string> = {
		silent: 'empty space, no circles',
		sparse: 'a few small scattered circles',
		moderate: 'medium circles connected by thin lines',
		dense:
			'tightly packed circles of varying sizes connected by lines wrapping around pegs',
		intense: 'dense clusters of concentric circles linked by bold lines',
	};
	const segments = profiles.map((p) => mapping[p.intensity]);

	const unique = segments.filter((s, i) => i === 0 || s !== segments[i - 1]);
	return unique.join(', then ');
}

// ── Prompt construction ───────────────────────────────────────────

function buildPrompt(profiles: Array<WeekProfile>): string {
	const rhythm = describeRhythm(profiles);
	const flow = describeFlow(profiles);
	const weekTotal = profiles.reduce((sum, p) => sum + p.total, 0);

	const density =
		weekTotal > 200
			? 'dense and intricate'
			: weekTotal > 100
				? 'moderately filled'
				: weekTotal > 40
					? 'sparse and open'
					: 'nearly empty, very minimal';

	return [
		'Flat graphic generative art composition.',
		'Circles of varying sizes connected by thin lines wrapping around pegs, arranged in a loose grid pattern.',
		`The composition is ${density}, with density varying across the image: ${flow}.`,
		`Overall rhythm: ${rhythm}.`,
		'Strict limited color palette: black, white, and one accent color (teal).',
		'Clean vector aesthetic, no gradients, no shadows, no 3D, no texture.',
		'Flat solid fills only. Hard edges. Graphic design quality.',
		'The overall pattern should evoke a data visualization or contribution grid reimagined as abstract art.',
		'No text, no letters, no borders, no frame, no background outside the composition.',
	].join(' ');
}

// ── Image generation ──────────────────────────────────────────────

async function generateArtifact(prompt: string): Promise<string> {
	const client = new RunwayML();

	console.log('🎨 Generating artifact with Runway...');
	console.log('Prompt:', prompt);

	const task = client.textToImage.create({
		model: 'gen4_image',
		promptText: prompt,
		ratio: '1080:1080',
	});

	const result = await task.waitForTaskOutput();
	const imageUrl = result.output[0];

	if (!imageUrl) throw new Error('No image URL in Runway response');

	return imageUrl;
}

async function downloadImage(url: string, dest: string) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Failed to download: ${response.status}`);
	const buffer = await response.arrayBuffer();
	await fs.writeFile(dest, Buffer.from(buffer));
	console.log(`📁 Saved to ${dest}`);
}

// ── Main ──────────────────────────────────────────────────────────

async function main() {
	console.log('🔍 Fetching GitHub contribution data...');
	const { totalContributions, weeks } = await fetchContributions();
	const profiles = analyzeWeeks(weeks);

	const weekTotals = profiles.map((p) => p.total);
	console.log(
		`📊 12-week totals: [${weekTotals.join(', ')}] (${totalContributions} total this year)`,
	);

	const prompt = buildPrompt(profiles);

	const imageUrl = await generateArtifact(prompt);

	await fs.mkdir(OUTPUT_DIR, { recursive: true });
	await downloadImage(imageUrl, OUTPUT_IMAGE);

	const firstDate = weeks[0].contributionDays[0].date;
	const lastDate =
		weeks[weeks.length - 1].contributionDays[
			weeks[weeks.length - 1].contributionDays.length - 1
		].date;

	const now = new Date();
	const weekNumber = Math.ceil(
		(now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) /
			(7 * 24 * 60 * 60 * 1000),
	);

	const metadata = {
		generatedAt: now.toISOString(),
		weekNumber,
		year: now.getFullYear(),
		dateRange: { start: firstDate, end: lastDate },
		totalContributions,
		weekTotals,
		prompt,
		imageUrl,
	};

	await fs.writeFile(OUTPUT_META, JSON.stringify(metadata, null, '\t'));
	console.log(`📝 Metadata saved to ${OUTPUT_META}`);
	console.log('✅ Done!');
}

main().catch((error) => {
	console.error('❌ Generation failed:', error);
	process.exit(1);
});
