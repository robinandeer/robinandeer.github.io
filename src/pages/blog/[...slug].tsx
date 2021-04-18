import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { BlogPostMetadata, EncodableBlogPostMetadata } from 'types'
import { ParsedUrlQuery } from 'querystring'
import { getBlogPost, getBlogPostPaths } from 'api'
import BlogPost from 'utils/blog-post'
import PostScreen from 'screens/post'
import { MdxRemote } from 'next-mdx-remote/types'
import Head from 'next/head'

interface PageProps {
  data: EncodableBlogPostMetadata
  markdown: MdxRemote.Source
}

interface PageParams extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({ params }) => {
  const [markdown, data] = await getBlogPost(params.slug.join('-'))
  return { props: { markdown, data: BlogPost.jsonify(data) } }
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const slugs = getBlogPostPaths()

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug.split('/') } })),
    fallback: false,
  }
}

const BlogPostPage: React.FC<PageProps> = ({ data, markdown }) => {
  const metadata = React.useMemo<BlogPostMetadata>(() => BlogPost.parse(data), [data])
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.intro} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/react/the-perils-of-rehydration/`} />

        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.intro} />
        <meta property="og:type" content="website" />
        {data.image && <meta property="og:image" content={data.image} />}

        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.intro} />
        {data.image && <meta name="twitter:image" content={data.image} />}
      </Head>
      <PostScreen data={metadata} markdown={markdown} />
    </>
  )
}

export default BlogPostPage
