import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	env: {
		SITE_BUILD_TIME_ISO: new Date().toISOString(),
	},
};

export default nextConfig;
