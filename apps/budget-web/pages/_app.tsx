import { AppProps } from 'next/app';
import {
  Client as UrqlClient,
  Provider as UrlqlProvider,
  cacheExchange,
  fetchExchange
} from 'urql';
import { environment } from '../environments';
import { ChakraProvider } from '@chakra-ui/react';

const client = new UrqlClient({
  url: `${environment.apiUrl}/graphql`,
  exchanges: [cacheExchange, fetchExchange]
});

export const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <UrlqlProvider value={client}>
        <Component {...pageProps} />
      </UrlqlProvider>
    </ChakraProvider>
  );
};

export default App;