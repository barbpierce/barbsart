import React from "react";
import styled from "styled-components";
import Link from "next/link";
import COLORS from "../Data/colors";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Navmobile from "./Navmobile";
import Dropdown from "./Dropdown";
const Cont = styled.div`
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 1rem;
  justify-content: space-between;
  .hamburger {
    border: 2px solid black;
    padding: 4px;
    cursor: pointer;
    transition: background-color 0.25s ease-out;
    &:hover {
      background-color: ${(props) => props.colors.lightPurple};
    }
  }
  a {
    text-decoration-thickness: 4px;
    text-underline-offset: 4px;
  }
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
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };
  return (
    <Cont colors={COLORS} className="mar-sm">
      <div className="nav-left">
        <Link href="/" passHref>
          <a title="Home Page" rel="noopener noreferrer">
            <h6 className="padding">Barbs Art</h6>
          </a>
        </Link>
      </div>

      <div className="nav-right tablet">
        <Dropdown text="View Art" />

        <Link href="/commisions" passHref>
          <a title="Commisions" rel="noopener noreferrer">
            <h6 className="padding">Commisions</h6>
          </a>
        </Link>
        <Link href="/slideshows" passHref>
          <a title="Slideshows" rel="noopener noreferrer">
            <h6 className="padding">Slideshows</h6>
          </a>
        </Link>
        <Link href="/contact" passHref>
          <a title="Contact" rel="noopener noreferrer">
            <h6 className="padding">Contact</h6>
          </a>
        </Link>
      </div>
      <div className="mobile nav-mobile">
        <Navmobile visible={visible} toggleVisible={toggleVisible} />
        <FontAwesomeIcon
          onClick={toggleVisible}
          icon={faBars}
          className="hamburger"
          size="xl"
        />
      </div>
    </Cont>
  );
};

export default Navbar;
