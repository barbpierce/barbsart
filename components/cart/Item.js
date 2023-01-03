import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Image from "next/image";
import COLORS from "../../Data/colors";
const Cont = styled.div`
  padding-bottom: 16px;

  border-bottom: 1px solid ${(props) => props.colors.lightPurple};

  h6 {
    margin-left: 0 !important;
  }
  .flex {
    display: flex;
  }
  .image {
    position: relative;
    width: 100%;
    height: 100%;
    flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 100%;
  }
  .text {
    flex-grow: 1;
    flex-shrink: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 100%;
  }
  .delete-me {
    flex-grow: 1;
    flex-shrink: 1;
    flex: 1;
    flex-basis: 48px;
    width: 48px;
    button {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover,
      &:active {
        background-color: ${(props) => props.colors.grey};
      }
    }
  }
  .icon- {
    font-size: 40px;
    color: black;
  }
`;

const Item = ({ title, total, catagory, size, image, index, removeItem }) => {
  return (
    <Cont colors={COLORS}>
      <h6 className="mar-bottom-1">#{index + 1}</h6>
      <div className="flex">
        <div className="image">
          <Image
            alt={title}
            src={image}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>
        <div className="text">
          <div>
            <h6>"{title}"</h6>
            <p>
              Subtotal: <strong>${total}</strong>
            </p>
          </div>
          <div>
            <p className="grey-purple">{size}</p>
            <p className="grey-purple">{catagory}</p>
          </div>
        </div>
        <div className="delete-me">
          <button onClick={() => removeItem(index)}>
            <FontAwesomeIcon icon={faXmark} className="icon- icon-md" />
          </button>
        </div>
      </div>
    </Cont>
  );
};

export default Item;
