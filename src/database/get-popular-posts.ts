import client from './client'

interface PageStats {
  slug: string
  views: number
}

export default async function getPopularPosts(): Promise<PageStats[]> {
  const keys = await client.keys('page:/blog/*')
  const values = await client.mget(keys)

  const groupedStats = keys.reduce<{ [key: string]: number }>((data, key, index) => {
    const slug = key.split(':')[1].replace('/blog/', '')

    const pageValue = values[index]
    if (pageValue) {
      data[slug] = parseInt(pageValue)
    }

    return data
  }, {})

  return Object.entries(groupedStats)
    .map<PageStats>(([slug, views]) => ({ slug, views }))
    .sort((a, b) => b.views - a.views)
}
