import React from 'react'
import styled from '@emotion/styled'
import { MarkdownMetadata } from 'types'
import { MdxRemote } from 'next-mdx-remote/types'
import Text from './text'
import MarkdownContent from './markdown-content'
import Image from 'next/image'
import { mediaQuery } from 'styles/theme'

const Header = styled.div`
  margin-bottom: 5vw;

  max-width: 55rem;
  text-align: center;

  > * + * {
    margin-top: 1rem;
  }
`

const Heading = styled.h1`
  font-size: calc(1.5rem + 3vw);
  line-height: 1.3;
  font-weight: 700;
`

const ImageWrapper = styled.div`
  max-width: 64rem;

  margin: 0 -1.5rem 1rem;

  ${mediaQuery[1]} {
    margin: 0 -3rem 3rem;
  }
`

const Main = styled.main`
  width: 100%;
  max-width: 45rem;
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
    <>
      <Header>
        <Heading>{data.title}</Heading>
        <Text type="muted" size="small">
          By Robin Andeer. This article was published on {formatDate(data.date)}.
        </Text>
      </Header>
      {data.image && (
        <ImageWrapper>
          <Image
            src={data.image}
            height={data.imageHeight}
            width={data.imageWidth}
            alt={data.imageAlt}
            layout="intrinsic"
          />
        </ImageWrapper>
      )}
      <Main>
        <MarkdownContent>{markdown}</MarkdownContent>
      </Main>
    </>
  )
}

export default MarkdownPost
