import styled from "styled-components";
import Image from "next/image";
import { gql, GraphQLClient } from "graphql-request";
import COLORS from "../Data/colors";
import { useState, useRef } from "react";
import ImageSelect from "../components/slideshow/imageSelect";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  .image-container {
    position: relative;
    max-width: 1000px;
    height: 600px;
    margin-right: auto;
    margin-left: auto;
    padding: 16px;
    background-color: ${(props) => props.colors.lightYellow};
    border: 2px solid ${(props) => props.colors.darkPurple};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
    transition: box-shadow 0.25s ease;
    &:hover {
      box-shadow: none;
    }
    div {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }

  .image-select {
    max-width: 1000px;
    margin: 0 auto;
    background-color: ${(props) => props.colors.lightYellow};
    border-top: 1px solid ${(props) => props.colors.darkPurple};
    border-bottom: 1px solid ${(props) => props.colors.darkPurple};
    padding-top: 32px;
    padding-bottom: 32px;
    position: relative;
    height: 184px;
    overflow: hidden;
    .images {
      overflow: auto;
      position: absolute;
      transition: left 0.5s ease;
    }
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
        landscape
        sold
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

const Slideshows = ({ artPieces }) => {
  const slideCont = useRef();
  const imageWidth = 132;
  const [imageValue, setImageValue] = useState({
    index: 0,
    src: artPieces[0].image.url,
  });
  const [left, setLeft] = useState("0px");
  const images = [
    {
      src: "/images/art1.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art2.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art3.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/dog.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/holistic.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/lungs.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/pollution.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art1.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art2.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art3.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/dog.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/holistic.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/lungs.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/pollution.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art1.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art2.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art3.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/dog.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/holistic.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/lungs.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/pollution.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art1.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art2.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art3.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/dog.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/holistic.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/lungs.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/pollution.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art1.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art2.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art3.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/dog.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/holistic.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/lungs.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/pollution.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art1.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art2.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art3.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/dog.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/holistic.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/lungs.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/pollution.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
  ];

  const updateImage = (id) => {
    setImageValue((prevValue) => {
      return {
        index: id,
        src: artPieces[id].image.url,
      };
    });
    let realId = id + 1;
    const width = slideCont.current.clientWidth;

    const leftValue = width / 2 + imageWidth / 2 - realId * imageWidth + "px";

    setLeft(leftValue);
  };

  const imageElems = artPieces.map((artPiece, index) => {
    return (
      <ImageSelect
        updateImage={updateImage}
        key={index}
        index={index}
        title={artPiece.title}
        url={artPiece.image.url}
      />
    );
  });
  const width = images.length * imageWidth + "px";

  return (
    <Cont colors={COLORS}>
      <div className="mar-sm image-container">
        <div>
          <Image src={imageValue.src} layout="fill" objectFit="contain" />
        </div>
      </div>

      <div ref={slideCont} className="image-select">
        <div className="images" style={{ width: width, left: left }}>
          {imageElems}
        </div>
      </div>
    </Cont>
  );
};

export default Slideshows;
