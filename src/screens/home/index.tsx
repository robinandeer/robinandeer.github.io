import React from 'react'
import { MarkdownMetadata } from 'types'
import { Main, HomeSection, SectionAside, SectionBody } from './components'
import Link from 'next/link'
import TwitterLogo from 'components/twitter-logo'
import SwedenFlag from 'components/sweden-flag'
import BlogIcon from 'components/blog-icon'
import CookieIcon from 'components/cookie-icon'
import WaveIcon from 'components/wave-icon'
import { Anchor, ExternalLink } from 'components/base'
import Text from 'components/text'
import PostPreviewList from 'components/post-preview-list'
import PostPreview, { StyledArrowRight } from 'components/post-preview'

interface Props {
  posts: MarkdownMetadata[]
}

const HomeScreen: React.FC<Props> = ({ posts }) => {
  return (
    <Main>
      <HomeSection>
        <SectionAside>
          <WaveIcon />
        </SectionAside>

        <SectionBody>
          <Text as="h1">Hey, I&apos;m Robin Andeer</Text>
        </SectionBody>
      </HomeSection>

      <HomeSection>
        <SectionAside>
          <SwedenFlag />
        </SectionAside>

        <SectionBody>
          <Text as="h2">...a developer from Sweden,</Text>
          <Text type="muted">
            constantly learning at <ExternalLink href="https://www.hedvig.com/">Hedvig</ExternalLink>.
          </Text>
        </SectionBody>
      </HomeSection>

      <HomeSection>
        <SectionAside>
          <CookieIcon />
        </SectionAside>

        <SectionBody>
          <Text as="h2">
            I currently bake <em>a lot</em>,
          </Text>
          <Text type="muted">
            so do try my{' '}
            <Link passHref href="/food/2021/04/15/basic-sourdough-bread">
              <Anchor>sourdough recipe</Anchor>
            </Link>
            .
          </Text>
        </SectionBody>
      </HomeSection>

      <HomeSection>
        <SectionAside>
          <BlogIcon />
        </SectionAside>

        <SectionBody>
          <Text as="h2">
            Learn with me through{' '}
            <Link passHref href="/blog">
              <Anchor>my blog</Anchor>
            </Link>
            .
          </Text>
          <Text type="muted">Get started with my latest posts:</Text>
        </SectionBody>

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
      </HomeSection>

      <HomeSection>
        <SectionAside>
          <TwitterLogo />
        </SectionAside>

        <SectionBody>
          <Text as="h2">
            Connect with me <ExternalLink href="https://twitter.com/robinandeer">@robinandeer</ExternalLink>,
          </Text>
          <Text type="muted">and share an article or fun video.</Text>
        </SectionBody>
      </HomeSection>
    </Main>
  )
}

export default HomeScreen
