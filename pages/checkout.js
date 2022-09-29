import { useState, useContext, useEffect } from "react";
import { AppContext } from "./_app";
import { nanoid } from "nanoid";
import styled from "styled-components";
import Delivery from "../components/checkout/information/Delivery";
import IndexTracker from "../components/checkout/IndexTracker";
import Billing from "../components/checkout/information/Billing";
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
    width: 440px;
    div:nth-of-type(1) {
      margin-right: 4px;
    }
    div:nth-of-type(2) {
      margin-left: 4px;
    }
    div {
      width: 100%;
      position: relative;
    }
  }
  .base-btn-invert {
    width: 100%;
    max-width: 440px;
    border-radius: 8px;
  }
`;

const Checkout = () => {
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
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    addressOne: "",
    addressTwo: "",
    postal: "",
    city: "",
    province: "",
    country: "",
  });
  const [pickup, setPickup] = useState(false);
  const [index, setIndex] = useState({ current: 0, max: 0 });
  const [sameBilling, setSameBilling] = useState(false);

  function updateBilling(e) {
    const value = e.currentTarget.value;

    if (value === "yes") {
      setSameBilling(true);
    } else {
      setSameBilling(false);
    }
  }
  function increaseIndex() {
    setIndex((prevIndex) => {
      return {
        ...prevIndex,
        current: prevIndex.current + 1,
      };
    });
    if (index.current + 1 > index.max) {
      setIndex((prevIndex) => {
        return {
          ...prevIndex,
          max: index.current + 1,
        };
      });
    }
  }

  function updateIndex(val) {
    if (val > index.max) {
    } else {
      setIndex((prevIndex) => {
        return {
          ...prevIndex,
          current: val,
        };
      });
    }
  }

  function setRegion(value, region) {
    setFormData((prevData) => {
      return {
        ...prevData,
        region: value,
      };
    });
  }

  function setBillingRegion(value, region) {
    setBilling((prevData) => {
      return {
        ...prevData,
        region: value,
      };
    });
  }

  function updateForm(e) {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    let field;
    let errorMsg = "";
    setFormData((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
    let message;
    switch (name) {
      case "firstName":
        field = document.getElementById(name);

        message = document.getElementById("firstName").nextSibling;
        if (value == "") {
          field.classList.add("error");
          errorMsg = "Cannot be empty";
        } else {
          field.classList.remove("error");
        }
        break;
      case "lastName":
        field = document.getElementById(name);

        message = document.getElementById("lastName").nextSibling;
        if (value == "") {
          field.classList.add("error");
          errorMsg = "Cannot be empty";
        } else {
          field.classList.remove("error");
        }
        break;
      case "addressOne":
        field = document.getElementById(name);
        message = document.getElementById("addressOne").nextSibling;
        if (value == "") {
          field.classList.add("error");
          errorMsg = "Cannot be empty";
        } else {
          field.classList.remove("error");
        }
        break;
      case "addressTwo":
        message = document.getElementById("addressTwo").nextSibling;
        break;
      case "postal":
        field = document.getElementById(name);
        message = document.getElementById("postal").nextSibling;
        if (value == "") {
          field.classList.add("error");
          errorMsg = "Cannot be empty";
        } else {
          field.classList.remove("error");
          console.log(formData.country);
        }
        break;
      case "email":
        field = document.getElementById(name);
        message = document.getElementById("email").nextSibling;
        if (value == "") {
          field.classList.add("error");
          errorMsg = "Cannot be empty";
        }
        if (
          !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
            value
          )
        ) {
          field.classList.add("error");
          errorMsg = "Invalid Email";
        } else {
          field.classList.remove("error");
        }
        break;
      case "phone":
        field = document.getElementById(name);
        message = document.getElementById("phone").nextSibling;
        if (value == "") {
          field.classList.add("error");
          errorMsg = "Cannot be empty";
        }
        if (
          !/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)
        ) {
          field.classList.add("error");
          errorMsg = "Invalid Phone Number";
        } else {
          field.classList.remove("error");
        }
        break;
    }
    message.innerText = errorMsg;
  }

  function updateZip(e) {
    const value = e.currentTarget.value;
    setZip((prev) => {
      return value;
    });

    if (country == "") {
    } else {
      if (
        postalCodes.validate(countryCodes[formData.country], value) === true
      ) {
        console.log(
          postalCodes.validate(countryCodes[formData.country], value)
        );
      } else {
        console.log("error");
      }
    }
  }

  const setPickupTrue = () => {
    setPickup(true);
  };

  const setPickupFalse = () => {
    setPickup(false);
  };

  const forms = [
    <Delivery
      pickup={pickup}
      setPickupTrue={setPickupTrue}
      setPickupFalse={setPickupFalse}
      updateForm={updateForm}
      formData={formData}
      setRegion={setRegion}
      key={nanoid()}
    />,
    <Billing
      formData={billing}
      setRegion={setBillingRegion}
      updateForm={updateForm}
      sameBilling={sameBilling}
      updateBilling={updateBilling}
      key={nanoid()}
    />,
  ];

  return (
    <Cont>
      <div>
        {forms[index.current]}
        <button
          onClick={increaseIndex}
          className="base-btn-invert mar-bottom-32"
        >
          <h5>Continue</h5>
        </button>
        <IndexTracker updateIndex={updateIndex} cartIndex={index} />
      </div>
    </Cont>
  );
};

export default Checkout;
