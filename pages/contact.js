import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { useState, useRef } from "react";
import COLORS from "../Data/colors";
import emailjs, { init } from "@emailjs/browser";
import Questions from "../components/contact/questions";
const Cont = styled.div`
  margin-bottom: 128px;
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
    @media only screen and (max-width: 790px) {
      grid-column: 1;
    }
  }
`;

const FormElem = styled.form`
  max-width: 1200px;
  min-height: 600px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  margin: 0 auto;
  border: 1px solid ${(props) => props.colors.offGrey};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  @media only screen and (max-width: 790px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
  }
  & > div {
    margin-bottom: 64px;
  }
`;
const Contact = () => {
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
        "service_aa4i949",
        "template_h56wm3s",
        form.current,
        "cVubv2J7duBYJW66b"
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
  const meta = {
    title: "Contage Page",
    description: "Contact me for art commissions in Ottawa. Shipping worldwipe",
    link: "",
    type: "website",
    date: "2022-11-16 6:45:00:000",
    image: "",
    keywords:
      "Contact page, contact me, barb pierce art contact, barbpierceart contact page, art, local art, ottawa art, online art gallery, carp art",
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
        <link rel="canonical" href={meta.image} />
        <meta property="og:url" content={meta.link} />
        <meta name="keywords" content={meta.keywords} />

        <meta name="description" content={meta.description} />
      </Head>
      <Cont colors={COLORS}>
        <FormElem onSubmit={submitSuggestion} colors={COLORS} ref={form}>
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
                type="text"
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
    </>
  );
};

export default Contact;
