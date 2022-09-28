import { useState, useContext } from "react";
import { AppContext } from "./_app";
import styled from "styled-components";
import Delivery from "../components/checkout/information/Delivery";
import IndexTracker from "../components/cart/IndexTracker";

const Cont = styled.div`
  display: flex;
  section {
    margin-bottom: 48px;
  }
  input {
    max-width: 440px;
  }
  .flex {
    display: flex;
    div:nth-of-type(1) {
      margin-right: 4px;
    }
    div:nth-of-type(2) {
      margin-left: 4px;
    }
  }
  .base-btn-invert {
    width: 100%;
    max-width: 440px;
    border-radius: 8px;
  }
`;

const checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressOne: "",
    addressTwo: "",
    postal: "",
    city: "",
    province: "",
    country: "",
    email: "",
    phone: "",
  });
  const [pickup, setPickup] = useState(false);
  const [index, setIndex] = useState(0);

  function updateForm(e) {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  }

  const setPickupTrue = () => {
    setPickup(true);
  };

  const setPickupFalse = () => {
    setPickup(false);
  };

  return (
    <Cont>
      <div>
        <Delivery
          pickup={pickup}
          setPickupTrue={setPickupTrue}
          setPickupFalse={setPickupFalse}
          updateForm={updateForm}
          formData={formData}
        />
        <button className="base-btn-invert mar-bottom-32">
          <h5>Continue</h5>
        </button>
        <IndexTracker cartIndex = {index} />
      </div>
    </Cont>
  );
};

export default checkout;
