import React from 'react'
import { BlogPostMetadata } from 'types'
import { TitleContainer, Main, BlogPostsContainer, PageTitle } from './components'
import Link from 'next/link'
import PostPreview, { StyledArrowRight } from 'components/post-preview'
import PostPreviewList from 'components/post-preview-list'
import Text from 'components/text'
import PageHeader, { Navigation } from 'components/page-header'

interface Props {
  posts: BlogPostMetadata[]
  popular: BlogPostMetadata[]
}

const BlogScreen: React.FC<Props> = ({ posts, popular }) => {
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
          <PageTitle>Blog</PageTitle>
          <Text type="muted">
            I mostly cover web development and related learnings. In total, I've written {`${posts.length} `}
            articles on this site.
          </Text>
        </TitleContainer>

        <BlogPostsContainer>
          <Text size="large" as="h2">
            Most Popular ✨
          </Text>
          <PostPreviewList>
            {popular.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} passHref>
                <PostPreview as="a">
                  <StyledArrowRight size={40} />

                  <Text as="h3">{item.title}</Text>
                  <Text type="muted">{item.intro}</Text>
                </PostPreview>
              </Link>
            ))}
          </PostPreviewList>
        </BlogPostsContainer>

        <BlogPostsContainer>
          <Text size="large" as="h2">
            All Articles 🗃
          </Text>
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
        </BlogPostsContainer>
      </Main>
    </>
  )
}

export default BlogScreen
