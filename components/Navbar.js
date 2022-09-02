import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRef, useState } from "react";
import Dropdown from "./Dropdown";
const Cont = styled.div`
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 1rem;
  justify-content: space-between;
  .line {
    width: 100px;
    height: 4px;
    background: black;
    position: absolute;
    top: 100%;
  }
  .padding {
    padding: 8px;
  }
  .nav-left {
  }
  .nav-right {
    position: relative;
    display: flex;
    h6 {
      margin-left: 1rem;
    }
  }
`;
const Navbar = () => {
  const refOne = useRef();
  const refTwo = useRef();
  const refThree = useRef();
  const [visible, setVisible] = useState(false);
  const [leftStyle, setLeftStyle] = useState("200px");
  const showHover = (navRef) => {
    console.log(navRef);
    setLeftStyle(navRef.current.offsetLeft + 20 / 2 + "px");
  };

  const removeHover = () => {};

  return (
    <Cont className="mar-sm">
      <div className="nav-left">
        <Link href="/" passHref>
          <a title="Home Page" rel="noopener noreferrer">
            <h6 className="padding">Barbs Art</h6>
          </a>
        </Link>
      </div>

      <div onMouseLeave={removeHover} className="nav-right">
        <Dropdown text="View Art" />
        <div className="line" style={{ left: leftStyle }}></div>
        <Link href="/commisions" passHref>
          <a title="Commisions" rel="noopener noreferrer">
            <h6
              onMouseEnter={() => showHover(refOne)}
              ref={refOne}
              className="padding"
            >
              Commisions
            </h6>
          </a>
        </Link>
        <Link href="/slideshows" passHref>
          <a title="Slideshows" rel="noopener noreferrer">
            <h6
              onMouseEnter={() => showHover(refTwo)}
              ref={refTwo}
              className="padding"
            >
              Slideshows
            </h6>
          </a>
        </Link>
        <Link href="/contact" passHref>
          <a title="Contact" rel="noopener noreferrer">
            <h6
              ref={refThree}
              onMouseEnter={() => showHover(refThree)}
              className="padding"
            >
              Contact
            </h6>
          </a>
        </Link>
      </div>
    </Cont>
  );
};

export default Navbar;
