import { useEffect } from "react";
import { gql, GraphQLClient } from "graphql-request";
import { NextSeo } from "next-seo";
import styled from "styled-components";
import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css";
const Cont = styled.div`
height:100vh;
`;
const Content = styled.div`
  display: flex;
  height: 400px;
  margin: 10% 5% 0;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    height: 800px;
  }
  .image-container {
    flex: 1;
    padding-right: 32px;
    height: 100%;
    position: relative;
    width: 100%;
    div {
      position: relative;

      width: 100%;
      height: 100%;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  }
  .description {
    flex: 1;
    padding-left: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Slug = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Cont>
      <Content>
      <div data-aos="fade-right" className="image-container">
        <div>
          <Image src="/images/art1.jpg" layout="fill" objectFit="cover" />
        </div>
      </div>
      <div data-aos="fade-left" className="description">
        <div></div>
        <div>
          <h4 className="mar-bottom-1">Starry Night</h4>
          <h4 className="mar-bottom-2 purple">$250</h4>
          <h5 className="mar-bottom-2 italic light ">12&quot; x 12&quot;</h5>
          <p>
            This is the description of the art piece: what it's made with, and
            what makes it special.
          </p>
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
