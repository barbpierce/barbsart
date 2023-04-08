import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faXmark, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import COLORS from "../../Data/colors";
import Item from "./Item";
import { AppContext } from "../../pages/_app";
import Link from "next/link";
import { updateLocalStorage, clearLocalStorage } from "../../pages/lib/utils";

const Cont = styled.div`
  h6 {
    margin-left: 0 !important;
  }

  .checkout {
    border-top: 2px solid black;
    padding-top: 16px;
    position: relative;

    &-text {
      h5,
      h6 {
        margin-bottom: 16px;
      }
    }
  }
  .dropdown {
    z-index: 5;
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
    @media only screen and (max-width: 400px) {
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
  .delete {
    width: 63px;
    height: 63px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    right: -16px;
    top: -16px;
    &:hover {
      background-color: ${(props) => props.colors.grey};
    }
    @media only screen and (max-width: 600px) {
      width: 61px;
      height: 61px;
    }
  }
  .circle-btn {
    h6 {
      transition: background-color 0.25s ease;
    }
    &:hover {
      h6 {
        background-color: ${(props) => props.colors.darkPurple};
      }
    }
  }

  .icon-x {
    font-size: 48px;
    color: black;
  }
  .items {
    max-height: 50vh;
    overflow-y: scroll;
    padding-bottom: 16px;
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
  const [context, setContext] = useContext(AppContext);

  const removeItem = (index) => {
    setContext((prevContext) => {
      const items = prevContext.items;
      const total = prevContext.total - items[index].price;
      items.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(items));
      return {
        ...prevContext,
        items: items,
        total: total,
      };
    });
  };

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
  const clearCart = () => {
    setContext({ items: [], total: 0, shipping: 0 });
    clearLocalStorage();
  };
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
        <FontAwesomeIcon icon={faShoppingCart} className="icon-spec icon-md" />
      </div>
      <div
        className="dropdown"
        style={{ right: dropdownActive ? "0" : "-400px" }}
      >
        <div className="title-spec">
          <h5>Shopping Cart</h5>
          <div onClick={hideDropdown} className="delete">
            <FontAwesomeIcon icon={faAnglesRight} className="icon-x icon-lg" />
          </div>
        </div>

        <div className="items">
          {itemElems.length === 0 ? (
            <p style={{ textAlign: "center" }}>Your cart is empty</p>
          ) : (
            <>
              {itemElems}
              <div className="center-inline mar-bottom-16 mar-top-16">
                <button onClick={clearCart} className="circle-btn">
                  <h6>Clear</h6>
                </button>
              </div>
            </>
          )}
        </div>

        <div className="checkout">
          <div className="checkout-text">
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
