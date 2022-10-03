import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Cont = styled.div``;

const FinalCheckout = () => {
  const redirectToCheckout = async () => {
    const {
      data: { id },
    } = await axios.post("/api/checkout_sessions", {
      items: Object.entries(cartDetails).map(([_, { id, quantity }]) => ({
        price: id,
        quantity,
      })),
    });

    //Redirect to checkout

    const stripe = await getStripe();
    await stripe.redirectToCheckout({ sessionId: id });
  };
  return (
    <Cont>
      <h5 className="mar-bottom-32">
        Click the button below to proceed to checkout.
      </h5>
      <button className="red-btn mar-bottom-32">
        <h5>Payment</h5>

        <FontAwesomeIcon icon={faPaperPlane} className="icon-md off-white" />
      </button>
    </Cont>
  );
};

export default FinalCheckout;
