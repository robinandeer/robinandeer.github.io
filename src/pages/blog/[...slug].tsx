import React from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { MdxRemote } from 'next-mdx-remote/types'

import { MarkdownMetadata, EncodableMarkdownMetadata } from 'types'
import Markdown from 'markdown'
import MarkdownSerializer from 'markdown/serialize'
import PostScreen from 'screens/post'
import SocialTags from 'components/social-tags'

import { BLOG_POSTS_PATH } from 'config'

interface PageProps {
  data: EncodableMarkdownMetadata
  markdown: MdxRemote.Source
}

interface PageParams extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({ params }) => {
  const filePath = `${BLOG_POSTS_PATH}/${params.slug.join('-')}.md`
  const [content, data] = Markdown.getFile(filePath)
  const markdown = await Markdown.convert(content)
  return { props: { markdown, data: MarkdownSerializer.jsonify(data) } }
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const slugs = Markdown.getFiles(BLOG_POSTS_PATH).map((item) => item.slug)

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.split('/') } })),
    fallback: false,
  }
}

const BlogPostPage: React.FC<PageProps> = ({ data, markdown }) => {
  const metadata = React.useMemo<MarkdownMetadata>(() => MarkdownSerializer.parse(data), [data])

  const pageTitle = `${data.title} - Robin Andeer`
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${data.slug}`

  return (
    <>
      <Head>
        <SocialTags title={pageTitle} description={data.intro} url={pageUrl} type="article" image={data.image} />
      </Head>
      <PostScreen data={metadata} markdown={markdown} />
    </>
  )
}

export default BlogPostPage
