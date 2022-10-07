import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faClose } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../../Data/colors";

const Cont = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${(props) => props.colors.lightGrey};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
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
    <Cont colors={COLORS}>
      <div className="flex-center">
        <FontAwesomeIcon icon={faFile} className="icon-lg" />
        <p className="grey-purple">{name}</p>
      </div>
      <FontAwesomeIcon
        onClick={() => removeFile(index)}
        icon={faClose}
        className="icon-lg delete-icon"
      />
    </Cont>
  );
};

export default File;
