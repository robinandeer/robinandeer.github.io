import 'styles/global.css';
import 'styles/prism-duotone.css';
import React from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import type {AppProps} from 'next/app';
import type {FC} from 'react';

const logPageVisit = async (url: string) => {
  if (process.env.NODE_ENV === 'production') {
    await fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
  } else {
    console.log("Would've logged page", url)
  }
}

const MyApp: FC<AppProps> = ({Component, pageProps}) => {
	const router = useRouter()

  React.useEffect(() => {
    logPageVisit(router.asPath)
    router.events.on('routeChangeStart', logPageVisit)
    return () => router.events.off('routeChangeStart', logPageVisit)
  }, [])

	return (
		<>
			<Head>
				<meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover, minimal-ui"
        />
			</Head>
			<Component {...pageProps}/>
		</>
	)
}

export default MyApp;
