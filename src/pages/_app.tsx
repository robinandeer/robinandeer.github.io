import '../styles/global.css';

import { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, minimal-ui" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
