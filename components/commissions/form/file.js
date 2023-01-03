import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faClose } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../../Data/colors";

const Cont = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${(props) => props.colors.lightGrey};
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 16px;
  background: #fff;
  align-items: center;
  p {
    position: relative;
    top: 0;
  }
  .flex-center {
    column-gap: 8px;
  }
  .delete-icon {
    cursor: pointer;
    transition: color 0.25s ease;
    &:hover {
      color: ${(props) => props.colors.red};
    }
  }
`;
const File = ({ name, removeFile, index }) => {
  return (
    <Cont colors={COLORS} className="box-shadow">
      <div className="flex-center">
        <FontAwesomeIcon icon={faFile} className="icon-sm" />
        <p className="grey-purple">{name}</p>
      </div>
      <FontAwesomeIcon
        onClick={() => removeFile(index)}
        icon={faClose}
        className="icon-sm delete-icon"
      />
    </Cont>
  );
};

export default File;
