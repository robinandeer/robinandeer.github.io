import React from 'react'
import { GetStaticProps } from 'next'

import { BlogPostMetadata, EncodableBlogPostMetadata } from 'types'
import { ParsedUrlQuery } from 'querystring'
import { getMarkdown } from 'api'
import BlogPost from 'utils/blog-post'
import { MdxRemote } from 'next-mdx-remote/types'
import { RECIPES_PATH } from 'utils/files'
import RecipeScreen from 'screens/recipe'

interface PageProps {
  data: EncodableBlogPostMetadata
  markdown: MdxRemote.Source
}

interface PageParams extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async () => {
  const [markdown, data] = await getMarkdown(`${RECIPES_PATH}/sourdough-bread.md`)
  return { props: { markdown, data: BlogPost.jsonify(data) } }
}

const RecipePage: React.FC<PageProps> = ({ data, markdown }) => {
  const metadata = React.useMemo<BlogPostMetadata>(() => BlogPost.parse(data), [data])
  return <RecipeScreen data={metadata} markdown={markdown} />
}

export default RecipePage
