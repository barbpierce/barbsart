import styled from "styled-components";
import COLORS from "../../../Data/colors";
import Image from "next/image";
const Cont = styled.div`
  margin-bottom: 32px;
  .content {
    border: 8px solid ${(props) => props.colors.greyPurple};
    background-color: ${(props) => props.colors.ultraLightGrey};
    padding: 16px;
    height: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    .image-cont {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  p {
    border: 1px solid black;
    display: inline-block;
    padding: 8px;
    margin-top: 8px;
    margin-left: 8px;
  }
`;

const Commission = ({ imageOne, imageTwo, price }) => {
  return (
    <Cont colors={COLORS}>
      <div className="content">
        <div className="image-cont">
          <Image
            src="/commissions/dogcopy.jpg"
            objectFit="cover"
            layout="fill"
          />
        </div>

        <div className="image-cont">
          <Image src={imageTwo} objectFit="cover" layout="fill" />
        </div>
      </div>
      <p className="bold">${price}</p>
    </Cont>
  );
};

export default Commission;
