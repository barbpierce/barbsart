import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Dropdown from "./Dropdown";
const Cont = styled.div`
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 1rem;
  justify-content: space-between;

  .padding {
    padding: 8px;
  }
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
    <Cont className="mar-md">
      <div className="nav-left">
        <Link href="/" passHref>
          <a title="Home Page" rel="noopener noreferrer">
            <h6 className="padding">Barbs Art</h6>
          </a>
        </Link>
      </div>
      <div className="nav-right">
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
    </Cont>
  );
};

export default Navbar;
