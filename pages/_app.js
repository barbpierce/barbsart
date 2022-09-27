import "../styles/globals.scss";
import Layout from "../components/Layout";
import { useState, createContext } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
export const AppContext = createContext("");
function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({ items: [] });
  return (
    <AppContext.Provider value={[cart, setCart]}>
      <Head>
       
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
