import '../styles/globals.css'
import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Layout from '../src/Layout';


function MyApp({ Component, pageProps }) {


  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
    <Head>
      <title>Django server - Gunicorn, Nginx</title>
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta name="description" content="Setup django server using gunicorn and nginx" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </React.Fragment>
  )

}

export default MyApp
