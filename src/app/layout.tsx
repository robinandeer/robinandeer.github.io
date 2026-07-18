import 'styles/global.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SiteFooter } from 'components/site-footer';
import { SiteHeader } from 'components/site-header';
import { ThemeProvider } from 'components/theme-provider';
import { SITE_BANNER, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from 'config';
import type { Metadata, Viewport } from 'next';
import { Instrument_Sans } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions';
import type { ReactNode } from 'react';

const instrumentSans = Instrument_Sans({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-instrument-sans',
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<ViewTransitions>
			<html
				lang='en'
				className={instrumentSans.variable}
				suppressHydrationWarning
			>
				<head>
					<meta
						name='source-greeting'
						content="Hey! You're inspecting the source — nice. Built with Next.js, Tailwind, and care. Say hi: @robinandeer"
					/>
				</head>
				<body>
					<ThemeProvider>
						<div className='flex min-h-svh flex-col'>
							<SiteHeader />
							<div className='flex flex-1 flex-col pt-[max(5.25rem,calc(1rem+env(safe-area-inset-top)+3.5rem))] print:pt-0'>
								{children}
							</div>
							<SiteFooter />
						</div>
					</ThemeProvider>
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
