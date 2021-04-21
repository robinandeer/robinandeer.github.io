import React from 'react'
import Head from 'next/head'
import { getBlogPostPreviews } from 'api'
import { GetStaticProps } from 'next'
import { EncodableBlogPostMetadata } from 'types'
import BlogPost from 'utils/blog-post'
import BlogScreen from 'screens/blog'
import { getPopularBlogPosts } from 'database'

interface PageProps {
  posts: EncodableBlogPostMetadata[]
  popularPosts: EncodableBlogPostMetadata[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const result = getBlogPostPreviews()
  const posts = result.map(BlogPost.jsonify)
  const byPopularity = await getPopularBlogPosts()

  const popularPosts = byPopularity
    .map((item) => posts.find((post) => post.slug === item.slug))
    .filter((post) => post !== undefined)
    .slice(0, 3)

  return { props: { posts, popularPosts }, revalidate: 60 * 60 * 24 * 7 }
}

const PAGE_TITLE = 'Blog - Robin Andeer'
const PAGE_DESCRIPTION = 'Thoughts on programming, tech, and my personal life.'
const PAGE_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/blog`

const BlogPage: React.FC<PageProps> = ({ posts, popularPosts }) => {
  const blogPosts = React.useMemo(() => posts.map(BlogPost.parse), [posts])
  const popularBlogPosts = React.useMemo(() => popularPosts.map(BlogPost.parse), [popularPosts])

  return (
    <>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />

        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
      </Head>

      <BlogScreen posts={blogPosts} popular={popularBlogPosts} />
    </>
  )
}

export default BlogPage
