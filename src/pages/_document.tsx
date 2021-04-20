import Document, { Head, Html, Main, NextScript } from 'next/document'

import React from 'react'

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

          <link href="/site.webmanifest" rel="manifest" />

          {/* SEO */}
          <meta name="robots" content="follow, index" />
          <meta name="keywords" content="tech,javascript,react,blog,robinandeer,sourdough bread" key="keywords" />

          {/* Social */}
          <meta property="og:site_name" content="Robin Andeer" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@robinandeer" />

          {/* Favicons */}
          <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
          <link rel="icon" sizes="32x32" type="image/png" href="/icons/favicon-32x32.png" />
          <link rel="icon" sizes="16x16" type="image/png" href="/icons/favicon-16x16.png" />
          <link rel="alternate icon" href="/icons/favicon.ico" />
          <link rel="mask-icon" href="/icons/favicon.svg" color="#D1D1D1" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

          {/* Theme */}
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
