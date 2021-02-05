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

export type Category = 'Tools' | 'Techniques' | 'Languages & Frameworks' | 'Platforms';
export type Ring = 'Assess' | 'Trial' | 'Adopt' | 'Hold';

export interface Technology {
  id: number;
  name: string;
  category: Category;
  ring: Ring;
  notes: string | null;
  html: string | null;
  documentation: string | null;
}

export interface FrontMatter {
  title: string;
  category: string;
  date: Date;
  tags: string;
  intro?: string;
  image?: string;
  draft?: boolean;
}

export type EncodableFrontMatter = Omit<FrontMatter, 'date'> & {
  date: string;
};
