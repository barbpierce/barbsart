import { useState, useContext, useEffect } from "react";
import { AppContext } from "./_app";
import { nanoid } from "nanoid";
import Head from "next/head";
import styled from "styled-components";
import Delivery from "../components/checkout/information/Delivery";
import IndexTracker from "../components/checkout/IndexTracker";
import Billing from "../components/checkout/information/Billing";
import Summary from "../components/checkout/summary/index";
import FinalCheckout from "../components/checkout/information/FinalCheckout";

const Cont = styled.div`
  display: flex;
  justify-content: space-around;
  min-height: 100vh;
  column-gap: 32px;

  .left-content {
    padding-left: 32px;
    @media only screen and (max-width: 800px) {
      padding-left: 16px;
    }
    @media only screen and (max-width: 500px) {
      padding-left: 0;
    }
  }
  input + p {
    color: red;
  }
  div {
    flex: 1;
    max-width: 440px;
    min-width: 100px;
  }
  section {
    margin-bottom: 48px;
  }
  input {
    max-width: 440px;
  }
  .flex {
    display: flex;
    max-width: 440px;
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
  @media only screen and (max-width: 600px) {
    flex-direction: column-reverse;
  }
  @media only screen and (max-width: 500px) {
    margin: 0 5%;
  }
`;

const Checkout = () => {
  const [context, setContext] = useContext(AppContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    addressOne: "",
    addressTwo: "",
    postal: "",
    city: "",
    state: "",
    country: "",
    email: "",
    phone: "",
  });
  const [formValid, setFormValid] = useState({
    firstName: false,
    lastName: false,
    addressOne: false,
    postal: false,
    city: false,
    state: false,
    country: false,
    email: false,
    phone: false,
  });
  /*
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    addressOne: "",
    addressTwo: "",
    postal: "",
    city: "",
    state: "",
    country: "",
  });
  const [billingValid, setBillingValid] = useState({
    firstName: false,
    lastName: false,
    addressOne: false,
    postal: false,
    city: false,
    state: false,
    country: false,
  }); */
  const [pickup, setPickup] = useState(false);
  const [index, setIndex] = useState({ current: 0, max: 0 });
  //const [sameBilling, setSameBilling] = useState(false);
  /*
  function updateBilling(e) {
    const value = e.currentTarget.value;

    if (value === "yes") {
      setSameBilling(true);
    } else {
      setSameBilling(false);
    }
  } */
  function increaseIndex() {
    let valid = false;
    if (index.current === 0) {
      if (validateForm(formValid)) {
        valid = true;
      }
    } else if (index.current === 1) {
      console.log(billingValid);
      if (sameBilling === true) {
        valid = true;
      } else if (validateForm(billingValid)) {
        valid = true;
      }
    }

    if (valid) {
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
        [region]: value,
      };
    });

    if (region === "country") {
      setFormData((prevData) => {
        return {
          ...prevData,
          state: "",
          city: "",
        };
      });
      setFormValid((prevForm) => {
        return {
          ...prevForm,
          country: true,
          state: false,
          city: false,
        };
      });
    } else if (region === "state") {
      setFormData((prevData) => {
        return {
          ...prevData,
          city: "",
        };
      });
      setFormValid((prevForm) => {
        return {
          ...prevForm,
          state: true,
          city: false,
        };
      });
    } else if (region === "city") {
      setFormValid((prevData) => {
        return {
          ...prevData,
          city: true,
        };
      });
    }
  }
  /*
  function setBillingRegion(value, region) {
    setBilling((prevData) => {
      return {
        ...prevData,
        [region]: value,
      };
    });

    if (region === "country") {
      setBilling((prevData) => {
        return {
          ...prevData,
          state: "",
          city: "",
        };
      });
      setBillingValid((prevForm) => {
        return {
          ...prevForm,
          country: true,
          state: false,
          city: false,
        };
      });
    } else if (region === "state") {
      setBilling((prevData) => {
        return {
          ...prevData,
          city: "",
        };
      });
      setBillingValid((prevForm) => {
        return {
          ...prevForm,
          state: true,
          city: false,
        };
      });
    } else if (region === "city") {
      setBillingValid((prevData) => {
        return {
          ...prevData,
          city: true,
        };
      });
    }
  } */

  console.log(pickup);
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

    if (name !== "addressTwo") {
      if (errorMsg === "") {
        setFormValid((prevForm) => {
          return {
            ...prevForm,
            [name]: true,
          };
        });
      } else {
        setFormValid((prevForm) => {
          return {
            ...prevForm,
            [name]: false,
          };
        });
      }
    }
    message.innerText = errorMsg;
  }
  /*
  function updateBillingForm(e) {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    console.log("k");
    let field;
    let errorMsg = "";
    setBilling((prevForm) => {
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
    }

    if (name !== "addressTwo") {
      if (errorMsg === "") {
        setBillingValid((prevForm) => {
          return {
            ...prevForm,
            [name]: true,
          };
        });
      } else {
        setBillingValid((prevForm) => {
          return {
            ...prevForm,
            [name]: false,
          };
        });
      }
    }
    message.innerText = errorMsg;
  }
 */
  function validateForm(form) {
    const state = Object.keys(form).every((key, index) => {
      return form[key] == true;
    });
    return state;
  }

  useEffect(() => {
    validateForm(formValid);
  }, [formValid]);
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

  useEffect(() => {
    if (pickup) {
      setContext((prev) => {
        return {
          ...prev,
          shipping: 0,
        };
      });
    } else {
      if (context.items.length > 0) {
        setContext((prev) => {
          return {
            ...prev,
            shipping: 15,
          };
        });
      }
    }
  }, [pickup]);

  const forms = [
    <Delivery
      pickup={pickup}
      setPickupTrue={setPickupTrue}
      setPickupFalse={setPickupFalse}
      updateForm={updateForm}
      formData={formData}
      setRegion={setRegion}
      key={1}
    />,
  ];

  const meta = {
    title: "Checkout",
    description:
      "Watercolour art pieces for sale in Ottawa/Carp, available online with worldwide shipping.",
    link: "",
    type: "website",
    date: "2022-11-16 6:45:00:000",
    image: "",
    keywords:
      "watercolour art, art commissions, art carp, art ottawa, art for sale online, online art gallery, online art gallery carp, online art gallery ottawa",
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Barb Pierce Art" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="article:published_time" content={meta.date} />
        <link rel="canonical" href={meta.link} />
        <meta property="og:url" content={meta.link} />
        <meta name="keywords" content={meta.keywords} />

        <meta name="description" content={meta.description} />
      </Head>
      <Cont>
        <div className="left-content">
          {forms[index.current]}
          {index.current !== 2 ? (
            <button
              onClick={increaseIndex}
              className="base-btn-invert mar-bottom-32"
            >
              <h5>Continue</h5>
            </button>
          ) : (
            <FinalCheckout
              formData={formData}
              billing={billing}
              pickup={pickup}
            />
          )}
          <IndexTracker updateIndex={updateIndex} cartIndex={index} />
        </div>
        <div>
          <Summary />
        </div>
      </Cont>
    </>
  );
};

export default Checkout;
