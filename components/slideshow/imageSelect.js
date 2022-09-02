import Image from "next/image";
import styled from "styled-components";

const Cont = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 1rem;
  position: relative;
  margin-right: 0.25rem;
  margin-left:.25rem;
  float: left;
  cursor: pointer;
`;

const imageSelect = ({ title, url, index, updateImage}) => {
  return (
    <Cont>
      <Image onClick = {() => updateImage(index)} id = {index} alt={title} src={url} layout="fill" objectFit="cover" />
    </Cont>
  );
};

export default imageSelect;
