/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	experimental: {
		esmExternals: true,
		scrollRestoration: true,
		mdxRs: true,
		typedRoutes: true,
	},
	reactStrictMode: true,
	transpilePackages: ['next-mdx-remote'],
};

module.exports = nextConfig;
