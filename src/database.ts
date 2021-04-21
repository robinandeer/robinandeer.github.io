import Redis from 'ioredis'

interface PageStats {
  slug: string
  views: number
}

const client = new Redis(process.env.REDIS_CONNECTION_STRING)

export async function getPopularBlogPosts(): Promise<PageStats[]> {
  const keys = await client.keys('page:/blog/*')
  const values = await client.mget(keys)

  const groupedStats = keys.reduce<{ [key: string]: number }>((data, key, index) => {
    const slug = key.split(':')[1].replace('/blog/', '')
    data[slug] = parseInt(values[index])
    return data
  }, {})

  return Object.entries(groupedStats)
    .map<PageStats>(([slug, views]) => ({ slug, views }))
    .sort((a, b) => b.views - a.views)
}
