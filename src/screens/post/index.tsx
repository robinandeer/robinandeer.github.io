import React from 'react'
import { MarkdownMetadata } from 'types'
import MarkdownPost from 'components/markdown-post'
import { Main } from './components'
import { MdxRemote } from 'next-mdx-remote/types'
import Text from 'components/text'
import Link from 'next/link'
import PageHeader, { Navigation } from 'components/page-header'

interface Props {
  data: MarkdownMetadata
  markdown: MdxRemote.Source
}

const PostScreen: React.FC<Props> = ({ data, markdown }) => {
  return (
    <>
      <PageHeader>
        <Navigation>
          <Link passHref href="/">
            <Text as="a">Home</Text>
          </Link>

          <Link passHref href="/blog">
            <Text as="a">All articles</Text>
          </Link>
        </Navigation>
      </PageHeader>
      <Main>
        <MarkdownPost data={data} markdown={markdown} />
      </Main>
    </>
  )
}

export default PostScreen
