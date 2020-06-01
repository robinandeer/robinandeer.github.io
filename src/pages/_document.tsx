import Document, { Head, Html, Main, NextScript } from 'next/document';

import React from 'react';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-Language" content="en" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, minimal-ui" />
          <link rel="manifest" href="/manifest.json" />

          <meta name="description" content="Personal site and blog of Robin Andeer." />
          <meta name="keywords" content="tech,javascript,react,blog,robinandeer" />
          <meta property="og:site_name" content="Robin Andeer" />
          <meta name="twitter:site" content="@robinandeer" />
          <meta name="twitter:image" content="/images/twitter-card.png" />
          <meta property="og:image" content="/images/twitter-card.png" />

          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="alternate icon" href="/favicon.ico" />
          <link rel="mask-icon" href="/favicon.svg" color="#000000" />
          <link rel="icon shortcut" type="image/x-icon" href="/favicon.ico" />

          <meta name="msapplication-tap-highlight" content="no" />

          {/* Apple/iOS */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-title" content="Robin Andeer" />

          <meta name="theme-color" content="#000" />
          <meta name="msapplication-TileColor" content="#000000" />

          <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;