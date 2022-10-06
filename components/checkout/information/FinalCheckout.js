import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import { AppContext } from "../../../pages/_app";
import { useEffect } from "react";
import COLORS from "../../../Data/colors";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.greyPurple};
  border-radius: 8px;
  padding: 16px;
  background-color: ${(props) => props.colors.ultraLightPurple};
  .title {
    border-bottom: 2px solid ${(props) => props.colors.greyPurple};
    padding-bottom: 8px;
  }
`;

const FinalCheckout = () => {
  const [context, setContext] = useContext(AppContext);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

  const redirectToCheckout = async () => {
    const { sessionId } = await fetch("/api/checkout-session/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ items: context.items }),
    }).then((res) => res.json(res));

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
  };

  useEffect(() => {
    console.log(context.items);
  }, [context]);

  //Redirect to checkout

  return (
    <Cont className = 'mar-md' colors={COLORS}>
      <div className="title mar-bottom-32">
        <h5 className="">Click the button below to proceed to checkout.</h5>
      </div>
      <div>
        <button onClick={redirectToCheckout} className="red-btn mar-top-sm">
          <h5>Purchase</h5>
          <FontAwesomeIcon icon={faPaperPlane} className="icon-md off-white" />
        </button>
      </div>
    </Cont>
  );
};

export default FinalCheckout;
