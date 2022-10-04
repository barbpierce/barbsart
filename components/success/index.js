import styled from "styled-components";
import COLORS from "../../Data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  border: 1px solid black;
  border-radius: 16px;
  background: ${(props) => props.colors.ultraLightPurple};
  padding: 32px;
  .title {
    text-align: center;
  }
  .center {
    display: flex;
    align-items: center;
    column-gap:32px;
  }
`;

const Success = () => {
  return (
    <Cont colors={COLORS}>
      <div className="title mar-sm">
        <h4 className="mar-bottom-16">Thank you for your order!</h4>
        <p>Your order was completed succesfully</p>
      </div>
      <div className="center">
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
    </Cont>
  );
};

export default Success;
