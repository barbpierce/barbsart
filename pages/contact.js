import React from "react";
import styled from "styled-components";
import { useState, useRef } from "react";
import COLORS from "../Data/colors";
import emailjs, { init } from "@emailjs/browser";
import Questions from "../components/contact/questions";
const Cont = styled.div`
  .submit-btn {
    float: right;
  }
  .field {
    h5 {
      margin-bottom: 8px;
    }
  }
  .right-form {
    padding: 2rem;
  }
  .bottom-form {
    padding: 2rem;
    grid-column: 1 / 3;
    @media only screen and (max-width:790px){
      grid-column:1;
    }
  }
`;

const FormElem = styled.div`
  max-width: 1200px;
  min-height: 600px;

  margin: 0 auto;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  @media only screen and (max-width: 790px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
`;
const contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const form = React.useRef();

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

  function submitSuggestion(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3hso67w",
        "template_cxvs4sn",
        form.current,
        "VuMtr83gozV6G7IIc"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    clearForm();
    alert("Thank you for your submission!");
  }

  function clearForm() {
    init("VuMtr83gozV6G7IIc");

    setFormData((prevForm) => {
      return {
        name: "",
        email: "",
        subject: "",
        message: "",
      };
    });
  }

  return (
    <Cont colors={COLORS}>
      <FormElem ref={form}>
        <Questions />
        <div className="right-form">
          <div className="form-line line">
            <div className="field">
              <h5>Name *</h5>
              <input
                type="text"
                name="name"
                onChange={updateForm}
                value={formData.name}
                placeholder="Name"
              />
            </div>
            <div className="field">
              <h5>Email *</h5>
              <input
                type="email"
                name="email"
                onChange={updateForm}
                value={formData.email}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field line">
            <h5>Subject </h5>
            <input
              required
              name="subject"
              onChange={updateForm}
              value={formData.subject}
              placeholder="Subject"
            ></input>
          </div>
        </div>

        <div className="bottom-form">
          <div className="field line">
            <h5>Message * </h5>
            <textarea
              required
              name="message"
              onChange={updateForm}
              value={formData.message}
              placeholder="Message"
            ></textarea>
          </div>
          <button className="submit-btn">
            <h5>Submit</h5>
          </button>
        </div>
      </FormElem>
    </Cont>
  );
};

export default contact;
