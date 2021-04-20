import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { BlogPostMetadata, EncodableBlogPostMetadata } from 'types'
import { ParsedUrlQuery } from 'querystring'
import { getMarkdownRecipe, getRecipePaths } from 'api'
import BlogPost from 'utils/blog-post'
import { MdxRemote } from 'next-mdx-remote/types'
import { RECIPES_PATH } from 'utils/files'
import RecipeScreen from 'screens/recipe'
import Head from 'next/head'

interface PageProps {
  data: EncodableBlogPostMetadata
  markdown: MdxRemote.Source
}

interface PageParams extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({ params }) => {
  const [markdown, data] = await getMarkdownRecipe(`${RECIPES_PATH}/${params.slug.join('-')}.md`)
  return { props: { markdown, data: BlogPost.jsonify(data) } }
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => ({
  paths: getRecipePaths().map((slug) => ({ params: { slug: slug.split('/') } })),
  fallback: false,
})

const RecipePage: React.FC<PageProps> = ({ data, markdown }) => {
  const metadata = React.useMemo<BlogPostMetadata>(() => BlogPost.parse(data), [data])

  const pageTitle = `${data.title} - Robin Andeer`
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/food/${data.slug}`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={data.intro} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={data.intro} />
        {data.image && <meta property="og:image" content={data.image} />}
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />

        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={data.intro} />
        {data.image && <meta name="twitter:image" content={data.image} />}
      </Head>

      <RecipeScreen data={metadata} markdown={markdown} />
    </>
  )
}

export default RecipePage
