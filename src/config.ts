export const SITE_URL
  = process.env.NEXT_PUBLIC_SITE_URL
  || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const SITE_TITLE = 'Robin Andeer - Developer and writer.';
export const SITE_DESCRIPTION = 'Front-end developer, React aficionado, and aspiring baker.';
export const SITE_BANNER = `${SITE_URL}/icons/banner.png`;
