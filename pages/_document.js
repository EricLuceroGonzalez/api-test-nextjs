import Document, { Html, Head, Main, NextScript } from "next/document";
// https://nextjs.org/docs/advanced-features/react-18/server-components#nextdocument
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
            <div id='overlays'></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
