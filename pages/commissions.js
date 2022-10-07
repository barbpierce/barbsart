import styled from "styled-components";
import Image from "next/image";
import COLORS from "../Data/colors";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong, faUpload } from "@fortawesome/free-solid-svg-icons";
import File from "../components/commissions/form/file";
import toast, { Toaster } from "react-hot-toast";
import Commission from "../components/commissions/before/commission";
const Cont = styled.div`
  form {
    max-width: 865px;
    margin: 0 auto;

    @media only screen and (max-width: 600px) {
      border: none;
      border-top: 2px solid ${(props) => props.colors.darkPurple};
      border-bottom: 2px solid ${(props) => props.colors.darkPurple};
      border-radius: 0;
    }
  }
  .grid {
    display: grid;
    grid-template-areas: "left left left right";
    grid-template-rows: auto auto;
    column-gap: 32px;
    row-gap: 128px;
    @media only screen and (max-width: 600px) {
      grid-template-areas:
        "left left left left"
        "right right right right";
    }
  }
  .base-btn-invert {
    display: inline-block;
    border-radius: 8px;
  }
  .header {
    grid-area: top;
    text-align: center;
    h2 {
      max-width: 1000px;
      margin-right: auto;
      margin-left: auto;
    }
  }
  .form-spec {
    grid-area: left;
    margin-left: 32px;
    @media only screen and (max-width: 600px) {
      margin-left: 0;
    }
  }
  .commissions {
    grid-area: right;
    h3 {
      background-color: ${(props) => props.colors.lightPurple};
      padding: 16px;
    }
  }
  .frame {
    max-width: 1000px;
    height: 500px;
    margin: 0 auto;
    border: 50px solid ${(props) => props.colors.darkPurple};
    border-style: ridge;
    //padding:25px;
  }
  .inner-frame {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .header-two {
    text-align: center;
    background: ${(props) => props.colors.darkPurple};
    padding-top: 48px;
    padding-bottom: 48px;
    @media only screen and (max-width: 600px) {
      padding-top: 24px;
      padding-bottom: 24px;
    }
    h2 {
      color: ${(props) => props.colors.ultraLightPurple};
    }
  }
  .header-three {
    margin-bottom: 32px;

    & > div {
      border: 4px solid ${(props) => props.colors.darkPurple};
    }
    @media only screen and (max-width: 600px) {
      margin-left: 0;
      & > div {
        border-radius: 0;
        border: none;
        border-top: 4px solid ${(props) => props.colors.darkPurple};
        border-bottom: 4px solid ${(props) => props.colors.darkPurple};
      }
    }
  }

  .icon- {
    font-size: 64px;
    color: ${(props) => props.colors.ultraLightPurple};
  }
  .content-box {
    display: inline-block;
    text-align: left;
    li {
      margin-left: 16px;
    }
    h4 {
      text-decoration: underline;
      text-decoration-color: ${(props) => props.colors.darkPurple};
      text-underline-offset: 4px;
    }
    p::before {
      content: "•";
      color: ${(props) => props.colors.darkPurple};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
  .remove-style {
    p {
      position: relative;
      top: 0;
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

  return (
    <Cont colors={COLORS}>
      <Toaster />
      <section className="header mar-lg">
        <h2 className="purple mar-bottom-32">Personal Art Commissions</h2>
        <div className="frame">
          <div className="inner-frame">
            <Image
              objectFit="cover"
              alt="Dog face"
              src="/commissions/dogcopy.jpg"
              layout="fill"
            />
          </div>
        </div>
      </section>
      <div className="header-two mar-md">
        <h2 className="mar-bottom-16">Commission Form</h2>
        <FontAwesomeIcon icon={faDownLong} className="icon-" />
      </div>
      <div className="grid">
        <section className="form-spec">
          <div className="center-inline header-three">
            <div className="content-box">
              <h3 className="purple mar-bottom-32 center-inline">
                What To Include?
              </h3>
              <ul>
                <li>
                  <p>
                    Picture of drawing you’d like done. (Pets, family, friends,
                    wildlife, nature)
                  </p>
                </li>
                <li>
                  <p>What type of artwork (Watercolor, colored pencil)</p>
                </li>

                <li>
                  <p>
                    Anything you would like changed in the photo (background,
                    removal of imperfections)
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <form onSubmit={submitForm}>
            <div className="input-field">
              <label htmlFor="Name">
                <h6>Name</h6>
              </label>
              <input
                type="text"
                name="name"
                id="name"
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
              <div onClick={uploadFile} className=" mar-bottom-16 image-upload">
                <FontAwesomeIcon icon={faUpload} className="purple" />
                <p>Upload</p>
              </div>
              <p></p>
              {files}
            </div>

            <button className="base-btn-invert">
              <h5 type="submit">Submit</h5>
            </button>
          </form>
        </section>
        <section className="commissions">
          <h3 className=" mar-bottom-32 center-inline purple">
            Before & After
          </h3>
          <Commission
            imageOne={"/commissions/dogcopy.jpg"}
            imageTwo={"/commissions/dogcopy.jpg"}
            price="120"
          />

          <Commission
            imageOne={"/commissions/dogcopy.jpg"}
            imageTwo={"/commissions/dogcopy.jpg"}
            price="120"
          />

          <Commission
            imageOne={"/commissions/dogcopy.jpg"}
            imageTwo={"/commissions/dogcopy.jpg"}
            price="120"
          />
        </section>
      </div>
    </Cont>
  );
};

export default Commissions;
