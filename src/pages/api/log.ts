import type { NextApiRequest, NextApiResponse } from 'next'
import Redis from 'ioredis'
import getWeekNumber from 'utils/get-week-number'

function getPageKey(url: string, year: number, week: number): string {
  return `page:${url}:${year}-${week}`
}

const client = new Redis(process.env.REDIS_CONNECTION_STRING)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const url = req.body.url
    const [year, week] = getWeekNumber()
    await client.incr(getPageKey(url, year, week))
    res.status(200).json({ status: 'OK' })
  } else {
    res.status(400)
  }
}
