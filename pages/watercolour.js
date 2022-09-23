import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import Picture from "../components/Picture";
import { gql, GraphQLClient } from "graphql-request";
import { useEffect } from "react";
const Cont = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  @media only screen and (max-width: 905px) {
    justify-content: space-around;
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
  return <Cont>{imageElems}</Cont>;
}
