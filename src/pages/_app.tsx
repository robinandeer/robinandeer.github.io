import '../styles/prism-duotone.css'

import { AppProps } from 'next/app'
import Head from 'next/head'
import { globalStyles } from 'styles/global'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover, minimal-ui"
        />
      </Head>

      {globalStyles}

      <Component {...pageProps} />
    </>
  )
}
