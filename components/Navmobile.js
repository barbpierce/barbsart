import styled from "styled-components";
import Link from "next/link";
import COLORS from "../Data/colors";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Cont = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  right: 100%;
  top: 0;
  text-align: center;
  z-index: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: right 0.5s ease;
  .icon-spec {
    font-size: 64px;
    color: ${(props) => props.colors.green};
    position: absolute;
    left: 24px;
    top: 30%;
    cursor: pointer;
    background: white;
    border-radius: 50%;
    transition: color 0.25s ease;
    &:hover {
      color: ${(props) => props.colors.darkGreen};
    }
  }
  a:hover {
    text-decoration: none;
  }

  background-image: linear-gradient(${(props) => props.colors.blue}, white);
  h2,
  h3 {
    color: ${(props) => props.colors.ultraLightPurple};
    background-color: ${(props) => props.colors.darkPurple};
    margin-bottom: 40px;
    padding: 8px 16px;
    border-radius: 16px;
    border: 2px solid transparent;
    transition: border 0.25s ease-out;
    &:hover {
      border: 2px solid ${(props) => props.colors.ultraLightPurple};
    }
  }
`;
const Navmobile = ({ visible, toggleVisible }) => {
  return (
    <Cont style={{ right: visible ? "0" : "100%" }} colors={COLORS}>
      <FontAwesomeIcon
        onClick={toggleVisible}
        icon={faChevronCircleLeft}
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
