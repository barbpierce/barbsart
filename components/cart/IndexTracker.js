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
    margin-bottom: 32px;
  }
`;

const IndexTracker = ({ cartIndex }) => {
  const lines = ["Delivery", "Billing", "Payment"].map((line, index) => {
    return (
      <div>
        <div className="line"></div>
        <p className = {index === cartIndex ? 'bold' : ''}>{line}</p>
      </div>
    );
  });
  return <Cont colors={COLORS}>{lines}</Cont>;
};

export default IndexTracker;
