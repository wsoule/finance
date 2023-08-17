import { AppProps } from 'next/app';
import { Provider as UrlqlProvider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';
import { createUrqlClient } from '../functions/shared/create-urql-client';
import './app.module.scss';
import { theme } from '@finance/react';
import { FC } from 'react';

const urqlClient = createUrqlClient();

export const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <UrlqlProvider value={urqlClient}>
        <Component {...pageProps} />
      </UrlqlProvider>
    </ChakraProvider>
  );
};

export default App;
