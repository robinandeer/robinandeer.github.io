import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	env: {
		SITE_BUILD_TIME_ISO: new Date().toISOString(),
	},
	// TypeScript 7 has no JS compiler API — next build must shell out to local `tsc`.
	experimental: {
		useTypeScriptCli: true,
	},
};

export default nextConfig;
