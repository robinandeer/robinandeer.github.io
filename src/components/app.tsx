import { AppProps } from 'next/app';
import CommandBox from './command-box';
import { CommandProvider } from 'lib/command-context';
import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'lib/hooks';

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
