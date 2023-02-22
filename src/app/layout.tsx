import 'styles/global.css';
import 'styles/prism-theme.css';

import {SITE_DESCRIPTION, SITE_TITLE, SITE_URL, SITE_BANNER} from 'config';
import AnalyticsWrapper from '../components/analytics-wrapper';
import {type ReactNode} from 'react';
import path from 'path';

type Props = { children: ReactNode };

export default function RootLayout({children}: Props) {
	return (
		<html lang='en'>
			<body>
				{children}
				<AnalyticsWrapper />
			</body>
		</html>
	);
}

export const metadata = {
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	keywords: ['tech', 'javascript', 'react', 'blog', 'robinandeer'],
	creator: 'Robin Andeer',
	publisher: 'Robin Andeer',

	themeColor: '#fff',

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
				url: path.join(SITE_URL, SITE_BANNER),
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

	icons: {
		icon: [
			{url: '/icons/favicon.svg', type: 'image/svg+xml'},
			{url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
			{url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
		],
		alternate: '/icons/favicon.ico',
		apple: [
			{url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png'},
		],
		mask: '/icons/safari-pinned-tab.svg',
	},
};
