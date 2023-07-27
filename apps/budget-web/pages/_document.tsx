import { ColorModeScript } from '@chakra-ui/react';
import {
  Head,
  Html,
  Main,
  default as NextDocument,
  NextScript
} from 'next/document';
import { theme } from '@finance/react';

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}