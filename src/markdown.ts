import { ReactNode } from 'react'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'
import { ListItem, OrderedList, ProseImage } from 'components/base'

export const MARKDOWN_COMPONENTS = {
  Image: ProseImage,
  li: ListItem,
  ol: OrderedList,
}

export function parseJSX(source: MdxRemote.Source): ReactNode {
  return hydrate(source, { components: MARKDOWN_COMPONENTS })
}
