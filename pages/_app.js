import "../styles/globals.scss";
import Layout from "../components/Layout";
import { useState, createContext } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
export const AppContext = createContext("");
function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({ items: [], total: 0, shipping: 0 });
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
      <NextSeo {...SEO} />
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
