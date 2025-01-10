import 'styles/global.css';
import 'styles/prism-theme.css';

import type { Viewport, Metadata } from 'next'
import {SITE_URL, SITE_DESCRIPTION, SITE_TITLE, SITE_BANNER} from 'config';
import {Analytics} from '@vercel/analytics/react';
import {type ReactNode} from 'react';

type Props = { children: ReactNode };

export default function RootLayout({children}: Props) {
	return (
		<html lang='en'>
			<body>
				{children}
				<Analytics />
			</body>
		</html>
	);
}

export const viewport: Viewport = {
	themeColor: '#fff',
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	keywords: ['tech', 'javascript', 'react', 'blog', 'robinandeer'],
	creator: 'Robin Andeer',
	publisher: 'Robin Andeer',

	robots: {
		index: true,
		follow: true,
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
