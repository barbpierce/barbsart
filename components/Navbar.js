import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cont = styled.div`
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 1rem;
  justify-content: space-between;
  .nav-left {
  }
  .nav-right {
    display: flex;
    h6 {
      margin-left: 1rem;
    }
  }
`;
const Navbar = () => {
  return (
    <Cont>
      <div className="nav-left">
        <Link href="/" passHref>
          <a title="Home Page" rel="noopener noreferrer">
            <h6>Barbs Art</h6>
          </a>
        </Link>
      </div>
      <div className="nav-right">
        <h6>View Art</h6>
        <FontAwesomeIcon icon={faChevronDown} size="lg" />

        <Link href="/" passHref>
          <a title="Home Page" rel="noopener noreferrer">
            <h6>Commisions</h6>
          </a>
        </Link>
        <Link href="/" passHref>
          <a title="Home Page" rel="noopener noreferrer">
            <h6>Slideshows</h6>
          </a>
        </Link>
        <Link href="/" passHref>
          <a title="Home Page" rel="noopener noreferrer">
            <h6>Contact</h6>
          </a>
        </Link>
      </div>
    </Cont>
  );
};

export default Navbar;
