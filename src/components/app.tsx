import * as gtag from 'lib/gtag';

import React, { useEffect } from 'react';

import { AppProps } from 'next/app';
import CommandBox from './command-box';
import { CommandProvider } from 'lib/command-context';
import Head from 'next/head';
import { ThemeProvider } from 'lib/hooks';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => gtag.pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

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
