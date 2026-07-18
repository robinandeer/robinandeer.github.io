import { getGitHubHeatmapData } from 'data/github-contributions';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = await getGitHubHeatmapData();

	return NextResponse.json(data, {
		headers: {
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
		},
	});
}
