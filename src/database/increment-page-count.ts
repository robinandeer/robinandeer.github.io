import {Redis} from '@upstash/redis';
import getWeekNumber from './get-week-number';

function getPageKey(url: string, year: number, week: number): string {
	return `page:${url}:${year}-${week}`;
}

export default async function incrementPageCount(url: string): Promise<void> {
	const [year, week] = getWeekNumber();
	const redis = Redis.fromEnv();
	await redis.incr(getPageKey(url, year, week));
}
