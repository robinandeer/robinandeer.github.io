import path from 'path';

export const SITE_TITLE = 'Robin Andeer – Developer and writer.';
export const SITE_DESCRIPTION = 'Front-end developer, React aficionado, and aspiring baker.';
export const SITE_BANNER = '/icons/banner.png';

export const BLOG_POSTS_PATH = path.join(process.cwd(), 'posts');
export const RECIPES_PATH = path.join(process.cwd(), 'recipes');

export const CHANGELOG_PATH = path.join(process.cwd(), 'CHANGELOG.md');

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
