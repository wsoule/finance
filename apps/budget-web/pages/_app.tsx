import { AppProps } from 'next/app';
import {
  Provider as UrlqlProvider
} from 'urql';
import { ChakraProvider } from '@chakra-ui/react';

import { createUrqlClient } from '../functions/shared/create-urql-client';
import './app.scss';

const urqlClient = createUrqlClient();

export const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <UrlqlProvider value={urqlClient}>
        <Component {...pageProps} />
      </UrlqlProvider>
    </ChakraProvider>
  );
};

export default App;
