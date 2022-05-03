import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800;900&family=Roboto+Mono:wght@400;500;700&family=Roboto+Slab:wght@300;400;500;700;800&family=Roboto:ital,wght@0,400;0,700;0,900;1,700&display=swap" rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
