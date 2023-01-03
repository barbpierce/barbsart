import { useEffect, useState } from "react";
import useSWR from "swr";
import { shootFireworks, fetcher } from "./lib/utils";
import { useRouter } from "next/router";
import styled from "styled-components";
import SuccessPopup from "../components/success";
import { clearLocalStorage } from "./lib/utils";
import { useContext } from "react";
import { AppContext } from "./_app";
import emailjs, { init, sendForm } from "@emailjs/browser";
import {
  fetchOrder,
  fetchUser,
  fetchWholeOrder,
  setOrderFulfilled,
} from "../utils/SupabaseFunctions";

const Cont = styled.div`
  height: 100vh;
  display: flex;
  & > div {
    margin: 0 auto;
  }
`;
// fetch user, fetch order and set to fulfilled
const Success = () => {
  const [context, setContext] = useContext(AppContext);
  const {
    query: { session_id, email },
  } = useRouter();
  const router = useRouter();
  const [firstLoad, setFirstLoad] = useState(true);
  const [userData, setUserData] = useState({});
  const { data, error } = useSWR(
    router.query.session_id ? `/api/checkout-session/${session_id}` : null,
    (url) => fetch(url).then((res) => res.json())
  );
  //console.log(data);

  const updateUserData = (user, order) => {
    setUserData({
      artPieces: order.items.map((item) => item.title).toString(),
      prices: order.items.map((item) => item.price).toString(),
      postal: user.postal || "",
      email: user.email,
      phone: user.phone_number,
      addressOne: user.address_one,
      addressTwo: user.address_two || "",
      country: user.country,
      state: user.state,
      city: user.city,
      delivery: "filler",
      userId: user.id,
      orderId: order.id,
    });
  };

  useEffect(() => {
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        userData,
        process.env.NEXT_PUBLIC_PUBLIC_EMAILJS_KEY
      )
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [userData]);
  useEffect(() => {
    if (data && firstLoad) {
      shootFireworks();
      setFirstLoad(false);
      fetchUser(email).then((res) =>
        fetchOrder(res[0].id).then((res2) => setOrderFulfilled(res2[0].id))
      );
      // Send email
      fetchUser(email).then((res) =>
        fetchWholeOrder(res[0].id).then((res2) =>
          updateUserData(res[0], res2[0])
        )
      );
      clearLocalStorage();
      setContext({ items: [], total: 0, shipping: 0 });
    }
  }, [data]);
  return (
    <Cont>
      <div>
        {JSON.stringify(data) ? (
          <div className="mar-top-sm">
            <SuccessPopup />
          </div>
        ) : (
          <p> You aren't supposed to be here </p>
        )}
      </div>
    </Cont>
  );
};

export default Success;
