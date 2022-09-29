import styled from "styled-components";
import { useContext } from "react";
import { AppContext } from "../../../pages/_app";
import Item from "./Item";
const Cont = styled.div`
  width: 100%;
`;
const index = () => {
  const [context, setContext] = useContext(AppContext);

  const items = context.items.map((item) => {
    return (
      <Item
        title={item.title}
        price={item.price}
        catagory={item.catagory}
        dimensions={item.dimensions}
        url={item.url}
      />
    );
  });

  const total = context.total + context.shipping;
  return (
    <Cont>
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
      <section>{items}</section>
    </Cont>
  );
};

export default index;
