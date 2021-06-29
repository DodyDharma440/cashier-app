import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import { ThemeProvider } from "@material-ui/core/styles";
import NProgress from "nprogress";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../styles/nprogress.css";
import "../styles/globals.css";
import theme from "theme";
import { UserProvider } from "@context/user";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const jss = document.querySelector("#jss-server-side");
    if (jss) {
      jss.parentElement?.removeChild(jss);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/assets/images/initial-logo.png" />
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
};
export default App;
