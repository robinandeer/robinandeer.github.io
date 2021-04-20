import { postFilePaths, POSTS_PATH, recipeFilePaths, RECIPES_PATH } from 'utils/files'

import fs from 'fs'
import matter from 'gray-matter'
import renderToString from 'next-mdx-remote/render-to-string'
import prism from 'remark-prism'
import { FrontMatter, BlogPostMetadata } from 'types'
import { MdxRemote } from 'next-mdx-remote/types'
import { MARKDOWN_COMPONENTS } from 'markdown'

const IS_NOT_PRODUCTION_BUILD = process.env.NODE_ENV !== 'production'

function fileSource(path: string) {
  return fs.readFileSync(path)
}

function extractData<Data = unknown>(source: Buffer): [string, Data] {
  const { content, data } = matter(source)
  return [content, data as Data]
}

async function parseMarkdown(content: string): Promise<MdxRemote.Source> {
  return await renderToString(content, {
    components: MARKDOWN_COMPONENTS,
    mdxOptions: { remarkPlugins: [prism] },
  })
}

function slugifyPath(path: string) {
  const fileName = path.split('/').pop().replace(/\.md$/, '')
  return [...fileName.split('-').slice(0, 3), fileName.split('-').slice(3).join('-')].join('/')
}

function slugifyRecipePath(path: string) {
  const fileName = path.split('/').pop().replace(/\.md$/, '')
  return fileName.split('-').join('-')
}

function parseMetadata<Data = unknown>(path: string): [string, Data] {
  const source = fileSource(path)
  return extractData<Data>(source)
}

function mapFrontMatter(path: string): [string, FrontMatter, string] {
  return [...parseMetadata<FrontMatter>(path), path]
}

function mapMetadata(content: string, data: FrontMatter, path: string): [string, BlogPostMetadata] {
  return [content, { ...data, slug: slugifyPath(path) }]
}

function mapRecipeMetadata(content: string, data: FrontMatter, path: string): [string, BlogPostMetadata] {
  return [content, { ...data, slug: slugifyRecipePath(path) }]
}

async function mapBlogPost(content: string, data: BlogPostMetadata): Promise<[MdxRemote.Source, BlogPostMetadata]> {
  const markdown = await parseMarkdown(content)
  return [markdown, data]
}

export function getBlogPostPaths(): string[] {
  return postFilePaths
    .map(mapFrontMatter)
    .filter(([, data]) => IS_NOT_PRODUCTION_BUILD || data.draft !== true)
    .map(([, , path]) => slugifyPath(path))
}

export function getBlogPostPreviews(): BlogPostMetadata[] {
  return postFilePaths
    .map(mapFrontMatter)
    .filter(([, data]) => IS_NOT_PRODUCTION_BUILD || data.draft !== true)
    .map((value) => mapMetadata(...value))
    .map(([, data]) => data)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

export async function getBlogPost(fileName: string): Promise<[MdxRemote.Source, BlogPostMetadata]> {
  const filePath = `${POSTS_PATH}/${fileName}.md`
  const [content, frontMatter] = mapFrontMatter(filePath)
  const [, data] = mapMetadata(content, frontMatter, filePath)
  return await mapBlogPost(content, data)
}

export function getRecipePaths(): string[] {
  return recipeFilePaths
    .map(mapFrontMatter)
    .filter(([, data]) => IS_NOT_PRODUCTION_BUILD || data.draft !== true)
    .map(([, , path]) => slugifyRecipePath(path))
}

export async function getMarkdownRecipe(filePath: string): Promise<[MdxRemote.Source, BlogPostMetadata]> {
  const [content, frontMatter] = mapFrontMatter(filePath)
  const [, data] = mapRecipeMetadata(content, frontMatter, filePath)
  return await mapBlogPost(content, data)
}
