import React from 'react'
import { GetStaticProps } from 'next'

import { EncodableMarkdownMetadata } from 'types'
import Markdown from 'markdown'
import MarkdownSerializer from 'markdown/serialize'
import HomeScreen from 'screens/home'
import SocialTags from 'components/social-tags'

import { SITE_TITLE, SITE_DESCRIPTION, BLOG_POSTS_PATH } from 'config'

interface PageProps {
  posts: EncodableMarkdownMetadata[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const posts = Markdown.getFiles(BLOG_POSTS_PATH).slice(0, 3).map(MarkdownSerializer.jsonify)
  return { props: { posts } }
}

const IndexPage: React.FC<PageProps> = ({ posts }) => {
  const blogPosts = React.useMemo(() => posts.map(MarkdownSerializer.parse), [posts])

  return (
    <>
      <SocialTags
        title={SITE_TITLE}
        description={SITE_DESCRIPTION}
        url={process.env.NEXT_PUBLIC_SITE_URL}
        type="website"
      />
      <HomeScreen posts={blogPosts} />
    </>
  )
}

export default IndexPage
