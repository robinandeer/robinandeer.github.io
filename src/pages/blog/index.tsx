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

const TITLE = 'Blog - Robin Andeer'
const URL = `${process.env.NEXT_PUBLIC_SITE_URL}/blog`

const BlogPage: React.FC<PageProps> = ({ posts }) => {
  const blogPosts = React.useMemo(() => posts.map(BlogPost.parse), [posts])
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <link rel="canonical" href={URL} />
        <meta property="og:url" content={URL} />
        <meta property="og:title" content={TITLE} />
        <meta name="twitter:title" content={TITLE} />
      </Head>
      <BlogScreen posts={blogPosts} />
    </>
  )
}

export default BlogPage
