import Fonts from '@/components/Fonts';
import '@/styles/globals.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

const theme = extendTheme({
  fonts: {
    heading: `Gotham,sans-serif`,
    body: `Gotham,sans-serif`
  },
  colors: {
    gray: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#647981',
      300: '#F9F9F9',
      400: '#C7C7C7',
      450: '#A4B4B9',
      500: '#AAAAAA',
      600: '#828282',
      700: '#4D4D4D',
      750: '#313131',
      800: '#222222',
      850: '#1A1A1A',
      900: '#111111',
      950: '#181818'
    },
    primary: {
      50: '#DCCCAA',
      100: '#D5C199',
      200: '#CEB788',
      300: '#C7AD77',
      400: '#C0A266',
      500: '#B99855',
      550: '#B99855',
      600: '#947A44',
      700: '#6F5B33',
      800: '#4A3D22',
      900: '#251E11'
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
