import styled from "styled-components";

import Picture from "../components/Picture";
const Cont = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
  const imageElems = images.map((image) => {
    return (
      <Picture
        url={image.src}
        title={image.title}
        price={image.price}
        size={image.size}
      />
    );
  });
  return <Cont>{imageElems}</Cont>;
}
