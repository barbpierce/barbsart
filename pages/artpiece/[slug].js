import { useEffect, useState, useContext } from "react";
import { gql, GraphQLClient } from "graphql-request";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css";
import COLORS from "../../Data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../pages/_app";
import toast, { Toaster } from "react-hot-toast";
import { updateLocalStorage } from "../lib/utils";
const Cont = styled.div`
  min-height: 100vh;
  @media only screen and (max-width: 500px) {
    margin-bottom: 200px;
  }
  .fullscreen-image {
    z-index: 1;
    display: none;

    opacity: 0;
    transition: opacity 0.25s ease;
    position: absolute;
    background: #fff;

    left: 0;
    top: 0px;
    div.image-cont {
      position: relative;
      width: 100vw;
      height: 100vh;
    }

    .close {
      background: ${(props) => props.colors.grey};
      z-index: 5;
      width: 80px;
      height: 80px;
      position: absolute;
      top: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: 1px solid black;
      transition: background-color 0.25s ease;
      &:hover {
        background-color: black;
        .icon-spec {
          color: ${(props) => props.colors.grey};
        }
      }
      .icon-spec {
        transition: color 0.25s ease;
        font-size: 40px;
      }
    }

    @media only screen and (max-width: 600px) {
      .close {
        width: 60px;
        height: 60px;
        .icon-spec {
          font-size: 30px;
        }
      }
    }
    @media only screen and (max-width: 400px) {
      .close {
        width: 40px;
        height: 40px;
        .icon-lg {
          width: 30px;
        }
      }
    }
  }
  .fullscreen {
    display: block;
    opacity: 1;
  }
`;
const Content = styled.div`
  display: flex;
  height: 60vh;
  margin: 5%;

  @media only screen and (max-width: 500px) {
    margin: 5% 0;
  }
  @media only screen and (max-width: 1300px) {
    height: 400px;
  }
  .image-inner-cont {
    cursor: pointer;
    position: relative;
    padding: 32px;
    background: #fff;

    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5) inset;
    border: 10px solid ${(props) => props.colors.black};
    @media only screen and (max-width: 400px) {
      padding: 12px 8px;
    }
    &:hover {
      div {
        box-shadow: none;
      }
      .tooltip {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
  .image-container {
    flex: 1;
    padding-right: 32px;
    height: 100%;
    position: relative;
    width: 100%;
    min-height: 400px;
    margin-bottom: 32px;
    box-shadow: none !important;
    display: flex;
    justify-content: center;

    div.image {
      position: relative;
      transition: box-shadow 0.25s ease;
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
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .tooltip {
    width: 180px;
    height: 100px;
    left: calc(50% - 90px);
    top: calc(50% - 50px);
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  .description {
    flex: 1;

    padding-left: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  @media only screen and (max-width: 800px) {
    flex-direction: column;

    .image-container {
      padding-right: 0;
    }
  }
`;
export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const pageSlug = pageContext.query.slug;

  const query = gql`
    query ($pageSlug: String!) {
      artPiece(where: { title: $pageSlug }) {
        title
        description
        price
        dimensions
        catagory {
          title
        }
        image {
          url
        }
        landscape
        sold
      }
    }
  `;

  const variables = {
    pageSlug,
  };
  const data = await graphQLClient.request(query, variables);
  const artPiece = data.artPiece;

  return {
    props: {
      artPiece,
    },
  };
};

const Slug = ({ artPiece }) => {
  /*
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  */
  const [context, setContext] = useContext(AppContext);
  const addToCart = (title, price, url, dimensions, catagory) => {
    if (context.items.some((item) => item.title === title)) {
      toast.error("This is already in your cart");
    } else {
      toast.success("Added to cart!");
      setContext((prevContext) => {
        const items = prevContext.items;
        items.push({
          title,
          price,
          url,
          dimensions,
          catagory,
        });
        updateLocalStorage(items);
        const total = prevContext.total + price;
        return {
          ...prevContext,
          items: items,
          total: total,
        };
      });
    }
  };

  const [fullscreen, setFullscreen] = useState(false);

  return (
    <Cont colors={COLORS}>
      <Toaster />
      <div
        className={
          fullscreen ? "fullscreen fullscreen-image" : "fullscreen-image"
        }
      >
        <div className="image-cont">
          <Image
            src={artPiece.image.url}
            layout="fill"
            objectFit="contain"
            objectPosition="top"
            alt={artPiece.title}
          />

          <div
            onClick={() => {
              setFullscreen(false);
            }}
            className="close"
          >
            <FontAwesomeIcon className="icon-spec icon-lg" icon={faLeftLong} />
          </div>
        </div>
      </div>
      <Content colors={COLORS}>
        <div
          onClick={() => {
            setFullscreen(true);
          }}
          className="image-container"
        >
          <div className="image-inner-cont">
            <div className="image">
              <img src={artPiece.image.url} alt={artPiece.title} />
            </div>
            <div className="tooltip">
              <h5>Click To Fullscreen</h5>
            </div>
          </div>
        </div>
        <div className="description">
          <div></div>
          <div>
            <h4 className="mar-bottom-1">{artPiece.title}</h4>
            <h4 className="mar-bottom-2 purple">
              {artPiece.sold ? "Sold" : `$${artPiece.price}`}
            </h4>
            <h5 className="mar-bottom-2 italic light ">
              {artPiece.dimensions}
            </h5>
            <p>{artPiece.description}</p>
          </div>
          <div>
            <button
              disabled={artPiece.sold ? true : false}
              onClick={() =>
                addToCart(
                  artPiece.title,
                  artPiece.price,
                  artPiece.image.url,
                  artPiece.dimensions,
                  artPiece.catagory.title
                )
              }
              className="base-btn"
            >
              <h5>{artPiece.sold ? "Sold" : "Add To Cart"}</h5>
            </button>
          </div>
        </div>
      </Content>
    </Cont>
  );
};

export default Slug;
