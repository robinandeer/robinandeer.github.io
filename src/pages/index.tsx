import React from 'react'
import { getBlogPostPreviews } from 'api'
import { GetStaticProps } from 'next'
import HomeScreen from 'screens/home'
import { EncodableBlogPostMetadata } from 'types'
import BlogPost from 'utils/blog-post'

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
  return <HomeScreen posts={blogPosts} />
}

export default IndexPage
