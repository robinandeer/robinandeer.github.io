import 'styles/global.css';
import 'styles/prism-theme.css';

import type {AppProps} from 'next/app';
import {FC} from 'react';
import Head from 'next/head';
import React from 'react';

const MyApp: FC<AppProps> = ({Component, pageProps}) => (
	<>
		<Head>
			<meta name='viewport' content='width=device-width, initial-scale=1'/>
		</Head>
		<Component {...pageProps}/>
	</>
);

export default MyApp;
