import { useEffect, useState } from "react";
import { gql, GraphQLClient } from "graphql-request";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css";
import COLORS from "../../Data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  height: 100vh;

  .fullscreen-image {
    z-index: 1;
    display: none;
    opacity: 0;
    transition: opacity 0.25s ease;
    position: absolute;
    background: #fff;
    width: 100%;
    height: 100%;
    left: 0;
    div.image-cont {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .close {
      background: ${(props) => props.colors.grey};
      z-index: 5;
      width: 80px;
      height: 80px;
      position: relative;
      top: 40%;
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
        .icon-spec{
        font-size:30px;
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
  height: 500px;
  margin-top: 5%;
  @media only screen and (max-width: 1300px) {
    height: 400px;
  }

  .image-container {
    flex: 1;
    padding-right: 32px;
    height: 100%;
    position: relative;
    width: 100%;
    div.image {
      position: relative;
      transition: box-shadow 0.25s ease;
      width: 100%;
      height: 100%;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
    cursor: pointer;
    .tooltip {
      width: 180px;
      height: 100px;
      left: calc(50% - 90px);
      top: calc(50% - 50px);
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    &:hover {
      div {
        box-shadow: none;
      }
      .tooltip {
        opacity: 1;
      }
    }
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
    height: 600px;
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

  const [fullscreen, setFullscreen] = useState(false);

  return (
    <Cont colors={COLORS}>
      <div
        className={
          fullscreen ? "fullscreen fullscreen-image" : "fullscreen-image"
        }
      >
        <div className="image-cont">
          <Image src={artPiece.image.url} layout="fill" objectFit="contain" />
          <div
            onClick={() => {
              setFullscreen(false);
            }}
            className="close"
          >
            <FontAwesomeIcon className="icon-spec" icon={faLeftLong} />
          </div>
        </div>
      </div>
      <Content>
        <div
          onClick={() => {
            setFullscreen(true);
          }}
          className="image-container"
        >
          <div className="image">
            <Image src={artPiece.image.url} layout="fill" objectFit="cover" />
          </div>
          <div className="tooltip">
            <h5>Click To Fullscreen</h5>
          </div>
        </div>
        <div className="description">
          <div></div>
          <div>
            <h4 className="mar-bottom-1">{artPiece.title}</h4>
            <h4 className="mar-bottom-2 purple">$250</h4>
            <h5 className="mar-bottom-2 italic light ">12&quot; x 12&quot;</h5>
            <p>{artPiece.description}</p>
          </div>
          <div>
            <button className="base-btn">
              <h5>Add To Cart</h5>
            </button>
          </div>
        </div>
      </Content>
    </Cont>
  );
};

export default Slug;
