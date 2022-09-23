import styled from "styled-components";
import Image from "next/image";
import COLORS from "../Data/colors";
import { useState } from "react";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";
const Cont = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  transition: box-shadow 0.25s ease;
  &:hover {
    box-shadow: none;
  }
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  overflow: hidden;
  .image-details {
  }
  margin-bottom: 2rem;
  .background {
    background-color: ${(props) => props.colors.darkPurple};
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.5;
    top: 0;
    z-index: 1;
  }
  .background-cont {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: top 0.5s ease;
  }
  .image-details {
    position: relative;

    padding: 1rem;
    z-index: 2;
    border: 2px solid white;

    h4 {
      color: ${(props) => props.colors.lightPurple};
      margin-bottom: 2rem;
    }
    .price {
      width: 200px;
      border-radius: 0.5rem;
      text-align: center;
      background-color: rgba(217, 217, 217, 0.7);

      h4 {
        color: ${(props) => props.colors.darkPurple};
      }
    }
  }
`;

const Picture = ({ url, title, description, price, size, sold, landscape }) => {
  const [visible, setVisible] = useState(false);
  const showBackground = () => {
    setVisible(true);
  };

  const hideBackground = () => {
    setVisible(false);
  };
  return (
    <div data-aos="fade-up">
      <Link
        href={{
          pathname: `/artpiece/${title}`,
          
        }}
        passHref
      >
        <a title={title} rel="noopener noreferrer">
          <Cont
            onMouseEnter={showBackground}
            onMouseLeave={hideBackground}
            colors={COLORS}
            className = {landscape ? 'landscape' : 'portrait'}
          >
            <Image alt={title} src={url} layout="fill" objectFit="cover" />
            <div
              className="background-cont"
              style={{ top: visible ? "0" : "100%" }}
            >
              <div className="image-details">
                <h4>{title}</h4>
                <div className="price">
                  <h4>${price}</h4>
                </div>
                <h5 className="light white">{size}</h5>
              </div>
              <div className="background"></div>
            </div>
          </Cont>
        </a>
      </Link>
    </div>
  );
};

export default Picture;
