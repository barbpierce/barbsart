import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import Picture from "../components/Picture";
import { gql, GraphQLClient } from "graphql-request";
import { useEffect } from "react";
import {
  createUser,
  updateUser,
  fetchUser,
  fetchUserExists,
  createOrder,
  fetchOrder,
  createItem,
  createItems,
  clearOrder,
} from "../utils/SupabaseFunctions";
const Cont = styled.div`
  position: relative;
  display: flex;

  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;

  @media only screen and (max-width: 500px) {
    display: block;
  }
  .block {
    background: red;
    border: 1px solid black;
    width: 600px;
    height: 200px;
    margin-bottom: 250px;
  }
`;

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const query = gql`
    query Artpieces {
      artPieces(first: 100) {
        title
        description
        image {
          url
        }
        price
        landscape
        sold
        dimensions
      }
    }
  `;

  const data = await graphQLClient.request(query);
  const artPieces = data.artPieces;

  return {
    props: {
      artPieces,
    },
  };
};

export default function Home({ artPieces }) {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const imageElems = artPieces.map((artPiece, index) => {
    return (
      <Picture
        key={index}
        url={artPiece.image.url}
        title={artPiece.title}
        description={artPiece.description}
        price={artPiece.price}
        size={artPiece.dimensions}
        sold={artPiece.sold}
        landscape={artPiece.landscape}
      />
    );
  });

  const meta = {
    title: "Barb's Art Gallery",
    description:
      "Ottawa/Carp art gallery, water colour, pastel, pencil crayon. Commissions included for pets, family, friends, landscape and anything else.",
    link: "https://www.barbpierceart.com/",
    type: "website",
    date: "2023-04-17 6:45:00:000",
    image: "/seo/viewall_preview.png",
    keywords:
      "art gallery, local art gallery, online art, ottawa art gallery, art website, carp art commissions, water color art, pencil crayon art, pastel art",
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Barb Pierce Art" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="article:published_time" content={meta.date} />
        <link rel="canonical" href={meta.link} />
        <meta property="og:url" content={meta.link} />
        <meta name="keywords" content={meta.keywords} />

        <meta name="description" content={meta.description} />
      </Head>
      <Cont>{imageElems}</Cont>
    </>
  );
}
