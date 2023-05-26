import {
  Head,
  Html,
  Main,
  default as NextDocument,
  NextScript
} from 'next/document';

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}