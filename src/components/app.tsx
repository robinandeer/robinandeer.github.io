import * as FullStory from '@fullstory/browser';

import React from 'react';
import { ThemeProvider } from 'lib/hooks';

FullStory.init({
  orgId: process.env.NEXT_PUBLIC_FULLSTORY_ORG_ID,
  devMode: process.env.NODE_ENV !== 'production',
});

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
