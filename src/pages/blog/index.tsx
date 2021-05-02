import React from 'react'
import { GetStaticProps } from 'next'

import { EncodableMarkdownMetadata } from 'types'
import getPopularBlogPosts from 'database/get-popular-blog-posts'
import Markdown from 'markdown'
import MarkdownSerializer from 'markdown/serialize'
import BlogScreen from 'screens/blog'
import SocialTags from 'components/social-tags'

import { BLOG_POSTS_PATH } from 'config'

interface PageProps {
  posts: EncodableMarkdownMetadata[]
  popularPosts: EncodableMarkdownMetadata[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = Markdown.getFiles(BLOG_POSTS_PATH).map(MarkdownSerializer.jsonify)
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
  const blogPosts = React.useMemo(() => posts.map(MarkdownSerializer.parse), [posts])
  const popularBlogPosts = React.useMemo(() => popularPosts.map(MarkdownSerializer.parse), [popularPosts])

  return (
    <>
      <SocialTags title={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} type="website" />
      <BlogScreen posts={blogPosts} popular={popularBlogPosts} />
    </>
  )
}

export default BlogPage
