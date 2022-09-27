import "../styles/globals.scss";
import Layout from "../components/Layout";
import { useState, createContext } from "react";
import {NextSeo} from 'next-seo';
export const AppContext = createContext("");
function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({items:[]});
  return (
    <AppContext.Provider value={[cart, setCart]}>
    <NextSeo />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
