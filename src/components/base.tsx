import styled from '@emotion/styled'
import Image, { ImageProps } from 'next/image'
import * as React from 'react'

import { HiArrowNarrowRight } from 'react-icons/hi'
import { MarkdownContent } from './markdown-post'
import { Main as PostScreenMain } from 'screens/post/components'

export interface BaseElementProps {
  className?: string
}

export const List = styled.ul`
  ${MarkdownContent} & {
    margin-bottom: 0;
  }
`

export const OrderedList: React.FC = ({ children }) => (
  <List as="ol">
    {React.Children.map(children, (child, index) =>
      React.isValidElement(child) ? React.cloneElement(child, { order: index + 1 }) : child,
    )}
  </List>
)

const UnorderedListItemContainer = styled.li`
  display: flex;
  flex-direction: row;

  ${List} & + & {
    margin-top: 1rem;
  }
`

const UnorderedListItemIcon = styled(HiArrowNarrowRight)`
  flex-shrink: 0;
  color: var(--color-text-yellow);
  margin-right: 0.5rem;
`

const UnorderedListItemContent = styled.div`
  position: relative;
  top: -0.3rem;
`

const UnorderedListItem: React.FC = ({ children }) => (
  <UnorderedListItemContainer>
    <UnorderedListItemIcon />
    <UnorderedListItemContent>
      <Paragraph>{children}</Paragraph>
    </UnorderedListItemContent>
  </UnorderedListItemContainer>
)

const OrderedListItemContainer = styled.li`
  display: flex;
  flex-direction: row;

  ${List} & + & {
    margin-top: 1rem;
  }
`

const OrderedListItemNumber = styled.div`
  margin-right: 0.5rem;

  position: relative;
  top: 2px;
  color: var(--color-text-yellow);
`

const OrderedListItem: React.FC<{ order: number }> = ({ children, order }) => (
  <OrderedListItemContainer>
    <OrderedListItemNumber>{order}.</OrderedListItemNumber>
    <Paragraph>{children}</Paragraph>
  </OrderedListItemContainer>
)

export const ListItem: React.FC<{ order?: number }> = ({ order, ...props }) =>
  order ? <OrderedListItem order={order} {...props} /> : <UnorderedListItem {...props} />

export const EmphasisText = styled.em`
  font-style: italic;
`

export const InlineCode = styled.code`
  background-color: var(--color-bg-code);
  padding: 0.1rem 0.3rem 0.2rem;
  border-radius: 3px;
  font-size: 0.9em;
  white-space: nowrap;
  position: relative;
  top: -1px;
`

export const Anchor = styled.a`
  color: var(--color-text-link);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 1px;
`

export const ExternalLink = styled(Anchor)``
ExternalLink.defaultProps = { target: '_blank', rel: 'noopener' }

export const StrongText = styled.strong`
  font-weight: 700;
`

export const HorizontalRule = styled.hr`
  border-width: 0;
  border-bottom-width: 2px;
  border-color: var(--color-border-primary);

  ${MarkdownContent} & {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  ${PostScreenMain} & {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }
`

const ImageContainer = styled.div`
  ${PostScreenMain} & {
    margin-left: -1.5rem;
    margin-right: -1.5rem;
  }
`

export function ProseImage(props: ImageProps): JSX.Element {
  return (
    <ImageContainer>
      <Image {...props} />
    </ImageContainer>
  )
}

export const Paragraph = styled.p`
  line-height: 1.6;

  .remark-highlight + &,
  & + .remark-highlight {
    margin-top: 1rem;
  }
`

export const Blockquote = styled.blockquote`
  padding-left: 1rem;
  border-left: 3px solid var(--color-text-yellow);

  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  letter-spacing: -0.5px;

  & ${Paragraph} {
    font-size: 0.9em;
  }

  ${Paragraph} & {
    margin-top: 0.5rem;
  }
`

export const Heading2 = styled.h2`
  font-size: 1.4em;
  font-weight: 500;

  ${MarkdownContent} & {
    margin-bottom: 0.5rem;
    margin-top: 3rem;

    & + ${Paragraph} {
      margin-top: 0;
    }

    & + ${List} {
      margin-top: 1rem;
    }
  }
`

export const Heading3 = styled.h3`
  font-size: 1.2em;
  font-weight: 500;

  ${MarkdownContent} & {
    margin-bottom: 0.5rem;
    margin-top: 2rem;

    & + ${Paragraph} {
      margin-top: 0;
    }
  }
`

export const Heading4 = styled.h4`
  font-size: 1em;
  text-transform: uppercase;
  font-weight: 600;

  ${MarkdownContent} & {
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;

    & + ${Paragraph} {
      margin-top: 0;
    }
  }
`
