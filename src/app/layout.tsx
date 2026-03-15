import 'styles/global.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_BANNER, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from 'config';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import type { ReactNode } from 'react';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<ViewTransitions>
			<html lang='en' className={inter.variable} suppressHydrationWarning>
				<head>
					<meta
						name='source-greeting'
						content="Hey! You're inspecting the source — nice. Built with Next.js, Tailwind, and care. Say hi: @robinandeer"
					/>
				</head>
				<body>
					{children}
					<Analytics />
					<SpeedInsights />
				</body>
			</html>
		</ViewTransitions>
	);
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#fafafa' },
		{ media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	keywords: ['tech', 'javascript', 'react', 'blog', 'robinandeer'],
	creator: 'Robin Andeer',
	publisher: 'Robin Andeer',

	alternates: {
		types: {
			'application/rss+xml': '/feed.xml',
		},
	},

	openGraph: {
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		siteName: 'Robin Andeer',
		locale: 'en-US',
		type: 'website',
		images: [
			{
				url: SITE_BANNER,
				width: 1600,
				height: 837,
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		creator: '@robinandeer',
	},
};
