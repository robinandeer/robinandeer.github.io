import { NextResponse } from 'next/server';

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

export async function GET() {
	const token = process.env.GITHUB_TOKEN;

	if (!token) {
		return NextResponse.json(
			{ totalContributions: 0, weeks: [] },
			{ headers: { 'Cache-Control': 'no-cache' } },
		);
	}

	const response = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {
			Authorization: `bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
	});

	const json = await response.json();
	const calendar =
		json.data?.user?.contributionsCollection?.contributionCalendar;

	if (!calendar) {
		return NextResponse.json(
			{ totalContributions: 0, weeks: [] },
			{ status: 200 },
		);
	}

	const recentWeeks = calendar.weeks.slice(-12);

	return NextResponse.json(
		{
			totalContributions: calendar.totalContributions,
			weeks: recentWeeks.map(
				(w: { contributionDays: Array<{ contributionCount: number }> }) =>
					w.contributionDays.map((d) => d.contributionCount),
			),
		},
		{
			headers: {
				'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
			},
		},
	);
}
