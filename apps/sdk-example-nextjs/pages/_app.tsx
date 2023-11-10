import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { MoneriumProvider } from '@monerium/sdk-react-provider';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to sdk-example-nextjs!</title>
      </Head>
      <main className="app">
        <MoneriumProvider
          clientId="f99e629b-6dca-11ee-8aa6-5273f65ed05b"
          redirectUrl="http://localhost:5173"
        >
          <Component {...pageProps} />
        </MoneriumProvider>
      </main>
    </>
  );
}

export default CustomApp;
