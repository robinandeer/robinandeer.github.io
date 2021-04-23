import React from 'react'
import { getBlogPostPreviews } from 'api'
import { GetStaticProps } from 'next'
import HomeScreen from 'screens/home'
import { EncodableBlogPostMetadata } from 'types'
import BlogPost from 'utils/blog-post'
import Head from 'next/head'
import { SITE_TITLE, SITE_DESCRIPTION } from 'config'
import SocialTags from 'components/social-tags'

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
        <SocialTags
          title={SITE_TITLE}
          description={SITE_DESCRIPTION}
          url={process.env.NEXT_PUBLIC_SITE_URL}
          type="website"
        />
      </Head>
      <HomeScreen posts={blogPosts} />
    </>
  )
}

export default IndexPage
