import Document, { Head, Html, Main, NextScript } from 'next/document'

import React from 'react'

const SITE_DESCRIPTION = 'Personal site and blog of Robin Andeer.'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Language" content="en" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />

          <meta name="robots" content="follow, index" />

          <meta name="description" content={SITE_DESCRIPTION} key="description" />
          <meta name="keywords" content="tech,javascript,react,blog,robinandeer,sourdough bread" key="keywords" />

          <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL} />
          <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
          <meta property="og:title" content="Robin Andeer" />
          <meta property="og:site_name" content="Robin Andeer" />
          <meta property="og:description" content={SITE_DESCRIPTION} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@robinandeer" />
          <meta name="twitter:title" content="Robin Andeer" />

          <link href="/site.webmanifest" rel="manifest" />
          <link href="/icons/favicon.ico" rel="shortcut icon" />
          <link href="/icons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/icons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/icons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/icons/favicon.svg" rel="icon" type="image/svg+xml" />
          <link href="/icons/favicon.ico" rel="alternate icon" />
          <link href="/icons/favicon.svg" rel="mask-icon" color="#D1D1D1" />

          <meta name="msapplication-tap-highlight" content="no" />

          {/* Apple/iOS */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Robin Andeer" />

          <meta name="theme-color" content="#D1D1D1" />
          <meta name="msapplication-TileColor" content="#D1D1D1" />

          {/* Splitbee */}
          <script async src="https://cdn.splitbee.io/sb.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
