import styled from "styled-components";
import COLORS from "../../Data/colors";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  border: 1px solid black;
  border-radius: 16px;
  background: ${(props) => props.colors.ultraLightPurple};
  padding: 32px;
  .base-btn-invert {
  }
  .title {
    text-align: center;
    h4{
      color: #57008C;
    }
  }
  .center {
    display: flex;
    align-items: center;
    column-gap: 32px;
  }
  .center-me {
    text-align: center;
  }
  .base-btn-invert {
    display: inline-block;
  }
  @media only screen and (max-width:500px){
    border:none;
    border-top:1px solid black;
    border-bottom: 1px solid black;
    border-radius: 0;
  }
`;

const SuccessPopup = () => {
  return (
    <Cont colors={COLORS}>
      <div className="title mar-sm">
        <h4 className="mar-bottom-16">Thank you for your order!</h4>
        <p>Your order was completed succesfully</p>
      </div>
      <div className="center mar-sm">
        <FontAwesomeIcon icon={faEnvelope} className="icon-lg purple" />
        <div>
          <p className="mar-bottom-16">
            An email receipt, including the details about your order has been
            sent to your email address provided.{" "}
          </p>
          <p>
            Once your order is confirmed, we will send you an email with a
            delivery date and tracking id.
          </p>
        </div>
      </div>

      <div className="center-me">
        <Link href="/" passHref>
          <a title="Home" rel="noopener noreferrer">
            <div className="base-btn-invert">
              <h5 className="light">Return To Home</h5>
            </div>
          </a>
        </Link>
      </div>
    </Cont>
  );
};

export default SuccessPopup;
