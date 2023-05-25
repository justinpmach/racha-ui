import { createGlobalStyle } from 'styled-components';
import { CartContextProvider } from '@/components/CartContext';
import Head from 'next/head';

const GlobalStyles = createGlobalStyle`
body{
  background-color: #eee;
  padding:0;
  margin: 0;
  font-family: 'Kanit', sans-serif;
}
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <GlobalStyles />

      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
