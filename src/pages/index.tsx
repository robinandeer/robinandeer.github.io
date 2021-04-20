import React from 'react'
import { getBlogPostPreviews } from 'api'
import { GetStaticProps } from 'next'
import HomeScreen from 'screens/home'
import { EncodableBlogPostMetadata } from 'types'
import BlogPost from 'utils/blog-post'
import Head from 'next/head'
import { SITE_TITLE, SITE_DESCRIPTION } from 'config'

interface PageProps {
  posts: EncodableBlogPostMetadata[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const result = getBlogPostPreviews()
  const posts = result.slice(0, 3).map(BlogPost.jsonify)
  return { props: { posts } }
}

const IndexPage: React.FC<PageProps> = ({ posts }) => {
  const blogPosts = React.useMemo(() => posts.map(BlogPost.parse), [posts])
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL} />

        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />

        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
      </Head>
      <HomeScreen posts={blogPosts} />
    </>
  )
}

export default IndexPage
