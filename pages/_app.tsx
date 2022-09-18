import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import Layout from 'layouts/default';
import fetchJson from 'lib/fetchersJSON';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            throw new Error(err);
          },
        }}
      >
        <ThemeProvider attribute="class">
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
};

export default MyApp;
