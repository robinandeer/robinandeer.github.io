const getBaseUrl = () => {
	if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
	return 'http://localhost:3000';
};

export const SITE_URL = getBaseUrl();
export const SITE_TITLE = 'Robin Andeer - Product Engineer';
export const SITE_DESCRIPTION =
	'Product engineer at Runway. Writing about web development, React, and building tools for human imagination.';
export const SITE_BANNER = `${SITE_URL}/icons/banner.png`;
