import React from 'react'
import styled from '@emotion/styled'
import { MarkdownMetadata } from 'types'
import { MdxRemote } from 'next-mdx-remote/types'
import Text from './text'
import MarkdownContent from './markdown-content'

export const MarkdownContainer = styled.div``

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
  data: MarkdownMetadata
  markdown: MdxRemote.Source
}

const MarkdownPost: React.FC<Props> = ({ data, markdown }) => {
  return (
    <MarkdownContainer>
      <Header>
        <Heading>{data.title}</Heading>
        <Text type="muted" size="small">
          This article was published on {formatDate(data.date)}.
        </Text>
      </Header>
      <MarkdownContent>{markdown}</MarkdownContent>
    </MarkdownContainer>
  )
}

export default MarkdownPost
