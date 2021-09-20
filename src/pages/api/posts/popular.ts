import getPopularPosts from 'database/get-popular-posts'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const blogPosts = await getPopularPosts()
    res.status(200).json({ blogPosts })
  } else {
    res.status(400)
  }
}
