import COLORS from "../../Data/colors";
import styled from "styled-components";
import Link from "next/link";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cont = styled.div`
  background-color: ${(props) => props.colors.darkPurple};
  display: flex;
  justify-content: space-between;
  padding: 40px;
  @media only screen and (max-width: 800px) {
    display: grid;
    row-gap: 64px;
    grid-template-areas:
      "left left right right"
      ". social social ."
      ". phone phone ."
      ". email email .";
    .left {
      grid-area: left;
    }
    .right {
      grid-area: right;
      text-align: right;
    }
    .social {
      grid-area: social;
      display: flex;
      justify-content: center;
    }
    .phone {
      grid-area: phone;
      display: flex;
      justify-content: center;
    }
    .email {
      grid-area: email;
      display: flex;
      justify-content: center;
    }
    @media only screen and (max-width: 360px) {
      padding: 24px;
      grid-template-areas:
        "left left"
        "right right"
        "social social"
        "phone phone"
        "email email";
      .right,
      .left {
        text-align: center;
      }
    }
  }
  .flex {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .flex-two {
    display: flex;
    flex-direction: column;

    p {
      margin-top: 16px;
    }
  }
  p {
    color: ${(props) => props.colors.ultraLightPurple};
  }
  h6 {
    color: ${(props) => props.colors.ultraLightPurple};
    font-weight: 400;
    margin-bottom: 8px;
  }
  a {
    &:hover {
      text-decoration: underline;
      text-decoration-color: ${(props) => props.colors.ultraLightPurple};
    }
  }
  .icon-spec {
    color: ${(props) => props.colors.ultraLightPurple};
    font-size: 48px;
    margin-right: 16px;
    margin-left: 16px;
    &:hover {
      color: ${(props) => props.colors.lightPurple};
    }
    &-sm {
      color: ${(props) => props.colors.ultraLightPurple};
      font-size: 32px;
      margin: 0 auto;
    }
  }
`;

const index = () => {
  return (
    <Cont colors={COLORS}>
      <div className="left">
        <Link href="/index" passHref>
          <a title="View all art" rel="noopener noreferrer">
            <h6 className="bold">View All Art</h6>
          </a>
        </Link>
        <Link href="/watercolour" passHref>
          <a title="Water colour" rel="noopener noreferrer">
            <h6>Water Colour</h6>
          </a>
        </Link>
        <Link href="/oilbased" passHref>
          <a title="Oil based" rel="noopener noreferrer">
            <h6>Oil Based</h6>
          </a>
        </Link>
        <Link href="/pencil" passHref>
          <a title="Pencil" rel="noopener noreferrer">
            <h6>Pencil</h6>
          </a>
        </Link>
      </div>
      <div className="right">
        <Link href="/commisions" passHref>
          <a title="Commisions" rel="noopener noreferrer">
            <h6>Commisions</h6>
          </a>
        </Link>
        <Link href="/slideshows" passHref>
          <a title="Slideshows" rel="noopener noreferrer">
            <h6>Slideshows</h6>
          </a>
        </Link>
        <Link href="/contact" passHref>
          <a title="Contact" rel="noopener noreferrer">
            <h6>Contact</h6>
          </a>
        </Link>
      </div>
      <div className="social flex">
        <Link href="https://www.instagram.com/barbpierceart/" passHref>
          <a target="_blank" title="Contact" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faInstagram}
              className="icon-spec icon-lg mar-bottom-32"
            />
          </a>
        </Link>
        <a className="flex-two" href="mailto: kayakbarb@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} className="icon-spec-sm icon-lg" />
          <p>kayakbarb@gmail.com</p>
        </a>
      </div>
    </Cont>
  );
};

export default index;
