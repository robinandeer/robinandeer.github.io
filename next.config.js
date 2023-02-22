/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		esmExternals: true,
		scrollRestoration: true,
		appDir: true,
		mdxRs: true,
		typedRoutes: true,
	},
	reactStrictMode: true,
};

module.exports = nextConfig;
