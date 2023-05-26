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
      <GlobalStyles />

      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
