import type { AppProps } from 'next/app';
import Head from 'next/head';
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
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </>
  );
};

export default MyApp;
