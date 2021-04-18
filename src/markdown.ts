import { ReactNode } from 'react'
import * as Base from 'components/base'
import hydrate from 'next-mdx-remote/hydrate'
import { MdxRemote } from 'next-mdx-remote/types'

export const MARKDOWN_COMPONENTS = {
  Image: Base.ProseImage,
  p: Base.Paragraph,
  h2: Base.Heading2,
  h3: Base.Heading3,
  h4: Base.Heading4,
  ul: Base.List,
  ol: Base.OrderedList,
  li: Base.ListItem,
  em: Base.EmphasisText,
  inlineCode: Base.InlineCode,
  a: Base.Anchor,
  strong: Base.StrongText,
  hr: Base.HorizontalRule,
  blockquote: Base.Blockquote,
}

export function parseJSX(source: MdxRemote.Source): ReactNode {
  return hydrate(source, { components: MARKDOWN_COMPONENTS })
}
