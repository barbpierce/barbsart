import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { loadStripe } from "@stripe/stripe-js";
import { useContext } from "react";
import { AppContext } from "../../../pages/_app";
import { useEffect, useState } from "react";
import {
  createUser,
  updateUser,
  fetchUser,
  fetchUserExists,
  createOrder,
  fetchOrder,
  createItem,
  createItems,
  clearOrder,
} from "../../../utils/SupabaseFunctions";
import COLORS from "../../../Data/colors";

const Cont = styled.div`
  .cont {
    border: 1px solid ${(props) => props.colors.greyPurple};
    border-radius: 8px;
    padding: 16px;
    background: rgb(87, 0, 140);
    background: linear-gradient(
      90deg,
      rgba(87, 0, 140, 1) 0%,
      rgba(187, 164, 255, 1) 24%,
      rgba(252, 248, 255, 1) 48%,
      rgba(187, 164, 255, 1) 76%,
      rgba(87, 0, 140, 1) 100%
    );
    .title {
      padding-bottom: 8px;
      background: #fff;
      border-radius: 16px;
      padding: 8px;
      text-align: center;
    }
  }
  .place-icon {
    position: absolute;
    top: 30%;
  }
  .flex-center {
    position: relative;
  }
`;

const FinalCheckout = ({ formData, billing, pickup }) => {
  const [context, setContext] = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

  const redirectToCheckout = async () => {
    setLoading(true);
    const createOrderFunctional = async () => {
      // fetch user for id, returns the order

      const order = fetchUser(formData.email).then((res) =>
        // create order based on id, bools are placed, fulfilled
        createOrder(true, false, res[0].id, !pickup).then((res2) =>
          fetchOrder(res[0].id)
        )
      );

      // clear order and add items to it
      order.then((res) =>
        clearOrder(res[0].id).then(
          (
            res2 // call stripe checkout after creating supabase order
          ) =>
            createItems(context.items, res[0].id).then((res) =>
              stripeCheckout()
            )
        )
      );
    };

    fetchUserExists("hlo").then((res) => console.log(res));
    fetchUserExists(formData.email).then((res) =>
      res // update user if exists
        ? updateUser(
            formData.firstName,
            formData.lastName,
            formData.addressOne,
            formData.addressTwo,
            formData.country,
            formData.state,
            formData.city,
            formData.email,
            formData.phone,
            formData.postal
          ).then((res) => createOrderFunctional())
        : createUser(
            // create user if doesn't exist
            formData.firstName,
            formData.lastName,
            formData.addressOne,
            formData.addressTwo,
            formData.country,
            formData.state,
            formData.city,
            formData.email,
            formData.phone,
            formData.postal
          ).then((res) => createOrderFunctional())
    );

    const stripeCheckout = async () => {
      const { sessionId } = await fetch("/api/checkout-session/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          items: context.items,
          email: formData.email,
          shipping: context.shipping,
        }),
      }).then((res) => res.json(res));

      const stripe = await stripePromise;
      const { error } = await stripe
        .redirectToCheckout({
          sessionId,
        })
        .then(setLoading(false));
    };
  };

  useEffect(() => {
    console.log(context.items);
  }, [context]);

  //Redirect to checkout

  return (
    <Cont className="mar-md" colors={COLORS}>
      <div className="cont">
        <div className="title box-shadow">
          <h5 className=" purple">Checkout</h5>
        </div>
      </div>
      <div className="flex-center">
        {!loading ? (
          <button
            onClick={redirectToCheckout}
            className="yellow-btn mar-top-sm"
          >
            <h5 className="mar-bottom-8">Purchase</h5>
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="icon-md off-white icon-btn"
            />
          </button>
        ) : (
          <div className="place-icon">
            <div className="lds-circle">
              <div></div>
            </div>
          </div>
        )}
      </div>
    </Cont>
  );
};

export default FinalCheckout;
