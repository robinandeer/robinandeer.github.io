import React from 'react'
import { BlogPostMetadata } from 'types'
import { TitleContainer, Main } from './components'
import Link from 'next/link'
import PostPreview, { StyledArrowRight } from 'components/post-preview'
import PostPreviewList from 'components/post-preview-list'
import Text from 'components/text'
import PageHeader, { Navigation } from 'components/page-header'

interface Props {
  posts: BlogPostMetadata[]
}

const BlogScreen: React.FC<Props> = ({ posts }) => {
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
        <TitleContainer>
          <Text size="large" as="h1">
            All articles by Robin Andeer
          </Text>
        </TitleContainer>
        <PostPreviewList>
          {posts.map((item) => (
            <Link key={item.slug} href={`/blog/${item.slug}`} passHref>
              <PostPreview as="a">
                <StyledArrowRight size={40} />

                <Text as="h3">{item.title}</Text>
                <Text type="muted">{item.intro}</Text>
              </PostPreview>
            </Link>
          ))}
        </PostPreviewList>
      </Main>
    </>
  )
}

export default BlogScreen
