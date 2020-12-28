import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { css, Global } from '@emotion/react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content={'user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height'} />
        </Head>
        <Global
          styles={css`
            * {
              margin: 0;
              padding: 0;
              color: white;
              background: black;
              font-family: Helvetica, Arial, sans-serif;
              font-size: 18px;
            }

            html, body {
              min-height: 100%;
            }
          `}
        />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
