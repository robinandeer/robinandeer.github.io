import * as FullStory from '@fullstory/browser';

import { AppProps } from 'next/app';
import CommandBox from './command-box';
import { CommandProvider } from 'lib/command-context';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'lib/hooks';

FullStory.init({
  orgId: process.env.NEXT_PUBLIC_FULLSTORY_ORG_ID,
  devMode: process.env.NODE_ENV !== 'production',
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, minimal-ui" />
      </Head>
      <ThemeProvider>
        <CommandProvider>
          <Component {...pageProps} />

          <CommandBox />
        </CommandProvider>
      </ThemeProvider>
    </>
  );
}
