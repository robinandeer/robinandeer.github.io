import styled from '@emotion/styled'
import MarkdownContent from 'components/markdown-content'
import PageHeader, { Navigation } from 'components/page-header'
import SocialTags from 'components/social-tags'
import Text from 'components/text'
import { CHANGELOG_PATH } from 'config'
import Markdown from 'markdown'
import { GetStaticProps } from 'next'
import { MdxRemote } from 'next-mdx-remote/types'
import Link from 'next/link'
import React from 'react'
import { breakpoint, mediaQuery } from 'styles/theme'

interface PageProps {
  markdown: MdxRemote.Source
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const [content] = Markdown.getFile(CHANGELOG_PATH)
  const markdown = await Markdown.convert(content)
  return { props: { markdown } }
}

export const Main = styled.main`
  padding: 2.5rem 1.5rem;

  max-width: ${breakpoint[3]}px;
  margin: 0 auto;

  ${mediaQuery[1]} {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`

export default function Changelog({ markdown }: PageProps): React.ReactElement {
  const pageTitle = 'Changelog - Robin Andeer'
  const pageDescription = 'All notable changes to this website'
  const pageUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/changelog`

  return (
    <div>
      <SocialTags title={pageTitle} description={pageDescription} url={pageUrl} type="website" />

      <PageHeader>
        <Navigation>
          <Link passHref href="/">
            <Text as="a">↖ Home</Text>
          </Link>
        </Navigation>
      </PageHeader>
      <Main>
        <MarkdownContent>{markdown}</MarkdownContent>
      </Main>
    </div>
  )
}
