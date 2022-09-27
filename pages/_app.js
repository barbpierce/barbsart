import "../styles/globals.scss";
import Layout from "../components/Layout";
import { useState, createContext } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
export const AppContext = createContext("");
function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({ items: [] });
  const SEO = {
    title: "Barbs Art",
    description: "Personal art portfolio",
    keywords: ["art", "art Portfolio", "watercolor art", "art commisions"],
    
    icon: "/favicon.io",
    openGraph: {
      type: "website",
      locale: "en_ID",
      url: "https://www.barbsart.vercel.app/",
      site_name: "Barbs Art",
      description: "View my art portfolio and purchase pieces",
      images: [
        {
          url: "/art.PNG",
          width: 800,
          height: 600,
          alt: "Barbs Art",
        },
      ],
    },
  };
  return (
    <AppContext.Provider value={[cart, setCart]}>
      <NextSeo {...SEO}/>
      <Layout>
        <Head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
