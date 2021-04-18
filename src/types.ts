interface ReadTime {
  text: string
  time: number
  words: number
  minutes: number
}

export interface BlogPostMatter {
  title: string
  category: string
  date: string
  tags: string
  intro?: string
  image?: string
  draft?: boolean
}

export interface BlogPost extends BlogPostMatter {
  id: string
  contentHtml: string
  readTime: ReadTime
}

export interface FrontMatter {
  title: string
  category: string
  date: Date
  tags: string
  intro?: string
  image?: string
  draft?: boolean
}

export type EncodableFrontMatter = Omit<FrontMatter, 'date'> & {
  date: string
}

export interface MarkdownBlogPost<Data = unknown> {
  slug: string
  markdown: string
  data: Data
  path: string
}

export interface BlogPostMetadata extends FrontMatter {
  slug: string
}

export type EncodableBlogPostMetadata = Omit<BlogPostMetadata, 'date'> & {
  date: string
}
