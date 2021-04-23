import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { BlogPostMetadata, EncodableBlogPostMetadata } from 'types'
import { ParsedUrlQuery } from 'querystring'
import { getBlogPost, getBlogPostPaths } from 'api'
import BlogPost from 'utils/blog-post'
import PostScreen from 'screens/post'
import { MdxRemote } from 'next-mdx-remote/types'
import Head from 'next/head'
import SocialTags from 'components/social-tags'

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
