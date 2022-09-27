import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import COLORS from "../../Data/colors";
import Item from "./Item";
const Cont = styled.div`
  h6 {
    margin-left: 0 !important;
  }

  .icon-spec {
    cursor: pointer;
    &:hover {
      color: ${(props) => props.colors.darkPurple};
    }
  }
  .checkout {
    border-top: 2px solid black;
    padding-top: 16px;

    & > h5,
    h6 {
      margin-bottom: 16px;
    }
  }
  .dropdown {
    z-index: 1;
    background: #fff;
    position: absolute;
    width: 400px;
    right: 0;
    top:0;
    border: 2px solid black;
    padding: 16px;
    right:-400px;
    transition: right .25s ease;
    .title-spec {
      text-align: center;
      border-bottom: 2px solid black;
      padding-bottom: 16px;
      margin-bottom: 16px;
      position: relative;
    }
    @media only screen and (max-width:417px){
      width:100%;
    }
  }
  .base-btn {
    margin-bottom: 16px;
    margin-top: 16px;
  }
  .base-btn,
  .base-btn-invert {
    width: 100%;
  }
  button.delete {
    background-color: black;
    width: 65px;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    right: -16px;
    top: -16px;
  }

  .icon-x {
    font-size: 56px;
    color: #fff;
  }
  .items{
    height:500px;
    overflow-y:scroll;
  }
`;

const ShoppingCart = ({dropdownActive, showDropdown, hideDropdown }) => {
  const items = [
    {
      title: "I Am Wired",
      total: 250,
      shipping: 20,
      catagory: "Pastel",
      size: '12" x 12"',
      image: "/images/art1.jpg",
    },
    {
      title: "I Am Wired",
      total: 250,
      shipping: 20,
      catagory: "Pastel",
      size: '12" x 12"',
      image: "/images/art2.jpg",
    },
    {
      title: "I Am Wired",
      total: 250,
      shipping: 20,
      catagory: "Pastel",
      size: '12" x 12"',
      image: "/images/art3.jpg",
    },
    {
      title: "I Am Wired",
      total: 250,
      shipping: 20,
      catagory: "Pastel",
      size: '12" x 12"',
      image: "/images/dog.jpg",
    },
  ];
  
  const itemElems = items.map((item, index) => {
    return (
      <Item
        title={item.title}
        total={item.total}
        catagory={item.catagory}
        size={item.size}
        image={item.image}
        index={index}
      />
    );
  });

  return (
    <Cont colors={COLORS}>
      <FontAwesomeIcon onClick = {showDropdown}icon={faShoppingCart} className="icon-spec" size="lg" />
    
      <div className="dropdown" style = {{right: dropdownActive ? '0' : '-400px'}}>
        <div className="title-spec">
          <h5>Shopping Cart</h5>
          <button onClick={hideDropdown} className="delete">
            <FontAwesomeIcon icon={faXmark} className="icon-x" />
          </button>
        </div>
        <div className="items">
        {itemElems}
        </div>
        <div className="checkout">
          <h5>Checkout</h5>
          <h6>
            <span className="light">Items: </span>({itemElems.length})
          </h6>
          <h6>
            <span className="light">Total: </span>$450.44
          </h6>
          <button className="base-btn">
            <h5>Keep Shopping</h5>
          </button>
          <button className="base-btn-invert">
            <h5>Checkout</h5>
          </button>
        </div>
      </div>

    </Cont>
  );
};

export default ShoppingCart;
