import Image from "next/image";
import styled from "styled-components";

const Cont = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  margin-right: 4px;
  margin-left: 4px;
  float: left;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: box-shadow 0.25s ease;
  &:hover {
    box-shadow: none;
  }
  @media only screen and (max-width: 400px) {
    width: 40px;
    height: 40px;
  }
`;

const imageSelect = ({ title, url, index, updateImage }) => {
  return (
    <Cont>
      <Image
        onClick={() => updateImage(index)}
        id={index}
        alt={title}
        src={url}
        layout="fill"
        objectFit="cover"
      />
    </Cont>
  );
};

export default imageSelect;
