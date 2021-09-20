import incrementPageCount from 'database/increment-page-count'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    await incrementPageCount(req.body.url)
    res.status(200).json({ status: 'OK' })
  } else {
    res.status(400)
  }
}
