import React from "react";
import styled from "styled-components";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import COLORS from "../../Data/colors";
const QuestionElem = styled.div`
  //grid-area: left;
  padding: 2rem;
  background-color: ${(props) => props.colors.lightPurple};
  h4 {
    text-decoration-line: underline;
    text-decoration-thickness: 3px;
    margin-bottom: 3rem;
  }
  .icon-spec {
    color: ${(props) => props.colors.darkPurple};
    margin-left: 8px;
  }
  .line {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    a {
      margin-left: 1rem;
    }
  }
  .box {
    border: 2px solid black;
    border-radius: 0.5rem;
    background: #fff;
    padding: 8px;
    display: flex;
    align-items: center;
  }
`;

const Questions = () => {
  return (
    <QuestionElem colors={COLORS}>
      <h4>Any Questions?</h4>

      <div className="line">
        <div className="box">
          <div>
            <h5>Email Me At</h5>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faEnvelope}
              className="icon-spec"
              size="lg"
            />
          </div>
        </div>
        <a href="mailto: kayakbarb@gmail.com">
          <p>kayakbarb@gmail.com</p>
        </a>
      </div>
      <div className="line">
        <div className="box">
          <div>
            <h5>Call Me At</h5>
          </div>
          <div>
            <FontAwesomeIcon icon={faPhone} className="icon-spec" size="lg" />
          </div>
        </div>
        <a href="tel: 613-220-1173">
          <p>613-220-1173</p>
        </a>
      </div>
    </QuestionElem>
  );
};

export default Questions;
