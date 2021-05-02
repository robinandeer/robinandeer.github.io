import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { MdxRemote } from 'next-mdx-remote/types'

import { MarkdownMetadata, EncodableMarkdownMetadata } from 'types'
import Markdown from 'markdown'
import MarkdownSerializer from 'markdown/serialize'
import RecipeScreen from 'screens/recipe'
import SocialTags from 'components/social-tags'

import { RECIPES_PATH } from 'config'

interface PageProps {
  data: EncodableMarkdownMetadata
  markdown: MdxRemote.Source
}

interface PageParams extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({ params }) => {
  const filePath = `${RECIPES_PATH}/${params.slug.join('-')}.md`
  const [content, data] = Markdown.getFile(filePath)
  const markdown = await Markdown.convert(content)
  return { props: { markdown, data: MarkdownSerializer.jsonify(data) } }
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => ({
  paths: Markdown.getFiles(RECIPES_PATH).map((item) => ({ params: { slug: item.slug.split('/') } })),
  fallback: false,
})

const RecipePage: React.FC<PageProps> = ({ data, markdown }) => {
  const metadata = React.useMemo<MarkdownMetadata>(() => MarkdownSerializer.parse(data), [data])

  const pageTitle = `${data.title} - Robin Andeer`
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/food/${data.slug}`

  return (
    <>
      <SocialTags title={pageTitle} description={data.intro} url={pageUrl} type="article" image={data.image} />
      <RecipeScreen data={metadata} markdown={markdown} />
    </>
  )
}

export default RecipePage
