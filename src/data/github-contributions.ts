import { unstable_cache } from 'next/cache';

const GITHUB_USERNAME = 'robinandeer';

const query = `
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

export type GitHubHeatmapData = {
	totalContributions: number;
	weeks: Array<Array<number>>;
};

const emptyHeatmap: GitHubHeatmapData = {
	totalContributions: 0,
	weeks: [],
};

async function fetchGitHubHeatmapData(): Promise<GitHubHeatmapData> {
	const token = process.env.GITHUB_TOKEN;
	if (!token) {
		return emptyHeatmap;
	}

	const response = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			Authorization: `bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
		next: { revalidate: 3600 },
	});

	if (!response.ok) {
		return emptyHeatmap;
	}

	const json = await response.json();
	const calendar =
		json.data?.user?.contributionsCollection?.contributionCalendar;

	if (!calendar) {
		return emptyHeatmap;
	}

	const recentWeeks = calendar.weeks.slice(-12);

	return {
		totalContributions: calendar.totalContributions,
		weeks: recentWeeks.map(
			(w: { contributionDays: Array<{ contributionCount: number }> }) =>
				w.contributionDays.map((d) => d.contributionCount),
		),
	};
}

/**
 * Contribution calendar for the homepage heatmap.
 * Cached ~1h (`unstable_cache` + fetch revalidate). Full Cache Components
 * (`cacheComponents`) is too invasive for this mostly-static site.
 */
export const getGitHubHeatmapData = unstable_cache(
	fetchGitHubHeatmapData,
	['github-heatmap', GITHUB_USERNAME],
	{ revalidate: 3600 },
);
