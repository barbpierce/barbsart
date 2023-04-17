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
  min-height: 100vh;
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
    query Pencil {
      catagory(where: { title: "Pencil crayon" }) {
        artPieces {
          title
          sold
          landscape
          dimensions
          price
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

  const meta = {
    title: "Pastel Art",
    description:
      "Pencil crayon art pieces for sale in Ottawa/Carp, available online with worldwide shipping.",
    link: "https://www.barbpierceart.com/pencil",
    type: "website",
    date: "2023-04-17 6:45:00:000",
    image: "/seo/pencil_preview.png",
    keywords:
      "pencil crayon art, art commissions, art carp, art ottawa, art for sale online, online art gallery, online art gallery carp, online art gallery ottawa",
  };
  const imageElems = artPieces.map((artPiece, index) => {
    return (
      <Picture
        key={index}
        url={artPiece.image.url}
        title={artPiece.title}
        description={artPiece.description}
        price={artPiece.price}
        size={artPiece.dimesions}
        sold={artPiece.sold}
        landscape={artPiece.landscape}
      />
    );
  });
  return <Cont>{imageElems}</Cont>;
}
