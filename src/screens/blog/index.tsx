import React from 'react'
import { MarkdownMetadata } from 'types'
import { TitleContainer, Main, BlogPostsContainer, PageTitle, Input } from './components'
import Link from 'next/link'
import PostPreview, { StyledArrowRight } from 'components/post-preview'
import PostPreviewList from 'components/post-preview-list'
import Text from 'components/text'
import PageHeader, { Navigation } from 'components/page-header'

interface Props {
  posts: MarkdownMetadata[]
  popular: MarkdownMetadata[]
}

function useDebounce<T>(value: T, delay: number): T {
  const [internalValue, setInternalValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => setInternalValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return internalValue
}

function matchPost(query: string, item: MarkdownMetadata): boolean {
  const searchQuery = query.toLocaleLowerCase()
  return (
    item.title.toLowerCase().includes(searchQuery) ||
    item.intro?.toLowerCase().includes(searchQuery) ||
    item.tags.includes(searchQuery)
  )
}

const BlogScreen: React.FC<Props> = ({ posts, popular }) => {
  const [query, setQuery] = React.useState('')
  const debouncedQuery = useDebounce(query, 300)

  const filteredPosts = React.useMemo(
    () => (debouncedQuery.length > 2 ? posts.filter((item) => matchPost(debouncedQuery, item)) : posts),
    [debouncedQuery],
  )

  const filteredPopularPosts = React.useMemo(
    () => (debouncedQuery.length > 2 ? popular.filter((item) => matchPost(debouncedQuery, item)) : popular),
    [debouncedQuery],
  )

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
            I mostly cover web development and related learnings. In total, I&apos;ve written {`${posts.length} `}
            articles on this site. Use the search below to filter articles.
          </Text>

          <Input
            type="search"
            value={query}
            onChange={({ target: { value } }) => setQuery(value)}
            placeholder="Search articles"
          />
        </TitleContainer>

        {filteredPopularPosts.length > 0 && (
          <BlogPostsContainer>
            <Text size="large" as="h2">
              Most Popular ✨
            </Text>
            <PostPreviewList>
              {filteredPopularPosts.map((item) => (
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
        )}

        <BlogPostsContainer>
          <Text size="large" as="h2">
            All Articles 🗃
          </Text>
          <PostPreviewList>
            {filteredPosts.map((item) => (
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
