import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

  render() {
    return (
      <html>
        <Head>
          <link rel="shortcut icon" href="/images/logo.png" />
          <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/assets/css/style.css" />
          <link rel="stylesheet" href="/assets/css/font-awesome.min.css" />
          <link rel="stylesheet" href="/assets/css/line-awesome.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/assets/js/jquery-3.2.1.min.js"></script>
          <script src="/assets/js/popper.min.js"></script>
          <script src="/assets/js/bootstrap.min.js"></script>
          <script src="/assets/js/jquery.slimscroll.min.js"></script>
          <script src="/assets/js/app.js"></script>
        </body>
      </html>
    );
  }
}
