import styled from "styled-components";
import Image from "next/image";
import COLORS from "../../../Data/colors";
import { AppContext } from "../../../pages/_app";
import { useContext } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cont = styled.div`
  margin-bottom: 16px;
  height: 160px;
  position: relative;
  .frame {
    width: 40%;
    height: 100%;
    display: inline-block;
    padding: 10px 10px;
    border: 3px solid #ccc;
    background: #eee;
    
  }
  .image {
    position: relative;
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .text {
    margin-left: 8px;
    vertical-align: top;
    word-break: break-word;
    display: inline-flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
  }
  .delete-spec {
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end;
    &:hover {
      .icon-spec {
        background-color: ${(props) => props.colors.grey};
      }
    }
  }
  .icon-spec {
    width: 32px;
    height: 32px;
  }
`;

const Item = ({ title, price, url, catagory, dimensions, index }) => {
  const [context, setContext] = useContext(AppContext);

  const removeItem = (index) => {
    setContext((prevContext) => {
      const items = prevContext.items;
      const total = prevContext.total - items[index].price;
      items.splice(index, 1);
      console.log(total);
      return {
        ...prevContext,
        items: items,
        total: total,
      };
    });
  };

  return (
    <Cont colors={COLORS}>
      <div className="frame">
        <div className="image">
          <Image alt={title} src={url} layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className="text">
        <div>
          <p className="">"{title}"</p>
          <p className="grey-purple">${price}</p>
          <p className="grey-purple">{dimensions}</p>
          <p className="grey-purple">{catagory}</p>
        </div>
        <div onClick={() => removeItem(index)} className="delete-spec">
          <FontAwesomeIcon className="icon-spec" icon={faXmark} size="xl" />
        </div>
      </div>
    </Cont>
  );
};

export default Item;
