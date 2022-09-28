import styled from "styled-components";
import Link from "next/link";
import COLORS from "../Data/colors";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Cont = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 100%;
  top: 0;
  text-align: center;
  z-index: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: left 0.5s ease;
  .icon-spec {
    font-size: 64px;
    color: white;
    position: absolute;
    right: 24px;
    top: 33%;
    cursor: pointer;
    background: red;
    border-radius: 50%;
    transition: color 0.25s ease, background-color .25s ease;
    box-shadow: rgba(255, 0, 0, 0.25) 0px 54px 55px, rgba(255, 0, 0, 0.12) 0px -12px 30px, rgba(255, 0, 0, 0.12) 0px 4px 6px, rgba(255, 0, 0, 0.17) 0px 12px 13px, rgba(255, 0, 0, 0.09) 0px -3px 5px;

    padding:8px;
    &:hover {
      color: red;
      background-color: white;
    }
  }
  a:hover {
    text-decoration: none;
  }

  background-image: linear-gradient(white, black, white);
  h2,
  h3 {
    color: #000;
    background-color: #fff;
    margin-bottom: 40px;
    padding: 8px 16px;
    border-radius: 16px;
    border: 2px solid transparent;
    transition: border 0.25s ease-out;
    &:hover {
      border: 2px solid ${(props) => props.colors.ultraLightPurple};
    }
  }
  h2 {
    border: 4px solid black;
    &:hover {
      border: 4px solid white;
    }
  }
  h3 {
    border: 2px solid black;
  }
`;
const Navmobile = ({ visible, toggleVisible }) => {
  return (
    <Cont style={{ left: visible ? "0" : "100%" }} colors={COLORS}>
      <FontAwesomeIcon
        onClick={toggleVisible}
        icon={faRightLong}
        className="icon-spec"
      />

      <Link href="/" passHref>
        <a
          onClick={toggleVisible}
          title="View all art"
          rel="noopener noreferrer"
        >
          <h2 className="bold">View All Art</h2>
        </a>
      </Link>
      <Link href="/watercolour" passHref>
        <a
          onClick={toggleVisible}
          title="Water colour"
          rel="noopener noreferrer"
        >
          <h3>Water Colour</h3>
        </a>
      </Link>
      <Link href="/oilbased" passHref>
        <a onClick={toggleVisible} title="Oil based" rel="noopener noreferrer">
          <h3>Oil Based</h3>
        </a>
      </Link>
      <Link href="/pencil" passHref>
        <a onClick={toggleVisible} title="Pencil" rel="noopener noreferrer">
          <h3>Pencil</h3>
        </a>
      </Link>
      <Link href="/commisions" passHref>
        <a onClick={toggleVisible} title="Commisions" rel="noopener noreferrer">
          <h3>Commisions</h3>
        </a>
      </Link>
      <Link href="/slideshows" passHref>
        <a onClick={toggleVisible} title="Slideshows" rel="noopener noreferrer">
          <h3>Slideshows</h3>
        </a>
      </Link>
      <Link href="/contact" passHref>
        <a onClick={toggleVisible} title="Contact" rel="noopener noreferrer">
          <h3>Contact</h3>
        </a>
      </Link>
    </Cont>
  );
};

export default Navmobile;
