import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import COLORS from "../../Data/colors";
import Item from "./Item";
import { AppContext } from "../../pages/_app";
import Link from "next/link";

const Cont = styled.div`

  h6 {
    margin-left: 0 !important;
  }

  .checkout {
    border-top: 2px solid black;
    padding-top: 16px;
    position:relative;
    
    &-text{
      h5,h6{
        margin-bottom: 16px;
      }
    }
    
    
  }
  .dropdown {
    z-index: 1;
    background: #fff;
    position: absolute;
    width: 400px;
    right: 0;
    top: 0;
    height: 100vh;
    border: 2px solid black;
    padding: 16px;
    right: -400px;
    transition: right 0.25s ease;
    .title-spec {
      text-align: center;
      border-bottom: 2px solid black;
      padding-bottom: 16px;
      margin-bottom: 16px;
      position: relative;
    }
    @media only screen and (max-width: 417px) {
      width: 100%;
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
  .items {
    max-height: 50vh;
    overflow-y: scroll;
  }
  .cart-icon-holder {
    position: relative;
    cursor: pointer;
    &:hover {
      .icon-spec {
        color: ${(props) => props.colors.darkPurple};
      }
    }
  }
  .counter {
    position: absolute;
    color: white;
    top: -10px;
    right: -10px;
    background-color: red;
    width: 20px;
    height: 20px;

    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ShoppingCart = ({ dropdownActive, showDropdown, hideDropdown }) => {
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
  const [context, setContext] = useContext(AppContext);
  const itemElems = context.items.map((item, index) => {
    return (
      <Item
        title={item.title}
        total={item.price}
        catagory={item.catagory}
        size={item.dimensions}
        image={item.url}
        index={index}
        removeItem={removeItem}
        key={index}
      />
    );
  });

  const sum = context.items.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);
  return (
    <Cont colors={COLORS}>
      <div onClick={showDropdown} className="cart-icon-holder">
        {context.items.length > 0 && (
          <div className="counter">
            <p>{context.items.length}</p>
          </div>
        )}
        <FontAwesomeIcon
          icon={faShoppingCart}
          className="icon-spec"
          size="lg"
        />
      </div>
      <div
        className="dropdown"
        style={{ right: dropdownActive ? "0" : "-400px" }}
      >
        <div className="title-spec">
          <h5>Shopping Cart</h5>
          <button onClick={hideDropdown} className="delete">
            <FontAwesomeIcon icon={faXmark} className="icon-x" />
          </button>
        </div>

        <div className="items">
          {itemElems.length === 0 && (
            <p style={{ textAlign: "center" }}>Your cart is empty</p>
          )}
          {itemElems}
        </div>

        <div className="checkout">
          <div className = 'checkout-text'>
            <h5>Checkout</h5>
            <h6>
              <span className="light">Items: </span>({itemElems.length})
            </h6>
            <h6>
              <span className="light">Total: </span> ${sum}
            </h6>
          </div>
          <div>
            <button onClick={hideDropdown} className="base-btn">
              <h5>Keep Shopping</h5>
            </button>
            {itemElems.length > 0 && (
              <Link href="/checkout" passHref>
                <a
                  onClick={hideDropdown}
                  title="Checkout"
                  rel="noopener noreferrer"
                >
                  <button className="base-btn-invert">
                    <h5>Checkout</h5>
                  </button>
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Cont>
  );
};

export default ShoppingCart;
