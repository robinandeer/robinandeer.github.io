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
  imageHeight?: number
  imageWidth?: number
  imageAlt?: string
  draft?: boolean
}

export interface MarkdownMetadata extends FrontMatter {
  slug: string
}

export type EncodableMarkdownMetadata = Omit<MarkdownMetadata, 'date'> & {
  date: string
}
