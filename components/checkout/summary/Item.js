import styled from "styled-components";
import Image from "next/image";
const Cont = styled.div`
  margin-bottom: 16px;
  height: 160px;
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
    display: inline-block;
    vertical-align: top;
    word-break: break-word;
   
  }
`;

const Item = ({ title, price, url, catagory, dimensions }) => {
  return (
    <Cont>
      <div className="frame">
        <div className="image">
          <Image alt={title} src={url} layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className="text">
        <p className="">"{title}"</p>
        <p className="grey-purple">${price}</p>
        <p className="grey-purple">{dimensions}</p>
        <p className="grey-purple">{catagory}</p>
      </div>
    </Cont>
  );
};

export default Item;
