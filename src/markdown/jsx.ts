import { MdxRemote } from 'next-mdx-remote/types'
import renderToString from 'next-mdx-remote/render-to-string'
import prism from 'remark-prism'
import { MARKDOWN_COMPONENTS } from 'components/markdown-post'

export async function convertMarkdown(content: string): Promise<MdxRemote.Source> {
  return await renderToString(content, {
    components: MARKDOWN_COMPONENTS,
    mdxOptions: { remarkPlugins: [prism] },
  })
}
