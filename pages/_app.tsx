// pages/_app.tsx
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';


import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme'; 

import { AppLayout } from '../components/AppLayout';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>My Finance Screener</title>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </MantineProvider>
  );
}
