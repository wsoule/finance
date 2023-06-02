import { AppProps } from 'next/app';
import {
  Client as UrqlClient,
  Provider as UrlqlProvider,
  cacheExchange,
  fetchExchange
} from 'urql';
import { environment } from '../environments';

const client = new UrqlClient({
  url: `${environment.apiUrl}/graphql`,
  exchanges: [cacheExchange, fetchExchange]
});

export const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UrlqlProvider value={client}>
      <Component {...pageProps} />
    </UrlqlProvider>
  );
};

export default App;