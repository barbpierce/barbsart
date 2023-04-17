import styled from "styled-components";
import Image from "next/image";
import COLORS from "../Data/colors";
import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownLong,
  faUpload,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import File from "../components/commissions/form/file";
import toast, { Toaster } from "react-hot-toast";
import Commission from "../components/commissions/before/commission";
import { nanoid } from "nanoid";
import emailjs, { init } from "@emailjs/browser";
import {
  uploadFileToServer,
  createCommission,
} from "../utils/SupabaseFunctions";
import { useForm } from "react-hook-form";
const Cont = styled.div`
  height: 100%;
  .cont {
    @media only screen and (max-width: 600px) {
      padding: 0 !important;
    }
  }
  input {
    margin-bottom: 16px;
  }
  .red {
    position: relative;
    top: -12px;
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
    padding: 32px;
    border: 1px solid #7b6986;
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
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const name = watch("name", false);
  const email = watch("email", false);
  const [loading, setLoading] = useState(false);
  const [filesObj, setFilesObj] = useState([]);
  const [fileUrls, setFileUrls] = useState("");
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

  const uploadFiles = async (formData) => {
    if (filesObj.length === 0) {
      return;
    }
    const urls = [];
    filesObj.forEach((file) => {
      const filePath = `${email}-${file.name}-${nanoid()}`;
      uploadFileToServer(filePath, file.file);

      urls.push(filePath);
    });

    createCommission(
      formData.name,
      formData.email,
      formData.phone,
      formData.description,
      urls
    );
    setFileUrls((prev) => {
      let newUrls = urls.map(
        (url) =>
          `https://olownjalltvhavnccxgh.supabase.co/storage/v1/object/public/files/${url}`
      );
      return newUrls.join(", ");
    });
  };

  const submitForm = handleSubmit(async (formData) => {
    uploadFiles(formData).then((res) => sendEmail(formData));

    clearForm();
    alert("Thank you for you submission");
  });

  const clearForm = () => {
    setValue("name", "");
    setValue("email", "");
    setValue("phone", "");
    setValue("description", "");
    setFilesObj([]);
  };

  const uploadFile = () => {
    document.getElementById("files").click();
  };
  const removeFile = (index) => {
    const files = filesObj.filter((file, fileIndex) => {
      return fileIndex !== index;
    });

    setFilesObj(files);
  };

  const sendEmail = (formData) => {
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID_2,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_2,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          description: formData.description,
          files: fileUrls,
        },
        process.env.NEXT_PUBLIC_EMAILJS_KEY_2
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  const renderFile = (e) => {
    if (e.target.files.length !== 0) {
      const files = filesObj;
      const file = e.target.files[0];
      const name = file.name;
      //files.push({ name: "name" });

      setFilesObj((prevData) => {
        return [...prevData, { file: file, name: name }];
      });
    }
  };

  const files = filesObj.map((file, index) => {
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
      "Ottawa, Carp local art for sale online and art commissions, art commissions for pets, friends or anything you like",
    link: "https://www.barbpierceart.com/commissions",
    type: "website",
    date: "2023-04-17 6:45:00:00",
    image: "/seo/commissions_preview.png",
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
          <h2 className="purple mar-bottom-32text-shadow word-wrap">
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
                alt="pricing chart"
              />
            </div>
          </div>
          <div className="grid flex-one">
            <section className="form-spec">
              <form onSubmit={submitForm} className=" box-shadow purple-form">
                <div className="mar-bottom-32">
                  <h2 className="light-purple inline mar-right-8 mar-bottom-32  text-shadow">
                    I will get back to you soon!
                  </h2>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className=" inline white icon-lg"
                  />
                </div>
                <div className="input-field">
                  <label htmlFor="Name">
                    <h6>Name</h6>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="box-shadow"
                    {...register("name", {
                      required: true,
                    })}
                    placeholder="Name"
                  />
                  {errors.name?.type === "required" && (
                    <p className="red">*Name is required</p>
                  )}
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
                    {...register("email", {
                      required: true,
                    })}
                    placeholder="Email"
                  />
                  {errors.email?.type === "required" && (
                    <p className="red">*Email is required</p>
                  )}
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
                    {...register("phone", {
                      required: false,
                    })}
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
                    {...register("description", {
                      required: true,
                    })}
                    placeholder="Description"
                  ></textarea>
                  {errors.description?.type === "required" && (
                    <p className="red">*Description is required</p>
                  )}
                </div>
                <div className="input-field remove-style mar-bottom-32">
                  <label htmlFor="files">
                    <h6>Images or other files</h6>
                    <h6 className="light grey-purple">
                      Attach images, word documents, photoshop files and/or any
                      other files to provide more info.
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
