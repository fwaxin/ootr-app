import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';

import Layout from 'layouts/default';
import createEmotionCache from 'lib/createEmotionCache';
import fetchJson from 'lib/fetchersJSON';
import CustomThemeProvider from 'provider/CustomThemeProvider';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CustomThemeProvider>
        <SWRConfig
          value={{
            fetcher: fetchJson,
            onError: (err) => {
              throw new Error(err);
            },
          }}
        >
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </CustomThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
