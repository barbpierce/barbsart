import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import Picture from "../components/Picture";
import { useEffect } from "react";
const Cont = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media only screen and (max-width: 905px) {
    justify-content: space-around;
  }
  .block {
    background: red;
    border: 1px solid black;
    width: 600px;
    height: 200px;
    margin-bottom: 250px;
  }
`;

export default function Home() {
  const images = [
    {
      src: "/images/art1.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art2.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/art3.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/dog.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/holistic.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/lungs.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
    {
      src: "/images/pollution.jpg",
      title: "Starry Night",
      price: 250,
      size: "12 x 12",
    },
  ];

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const imageElems = images.map((image, index) => {
    return (
      <Picture
        key={index}
        url={image.src}
        title={image.title}
        price={image.price}
        size={image.size}
        
      />
    );
  });
  return (
    <Cont>
      {imageElems}
      
    </Cont>
  );
}
