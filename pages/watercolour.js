import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import Picture from "../components/Picture";
import { gql, GraphQLClient } from "graphql-request";
import { useEffect } from "react";
const Cont = styled.div`
  position: relative;
  display: flex;

  align-items: center;
  flex-wrap: wrap;

  justify-content: space-around;

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
    query Watercolour {
      catagory(where: { title: "Watercolour" }) {
        artPieces {
          title
          sold
          landscape
          image {
            url
          }
        }
      }
    }
  `;

  const data = await graphQLClient.request(query);
  const artPieces = data.catagory.artPieces;

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
        price="250"
        size="12 x 12"
        sold={artPiece.sold}
        landscape={artPiece.landscape}
      />
    );
  });

  const meta = {
    title: "Watercolour Art",
    description: "Watercolour art pieces for sale in Ottawa/Carp, available online with worldwide shipping.",
    link: "",
    type: "website",
    date: "2022-11-16 6:45:00:000",
    image: "",
    keywords:
      "watercolour art, art commissions, art carp, art ottawa, art for sale online, online art gallery, online art gallery carp, online art gallery ottawa",
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
      </Head>
      <Cont>{imageElems}</Cont>
    </>
  );
}
