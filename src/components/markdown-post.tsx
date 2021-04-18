import React from 'react'
import styled from '@emotion/styled'
import { BlogPostMetadata } from 'types'
import { parseJSX } from 'markdown'
import { MdxRemote } from 'next-mdx-remote/types'
import { Main as PostScreenMain } from 'screens/post/components'
import { mediaQuery } from 'styles/theme'
import Text from './text'

export const MarkdownContainer = styled.div``

export const MarkdownContent = styled.div`
  max-width: 45rem;
  font-size: 1.1rem;

  ${mediaQuery[2]} {
    font-size: 1.2rem;
  }

  ${PostScreenMain} & .remark-highlight {
    margin-left: -1.5rem;
    margin-right: -1.5rem;

    > pre {
      padding: 0.5rem 1.5rem;

      > code {
        padding-right: 1.5rem;
      }
    }
  }

  .remark-highlight {
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    background-color: var(--color-bg-code);
    overflow-x: auto;
    font-size: 0.85em;

    ${mediaQuery[1]} {
      border-radius: 6px;
    }
  }

  > * + * {
    margin-top: 1.5em;
  }
`

const Header = styled.div`
  margin-bottom: 5vw;
`

const Heading = styled.h1`
  font-size: calc(1.5rem + 3vw);
  line-height: 1.3;
  font-weight: 700;
`

function formatDate(date: Date): string {
  const format = new Intl.DateTimeFormat('en', { dateStyle: 'long' })
  return format.format(date)
}

interface Props {
  data: BlogPostMetadata
  markdown: MdxRemote.Source
}

const MarkdownPost: React.FC<Props> = ({ data, markdown }) => {
  const content = parseJSX(markdown)

  return (
    <MarkdownContainer>
      <Header>
        <Heading>{data.title}</Heading>
        <Text type="muted" size="small">
          This article was published on {formatDate(data.date)}.
        </Text>
      </Header>
      <MarkdownContent>{content}</MarkdownContent>
    </MarkdownContainer>
  )
}

export default MarkdownPost
