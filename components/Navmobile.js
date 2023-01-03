import styled from "styled-components";
import Link from "next/link";
import COLORS from "../Data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  text-align: center;
  z-index: 2;
  padding: 24px;
  transition: right 0.5s ease;
  .return {
    cursor: pointer;
    border: 4px solid ${(props) => props.colors.lightPurple};
    margin-bottom: 32px;
    transition: all 0.25s ease;
    border-style: outset;
    padding: 4px;
    background: rgb(150, 113, 255);
    background: linear-gradient(
      180deg,
      rgba(150, 113, 255, 1) 0%,
      rgba(87, 0, 140, 1) 100%
    );
    &:hover,
    &:active {
      background: ${(props) => props.colors.lightPurple};
      border: 4px solid ${(props) => props.colors.darkPurple};
      .icon-lg {
        color: ${(props) => props.colors.darkPurple};
      }
    }
    .icon-lg {
      transition: color 0.25s ease;
      transform: rotate(90deg);
      color: ${(props) => props.colors.lightPurple};
    }
  }
  .icon-spec {
    font-size: 64px;
    color: white;
    position: absolute;
    right: 24px;
    top: 33%;
    cursor: pointer;
    background: red;
    border-radius: 50%;
    transition: color 0.25s ease, background-color 0.25s ease;
    box-shadow: rgba(255, 0, 0, 0.25) 0px 54px 55px,
      rgba(255, 0, 0, 0.12) 0px -12px 30px, rgba(255, 0, 0, 0.12) 0px 4px 6px,
      rgba(255, 0, 0, 0.17) 0px 12px 13px, rgba(255, 0, 0, 0.09) 0px -3px 5px;

    padding: 8px;
    &:hover {
      color: red;
      background-color: white;
    }
  }
  a:hover {
    text-decoration: none;
  }

  background-image: linear-gradient(white, black, white);
  h3,
  h4 {
    color: #000;
    background-color: #fff;
    margin-bottom: 32px;
    padding: 8px 16px;
    border-radius: 16px;
    border: 2px solid transparent;
    transition: border 0.25s ease-out;
    &:hover {
      border: 2px solid ${(props) => props.colors.ultraLightPurple};
    }
  }
  h3 {
    border: 4px solid black;
    &:hover {
      border: 4px solid white;
    }
  }
  h4 {
    border: 2px solid black;
  }
  .art {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
`;
const Navmobile = ({ visible, toggleVisible }) => {
  return (
    <Cont style={{ right: visible ? "0" : "-100%" }} colors={COLORS}>
      <div className="return" onClick={toggleVisible}>
        <FontAwesomeIcon icon={faTurnUp} className="icon-lg" />
      </div>
      <Link href="/" passHref>
        <a
          onClick={toggleVisible}
          title="View all art"
          rel="noopener noreferrer"
        >
          <h3 className="bold">View All Art</h3>
        </a>
      </Link>
      <Link href="/watercolour" passHref>
        <a
          onClick={toggleVisible}
          title="Water colour"
          rel="noopener noreferrer"
        >
          <h4 className="art">Water Colour</h4>
        </a>
      </Link>
      <Link href="/oilbased" passHref>
        <a onClick={toggleVisible} title="Oil based" rel="noopener noreferrer">
          <h4 className="art">Oil Based</h4>
        </a>
      </Link>
      <Link href="/pencil" passHref>
        <a onClick={toggleVisible} title="Pencil" rel="noopener noreferrer">
          <h4 className="art">Pencil</h4>
        </a>
      </Link>
      <Link href="/commissions" passHref>
        <a onClick={toggleVisible} title="Commisions" rel="noopener noreferrer">
          <h4>Commisions</h4>
        </a>
      </Link>
      <Link href="/slideshows" passHref>
        <a onClick={toggleVisible} title="Slideshows" rel="noopener noreferrer">
          <h4>Slideshows</h4>
        </a>
      </Link>
      <Link href="/contact" passHref>
        <a onClick={toggleVisible} title="Contact" rel="noopener noreferrer">
          <h4>Contact</h4>
        </a>
      </Link>
    </Cont>
  );
};

export default Navmobile;
