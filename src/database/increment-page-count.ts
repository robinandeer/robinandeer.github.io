import client from './client'

export async function incrementPageCount(url: string): Promise<void> {
  const [year, week] = getWeekNumber()
  await client.incr(getPageKey(url, year, week))
}

function getPageKey(url: string, year: number, week: number): string {
  return `page:${url}:${year}-${week}`
}

/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
export default function getWeekNumber(date: Date = new Date()): [number, number] {
  // Copy date so don't modify original
  const internalDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  internalDate.setUTCDate(internalDate.getUTCDate() + 4 - (internalDate.getUTCDay() || 7))

  // Get first day of year
  const yearStart = new Date(Date.UTC(internalDate.getUTCFullYear(), 0, 1))

  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((internalDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)

  // Return array of year and week number
  return [internalDate.getUTCFullYear(), weekNo]
}
