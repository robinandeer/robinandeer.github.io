import { MdxRemote } from 'next-mdx-remote/types'
import renderToString from 'next-mdx-remote/render-to-string'
import prism from 'remark-prism'
import autolinkHeadings from 'rehype-autolink-headings'
import slug from 'rehype-slug'
import { MARKDOWN_COMPONENTS } from 'components/markdown-post'

export async function convertMarkdown(content: string): Promise<MdxRemote.Source> {
  return await renderToString(content, {
    components: MARKDOWN_COMPONENTS,
    mdxOptions: {
      remarkPlugins: [prism],
      rehypePlugins: [slug, [autolinkHeadings, { behavior: 'append' }]],
    },
  })
}
