import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MarkdownMetadata, FrontMatter } from 'types'

const IS_NOT_PRODUCTION_BUILD = process.env.NODE_ENV !== 'production'

function readMarkdownFiles(rootDir: string) {
  return fs
    .readdirSync(rootDir)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => path.join(rootDir, fileName))
}

function extractData<Data = unknown>(source: Buffer): [string, Data] {
  const { content, data } = matter(source)
  return [content, data as Data]
}

function parseMetadata<Data = unknown>(path: string): [string, Data] {
  const source = fs.readFileSync(path)
  return extractData<Data>(source)
}

function mapFrontMatter(path: string): [string, FrontMatter, string] {
  return [...parseMetadata<FrontMatter>(path), path]
}

function mapMetadata(content: string, data: FrontMatter, path: string): [string, MarkdownMetadata] {
  return [content, { ...data, slug: slugifyPath(path) }]
}

function slugifyPath(path: string) {
  const fileName = path.split('/').pop().replace(/\.md$/, '')
  return [...fileName.split('-').slice(0, 3), fileName.split('-').slice(3).join('-')].join('/')
}

export function getMarkdownFiles(rootDir: string): MarkdownMetadata[] {
  return readMarkdownFiles(rootDir)
    .map(mapFrontMatter)
    .filter(([, data]) => IS_NOT_PRODUCTION_BUILD || data.draft !== true)
    .map((value) => mapMetadata(...value))
    .map(([, data]) => data)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}

export function getMarkdownFile(filePath: string): [string, MarkdownMetadata] {
  const [content, frontMatter] = mapFrontMatter(filePath)
  return mapMetadata(content, frontMatter, filePath)
}
