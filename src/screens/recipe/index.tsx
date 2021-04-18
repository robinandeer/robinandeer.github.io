import React from 'react'
import { BlogPostMetadata } from 'types'
import MarkdownPost from 'components/markdown-post'
import { Main } from '../post/components'
import { MdxRemote } from 'next-mdx-remote/types'
import Text from 'components/text'
import Link from 'next/link'
import PageHeader, { Navigation } from 'components/page-header'

interface Props {
  data: BlogPostMetadata
  markdown: MdxRemote.Source
}

const RecipeScreen: React.FC<Props> = ({ data, markdown }) => {
  return (
    <>
      <PageHeader>
        <Navigation>
          <Link passHref href="/">
            <Text as="a">Home</Text>
          </Link>
        </Navigation>
      </PageHeader>
      <Main>
        <MarkdownPost data={data} markdown={markdown} />
      </Main>
    </>
  )
}

export default RecipeScreen
