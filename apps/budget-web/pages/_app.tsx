import { AppProps } from 'next/app';
import {
  Client as UrqlClient,
  Provider as UrlqlProvider,
  cacheExchange,
  fetchExchange
} from 'urql';

const client = new UrqlClient({
  url: 'http://localhost:3333/graphql',
  exchanges: [cacheExchange, fetchExchange] //what is this
});

export const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UrlqlProvider value={client}>
      <Component {...pageProps} />
    </UrlqlProvider>
  );
};

export default App;