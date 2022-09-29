import styled from "styled-components";
import COLORS from "../../Data/colors";
const Cont = styled.div`
  width: 440px;
  .line {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.colors.greyPurple};
    margin-bottom: 16px;
  }
  p {
    padding-bottom: 32px;
  }
  .index-item {
    cursor: pointer;
    transition: background-color 0.25s ease;
    &:hover {
      background: ${(props) => props.colors.ultraLightPurple};
      p {
        font-weight: 700;
      }
    }
  }
`;

const IndexTracker = ({ cartIndex, updateIndex }) => {
  const lines = ["Delivery", "Billing", "Payment"].map((line, index) => {
    return (
      <div
        onClick={() => updateIndex(index)}
        className="index-item"
        key={index}
      >
        <div className="line"></div>
        <p className={index === cartIndex.current ? "bold" : ""}>{line}</p>
      </div>
    );
  });
  return <Cont colors={COLORS}>{lines}</Cont>;
};

export default IndexTracker;
