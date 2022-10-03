import styled from "styled-components";
import { useContext, useState, useRef } from "react";
import { AppContext } from "../../../pages/_app";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import COLORS from "../../../Data/colors";
import Item from "./Item";
const Cont = styled.div`
  width: 100%;
  position: relative;
  .delete {
    position: absolute;
  }
  .items-visible {
    max-height: 800px;
    overflow-y: scroll;
    @media only screen and (max-width: 600px) {
      display: none;
    }
  }
  .items-dropdown {
    display: none;
    border: 1px solid ${(props) => props.colors.greyPurple};
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.colors.ultraLightPurple};
    }
    @media only screen and (max-width: 600px) {
      display: block;
    }
  }

  .caret {
    transform: rotate(0deg);
    transition: transform 0.25s ease;
  }
`;
const index = () => {
  const [context, setContext] = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState("0px");
  const content = useRef(null);
  const items = context.items.map((item, index) => {
    return (
      <Item
        title={item.title}
        price={item.price}
        catagory={item.catagory}
        dimensions={item.dimensions}
        url={item.url}
        index={index}
      />
    );
  });

  const toggleVisibility = () => {
    setHeight(visible ? "0px" : `${content.current.scrollHeight}px`);
    setVisible((prev) => {
      return !prev;
    });
  };

  const total = context.total + context.shipping;
  return (
    <Cont colors={COLORS}>
      <section>
        <h5 className="mar-bottom-32">Order Summary</h5>
        <div className="flex-seperate mar-bottom-16">
          <p className="grey-purple">Subtotal:</p>
          <p className="grey-purple">${context.total}</p>
        </div>

        <div className="flex-seperate mar-bottom-16">
          <p className="grey-purple">Delivery/Shipping</p>
          <p className="grey-purple">${context.shipping}</p>
        </div>
        <div className="line-global mar-bottom-32"></div>
        <div className="flex-seperate mar-bottom-16">
          <p>Total:</p>
          <p>${total}</p>
        </div>
        <div className="line-global"></div>
      </section>
      <section className="items-visible">{items}</section>
      <div onClick={toggleVisibility} className="mar-bottom-16 items-dropdown">
        <div className="flex-seperate">
          <h6>View Cart</h6>
          <FontAwesomeIcon
            style={{ transform: visible ? "rotate(180deg)" : "rotate(0deg)" }}
            className="caret"
            icon={faCaretDown}
          />
        </div>
      </div>
      <div
        style={{ height: height }}
        ref={content}
        className="accordion-content mar-sm"
      >
        {items}
      </div>
    </Cont>
  );
};

export default index;
