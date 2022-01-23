import Document, {Head, Html, Main, NextScript} from 'next/document';

import type {DocumentContext} from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(context: DocumentContext) {
		const initialProps = await Document.getInitialProps(context);
		return {...initialProps};
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<link href="/site.webmanifest" rel="manifest"/>

					{/* SEO */}
					<meta name="robots" content="follow, index"/>
					<meta key="keywords" name="keywords" content="tech,javascript,react,blog,robinandeer"/>

					{/* Social */}
					<meta property="og:site_name" content="Robin Andeer"/>

					<meta name="twitter:card" content="summary_large_image"/>
					<meta name="twitter:site" content="@robinandeer"/>

					{/* Favicons */}
					<link rel="icon" type="image/svg+xml" href="/icons/favicon.svg"/>
					<link rel="icon" sizes="32x32" type="image/png" href="/icons/favicon-32x32.png"/>
					<link rel="icon" sizes="16x16" type="image/png" href="/icons/favicon-16x16.png"/>
					<link rel="alternate icon" href="/icons/favicon.ico"/>
					<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#fff"/>
					<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"/>

					{/* Theme */}
					<meta name="theme-color" content="#fff"/>
					<meta name="msapplication-TileColor" content="#fff"/>

					{/* Splitbee */}
					<script async src="https://cdn.splitbee.io/sb.js"/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
