import React from 'react'
import Head from 'next/head'
import { getBlogPostPreviews } from 'api'
import { GetStaticProps } from 'next'
import { EncodableBlogPostMetadata } from 'types'
import BlogPost from 'utils/blog-post'
import BlogScreen from 'screens/blog'

interface PageProps {
  posts: EncodableBlogPostMetadata[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const result = getBlogPostPreviews()
  const posts = result.map(BlogPost.jsonify)
  return { props: { posts } }
}

const PAGE_TITLE = 'Blog - Robin Andeer'
const PAGE_DESCRIPTION = 'Thoughts on programming, tech, and my personal life.'
const PAGE_URL = `${process.env.NEXT_PUBLIC_SITE_URL}/blog`

const BlogPage: React.FC<PageProps> = ({ posts }) => {
  const blogPosts = React.useMemo(() => posts.map(BlogPost.parse), [posts])
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

      <BlogScreen posts={blogPosts} />
    </>
  )
}

export default BlogPage
