import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { gql, GraphQLClient } from "graphql-request";
import COLORS from "../Data/colors";
import { useState, useRef, useEffect } from "react";
import ImageSelect from "../components/slideshow/imageSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  margin-bottom: 128px;
  .image-container {
    position: relative;
    max-width: 1000px;
    height: 600px;
    margin-right: auto;
    margin-left: auto;
    border: 10px solid ${(props) => props.colors.black};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    transition: box-shadow 0.25s ease;
    &:hover {
      box-shadow: none;
    }
    @media only screen and (max-width: 400px) {
      height: 400px;
      border: 4px solid ${(props) => props.colors.black};
    }
    .img-cont {
      position: relative;
      width: 100%;
      height: 100%;
      border: 1px solid transparent;
      &:hover {
        border: 1px solid black;
      }
      &:after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset;
      }
    }
  }
  .click {
    cursor: pointer;
    position: absolute;
    display: flex;
    width: 64px;
    height: 64px;
    border: 1px solid black;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props) => props.colors.darkPurple};
    background-color: ${(props) => props.colors.ultraLightPurple};
    z-index: 5;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: ${(props) => props.colors.darkPurple};
      .purple {
        color: ${(props) => props.colors.lightPurple};
      }
    }
    @media only screen and (max-width: 800px) {
      width: 32px;
      height: 32px;
      padding: 6px;
    }
  }
  .click-left {
    top: calc(50% - 32px);
  }
  .click-right {
    right: 0;
    top: calc(50% - 32px);
  }
  .mat {
    cursor: pointer;
    position: absolute;
    background: white;
    padding: 32px;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset;
    @media only screen and (max-width: 400px) {
      padding: 12px 8px;
    }
  }

  .image-select {
    max-width: 1000px;
    margin: 0 auto;
    background: rgb(150, 113, 255);
    background: linear-gradient(
      90deg,
      rgba(150, 113, 255, 1) 0%,
      rgba(87, 0, 140, 1) 50%,
      rgba(150, 113, 255, 1) 98%
    );
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
  const [imageWidth, setImageWidth] = useState(128);

  useEffect(() => {
    if (window.innerWidth <= 400) {
      setImageWidth(48);
    }
  }, []);

  const handleResize = () => {
    if (window.innerWidth <= 400) {
      setImageWidth(48);
    } else if (imageWidth !== 128) {
      {
        setImageWidth(128);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [link, setLink] = useState(artPieces[0].title);
  const [imageValue, setImageValue] = useState({
    index: 0,
    src: artPieces[0].image.url,
  });
  const [left, setLeft] = useState("0px");
  console.log(imageWidth);
  const updateImage = (id) => {
    setLink((prev) => {
      return artPieces[id].title;
    });
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

  const imageClick = (val) => {
    const id = imageValue.index + val;
    const realId = id + 1;
    if (id < 0 || id > artPieces.length - 1) {
      return;
    }
    setLink((prev) => {
      return artPieces[id].title;
    });
    setImageValue((prevValue) => {
      return {
        index: id,
        src: artPieces[id].image.url,
      };
    });

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
  const width = artPieces.length * imageWidth + "px";

  const meta = {
    title: "Art Slideshow",
    description: "",
    link: "",
    type: "website",
    date: "2022-11-16 6:45:00:000",
    image: "",
    keywords:
      "art slideshow, online art slideshow, ottawa art, local art, art comissions",
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
      <Cont colors={COLORS}>
        <div className="mar-sm image-container">
          <div className="click click-right" onClick={() => imageClick(1)}>
            <FontAwesomeIcon className="icon-lg purple" icon={faChevronRight} />
          </div>
          <div className="click click-left" onClick={() => imageClick(-1)}>
            <FontAwesomeIcon className="icon-lg purple" icon={faChevronLeft} />
          </div>
          <Link
            href={{
              pathname: `/artpiece/${link}`,
            }}
            passHref
          >
            <a title={link} rel="noopener noreferrer">
              <div className="mat">
                <div className="img-cont">
                  <Image
                    src={imageValue.src}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </a>
          </Link>
        </div>

        <div ref={slideCont} className="image-select">
          <div className="images" style={{ width: width, left: left }}>
            {imageElems}
          </div>
        </div>
      </Cont>
    </>
  );
};

export default Slideshows;
