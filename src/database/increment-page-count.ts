import client from './client'
import getWeekNumber from './get-week-number'

function getPageKey(url: string, year: number, week: number): string {
  return `page:${url}:${year}-${week}`
}

export default async function incrementPageCount(url: string): Promise<void> {
  const [year, week] = getWeekNumber()
  await client.incr(getPageKey(url, year, week))
}
