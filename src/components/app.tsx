import FullStory from 'react-fullstory';
import React from 'react';
import { ThemeProvider } from 'lib/hooks';

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <ThemeProvider>
      <FullStory org="VFF1B" />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
