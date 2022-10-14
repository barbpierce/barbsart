import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import COLORS from "../../Data/colors";
const QuestionElem = styled.div`
  position: relative;
  text-align: center;
  padding: 32px;

  .image-container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  a {
    &:hover {
      p {
        color: ${(props) => props.colors.orange};
      }
    }
    p {
      color: black;
      text-decoration: underline;
      word-wrap: break-word;
    }
  }
  .info-box {
    width: 50%;
    left: calc(25% + 32px);
    bottom: calc(-25% + 32px);
  }
`;

const Questions = () => {
  return (
    <QuestionElem colors={COLORS}>
      <div className="image-container">
        <Image src="/images/barb-180.jpg" layout="fill" objectFit="cover" />
      </div>
      <div className="info-box">
        <h5 className="purple mar-bottom-16">Ask me about my art!</h5>

        <a href="mailto:kayakbarb@gmail.com">
          <p>Kayakbarb@gmail.com</p>
        </a>
      </div>
    </QuestionElem>
  );
};

export default Questions;
