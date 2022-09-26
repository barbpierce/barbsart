import {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import COLORS from "../Data/colors";
const Cont = styled.div`
  position: relative;
  .icon-spec {
    cursor: pointer;
    &:hover {
      color: ${(props) => props.colors.darkPurple};
    }
  }
  .dropdown{
    position: absolute;
  }
`;

const ShoppingCart = () => {
  const [activeDropdown, setActiveDropdown] = useState(true);

  
  return (
    <Cont colors={COLORS}>
      <FontAwesomeIcon icon={faShoppingCart} className="icon-spec" size="lg" />
      <div className="dropdown"></div>
    </Cont>
  );
};

export default ShoppingCart;
