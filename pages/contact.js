import React from "react";
import styled from "styled-components";
import { useState, useRef } from "react";
import COLORS from "../Data/colors";
import emailjs, { init } from "@emailjs/browser";
import Questions from "../components/contact/questions";
const Cont = styled.div`
  border: 1px solid black;
  padding: 2rem;

  .whole-form {
    max-width: 1200px;
    height: 600px;
    margin: 0 auto;
  }
`;

const FormElem = styled.div``;
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
      <div className="whole-form">
        <Questions />
        <FormElem ref={form}>
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
            ></input>
          </div>
          <div className="field line">
            <h5>Message * </h5>
            <textarea
              required
              name="subject"
              onChange={updateForm}
              value={formData.subject}
            ></textarea>
          </div>
          <button></button>
        </FormElem>
      </div>
    </Cont>
  );
};

export default contact;
