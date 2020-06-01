interface ReadTime {
  text: string;
  time: number;
  words: number;
  minutes: number;
}

export interface BlogPostMatter {
  title: string;
  category: string;
  date: string;
  tags: string;
  intro?: string;
  image?: string;
  draft?: boolean;
}

export interface BlogPost extends BlogPostMatter {
  id: string;
  contentHtml: string;
  readTime: ReadTime;
}

export interface BlogPostPreview extends BlogPostMatter {
  id: string;
  slug: string[];
  readTime: ReadTime;
}

export interface BlogPostGroup {
  year: number;
  posts: BlogPostPreview[];
}
