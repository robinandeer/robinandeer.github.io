import {Redis} from '@upstash/redis';

interface PageStats {
  slug: string
  views: number
}

export default async function getPopularPosts(): Promise<PageStats[]> {
	const redis = Redis.fromEnv();

	const keys = await redis.keys('page:/blog/*');

	if (keys.length === 0) {
		return [];
	}

	const values = await redis.mget(...keys);

	const groupedStats = keys.reduce<{ [key: string]: number }>((data, key, index) => {
		const slug = key.split(':')[1].replace('/blog/', '');

		const pageValue = values[index] as string;
		if (pageValue) {
			data[slug] = parseInt(pageValue, 10);
		}

		return data;
	}, {});

	return Object.entries(groupedStats)
		.map<PageStats>(([slug, views]) => ({slug, views}))
		.sort((a, b) => b.views - a.views);
}
