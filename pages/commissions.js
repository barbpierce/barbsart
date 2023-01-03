import styled from "styled-components";
import Image from "next/image";
import COLORS from "../Data/colors";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong, faUpload } from "@fortawesome/free-solid-svg-icons";
import File from "../components/commissions/form/file";
import toast, { Toaster } from "react-hot-toast";
import Commission from "../components/commissions/before/commission";
const Cont = styled.div`
  height: 100%;
  .cont {
    @media only screen and (max-width: 600px) {
      padding: 0 !important;
    }
  }
  .flex {
    justify-content: center;
    align-items: center;
    column-gap: 32px;
    //row-gap: 32px;
    @media only screen and (max-width: 900px) {
      flex-direction: column;
    }
    padding-right: 32px;
    padding-left: 32px;
  }
  .flex-one {
  }
  .commission-pricing-image {
    position: relative;
    width: 100%;
    height: 100%;
  }
  position: relative;
  .parallax-one {
    min-height: 800px;
    width: 100%;
    background-attachment: fixed;
    background-image: url("/commissions/lola.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: -5;
  }
  .parallax-two {
    min-height: 800px;
    width: 100%;
    background-attachment: fixed;
    background-image: url("/commissions/krispy.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: -5;
  }

  form {
    max-width: 865px;
    margin: 0 auto;

    @media only screen and (max-width: 600px) {
      border: none;
      border-top: 2px solid ${(props) => props.colors.darkPurple};
      border-bottom: 2px solid ${(props) => props.colors.darkPurple};
      border-radius: 0;
    }
    @media only screen and (max-width: 400px) {
      padding: 8px;
    }
  }

  .base-btn {
    display: inline-block;
    border-radius: 8px;
  }
  .header {
    text-align: center;
    z-index: 5;
    background: #fff;
    padding-bottom: 48px;
    h2 {
      max-width: 1000px;
      margin-right: auto;
      margin-left: auto;
    }
  }
  .form-spec {
    @media only screen and (max-width: 600px) {
      margin-left: 0;
    }
  }
`;

const Commissions = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    files: [],
  });

  const [formValid, setFormValid] = useState({
    name: false,
    email: false,
    phone: false,
    description: false,
  });

  const validateForm = (form) => {
    const state = Object.keys(form).every((key, index) => {
      return form[key] == true;
    });
    return state;
  };

  const submitForm = (e) => {
    const invalidFields = [];
    e.preventDefault();
    if (validateForm(formValid)) {
      clearForm();
      toast.success("Commission Submitted!");
    } else {
      toast.error("Form not complete");
      Object.keys(formValid).map((key, index) => {
        if (formValid[key] === false) {
          invalidFields.push(key);
        }
      });
      const elementField = document.getElementById(invalidFields[0]);
      elementField.focus();
      elementField.nextSibling.innerText = "Cannot be empty";
    }
  };
  const clearForm = () => {
    setFormData({ name: "", email: "", phone: "", description: "", files: [] });
  };
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
      case "name":
        field = document.getElementById(name);

        message = document.getElementById("name").nextSibling;
        if (value == "") {
          field.classList.add("error");
          errorMsg = "Cannot be empty";
        } else {
          field.classList.remove("error");
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
      case "description":
        field = document.getElementById(name);
        message = document.getElementById("description").nextSibling;
        if (value == "") {
          field.classList.add("error");
          errorMsg = "Cannot be empty";
        } else {
          field.classList.remove("error");
        }
        break;
    }

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
    message.innerText = errorMsg;
  }

  const uploadFile = () => {
    document.getElementById("files").click();
  };
  const removeFile = (index) => {
    const files = formData.files.filter((file, fileIndex) => {
      console.log(index);
      return fileIndex !== index;
    });

    setFormData((prevData) => {
      return {
        ...prevData,
        files: files,
      };
    });
  };

  const renderFile = (e) => {
    if (e.target.files.length !== 0) {
      const files = formData.files;
      const file = e.target.files[0];
      const name = file.name;
      //files.push({ name: "name" });

      setFormData((prevData) => {
        return {
          ...prevData,
          files: [...files, { file: file, name: name }],
        };
      });
    }
  };

  const files = formData.files.map((file, index) => {
    return (
      <File
        name={file.name}
        key={index}
        index={index}
        removeFile={removeFile}
      />
    );
  });

  const meta = {
    title: "Art Commissions",
    description:
      "Ottawa, Carp local art for sale online and art comissions, art commisions for pets, friends or anything you like",
    link: "",
    type: "website",
    date: "2022-11-16 6:45:00:000",
    image: "",
    keywords:
      "ottawa art, local art, art comissions, online art gallery, art carp, art ottawa, art comissions carp, art commission ottawa, animal art, landscape art",
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
      <Cont colors={COLORS}>
        <Toaster />

        <section className="header  box-shadow">
          <h2 className="purple mar-bottom-32 text-shadow word-wrap">
            Personal Art Commissions
          </h2>
        </section>
        <div className="parallax-one"></div>
        <div className="flex cont mar-top-xl mar-xl">
          <div className="flex-one">
            <div className="box-shadow commission-pricing-image">
              <Image
                src="/commissions/pet_portrait_pricing.jpeg"
                objectFit="contain"
                width="961px"
                height="1243px"
              />
            </div>
          </div>
          <div className="grid flex-one">
            <section className="form-spec">
              <form onSubmit={submitForm} className=" box-shadow purple-form">
                <div className="input-field">
                  <label htmlFor="Name">
                    <h6>Name</h6>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="box-shadow"
                    onChange={updateForm}
                    value={formData.name}
                    placeholder="Name"
                  />
                  <p className="red"></p>
                </div>

                <div className="input-field">
                  <label htmlFor="email">
                    <h6>Email</h6>
                  </label>
                  <input
                    type="text"
                    className="box-shadow"
                    name="email"
                    id="email"
                    onChange={updateForm}
                    value={formData.email}
                    placeholder="Email"
                  />
                  <p className="red"></p>
                </div>
                <div className="input-field">
                  <label htmlFor="phone">
                    <h6>Phone</h6>
                  </label>
                  <input
                    type="text"
                    className="box-shadow"
                    name="phone"
                    id="phone"
                    onChange={updateForm}
                    value={formData.phone}
                    placeholder="Phone"
                  />
                  <p className="red"></p>
                </div>
                <div className="input-field">
                  <label htmlFor="description">
                    <h6>Description</h6>
                    <h6 className="light grey-purple">
                      What do you want your art piece to look like, etc?
                    </h6>
                  </label>

                  <textarea
                    type="text"
                    name="description"
                    className="box-shadow"
                    id="description"
                    onChange={updateForm}
                    value={formData.description}
                    placeholder="Description"
                  ></textarea>
                  <p className="red"></p>
                </div>
                <div className="input-field remove-style mar-bottom-32">
                  <label htmlFor="files">
                    <h6>Images or other files</h6>
                    <h6 className="light grey-purple">
                      Attach image files or word documents, photoshop to provide
                      more info.
                    </h6>
                  </label>
                  <input
                    type="file"
                    name="files"
                    id="files"
                    onChange={renderFile}
                  />
                  <div
                    onClick={uploadFile}
                    className=" mar-bottom-16 box-shadow image-upload"
                  >
                    <FontAwesomeIcon
                      icon={faUpload}
                      size="1x"
                      className="purple icon-sm"
                    />
                    <p>Upload</p>
                  </div>
                  <p></p>
                  {files}
                </div>

                <button className="base-btn box-shadow">
                  <h5 type="submit">Submit</h5>
                </button>
              </form>
            </section>
          </div>
        </div>
        {/*End of flex*/}
        <div className="parallax-two"></div>
      </Cont>
    </>
  );
};

export default Commissions;
