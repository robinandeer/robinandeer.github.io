export interface Frontmatter {
  title: string;
  intro?: string;
  date: Date;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export type PostMeta = Omit<Frontmatter, 'date'> & {
  date: string;
}

export interface PostItem {
  slug: string;
  meta: PostMeta
}

export interface Post {
  code: string
  meta: PostMeta
}
