import { BlogPost, BlogPostGroup, BlogPostMatter, BlogPostPreview } from 'types';

import fs from 'fs';
import highlight from 'remark-highlight.js';
import html from 'remark-html';
import matter from 'gray-matter';
import { parseISO } from 'date-fns';
import path from 'path';
import readingTime from 'reading-time';
import remark from 'remark';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPosts(): BlogPostPreview[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .map<BlogPostPreview>((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      const readTime = readingTime(fileContents);

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        readTime,
        ...(matterResult.data as BlogPostMatter),
        date: matterResult.data.date.toJSON(),
        slug: [...id.split('-').slice(0, 3), id.split('-').slice(3).join('-')],
      };
    })
    .filter((item) => process.env.NODE_ENV !== 'production' || item.draft !== true);

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getGroupedPosts(): BlogPostGroup[] {
  const sortedPosts = getSortedPosts();
  const groups = sortedPosts.reduce((prevValue, currentValue) => {
    const year = parseISO(currentValue.date).getFullYear();
    if (!(year in prevValue)) {
      prevValue[year] = { year, posts: [] };
    }
    prevValue[year].posts.push(currentValue);
    return prevValue;
  }, {} as { [key: number]: BlogPostGroup });
  return Object.values(groups).sort((a, b) => (a.year > b.year ? -1 : 1));
}

export async function getPostData(id: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const readTime = readingTime(fileContents);

  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(highlight).use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as BlogPostMatter),
    date: matterResult.data.date.toJSON(),
    readTime,
  };
}

export function getPreviousAndNextPost(
  id: string,
): { prevPost: BlogPostPreview | null; nextPost: BlogPostPreview | null } {
  const posts = getSortedPosts();
  const postIndex = posts.findIndex((item) => item.id === id);

  return {
    prevPost: posts[postIndex + 1] || null,
    nextPost: posts[postIndex - 1] || null,
  };
}
