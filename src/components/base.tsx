import styled from '@emotion/styled'
import Image, { ImageProps } from 'next/image'
import * as React from 'react'

import { HiArrowNarrowRight } from 'react-icons/hi'
import { Main as PostScreenMain } from 'screens/post/components'

export function OrderedList({ children }: { children: React.ReactChildren }): JSX.Element {
  return (
    <ol>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ order: number }>, { order: index + 1 })
          : child,
      )}
    </ol>
  )
}

const UnorderedListItemContainer = styled.li`
  display: flex;
  flex-direction: row;

  ul & + & {
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
    <UnorderedListItemContent>{children}</UnorderedListItemContent>
  </UnorderedListItemContainer>
)

const OrderedListItemContainer = styled.li`
  display: flex;
  flex-direction: row;

  ol & + & {
    margin-top: 1rem;
  }
`

const OrderedListItemNumber = styled.div`
  margin-right: 0.75rem;
  margin-left: 0.25rem;

  position: relative;
  top: 2px;
  color: var(--color-text-yellow);
`

const OrderedListItem: React.FC<{ order: number }> = ({ children, order }) => (
  <OrderedListItemContainer>
    <OrderedListItemNumber>{order}.</OrderedListItemNumber>
    {children}
  </OrderedListItemContainer>
)

export function ListItem({ order, ...props }: { order?: number; children: React.ReactChildren }): JSX.Element {
  return order ? <OrderedListItem order={order} {...props} /> : <UnorderedListItem {...props} />
}

export const Anchor = styled.a`
  color: var(--color-text-link);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 1px;
`

export const ExternalLink = styled(Anchor)``
ExternalLink.defaultProps = { target: '_blank', rel: 'noopener' }

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
