import { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import COLORS from "../Data/colors";
const Cont = styled.div`
  position: relative;
  z-index: 5;
  a {
    text-decoration-thickness: 1px !important;
    text-underline-offset: 1px !important;
  }
  .top {
    cursor: pointer;
    display: flex;
    padding: 8px;
    border-radius: 1rem;

    transition: background-color 0.25s ease;
    h6 {
      margin-right: 0.5rem;
      transition: color 0.25s ease, background-color 0.25s ease;
    }
    .icon-spec {
      transition: transform 0.25s ease;
    }
    &:hover {
      background-color: #000;
      .icon-spec {
        color: #fff;
      }
      h6 {
        color: #fff;
        background-color: #000;
      }
    }
  }
  .dropdown {
    position: absolute;
    text-align: center;
    background: #fff;
    border-radius: 0.5rem;
    padding: 16px;
    width: 120px;
    left: calc(50% - 60px);
    h6 {
      margin-left: 0 !important;
    }
    border: 1px solid ${(props) => props.colors.lightPurple};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    li {
      margin-bottom: 8px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
const Dropdown = ({ text }) => {
  const [visible, setVisible] = useState(false);
  const dropdown = useRef();
  function showDropdown() {
    setVisible((value) => !value);
  }

  const handleClickOutside = useCallback(
    (e) => {
      if (visible && e.target.closest(".top") !== dropdown.current) {
        setVisible(false);
      }
    },
    [visible, setVisible, dropdown]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <Cont colors={COLORS}>
      <div className="top" onClick={showDropdown} ref={dropdown}>
        <h6>{text}</h6>
        <FontAwesomeIcon
          style={{ transform: visible ? "rotate(180deg)" : "rotate(0deg)" }}
          icon={faChevronDown}
          className="icon-spec"
          size="lg"
        />
      </div>
      {visible && (
        <div className="dropdown">
          <ul>
            <li>
              <Link href="/" passHref>
                <a title="View All" rel="noopener noreferrer">
                  <h6 className="light">View All</h6>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/watercolor" passHref>
                <a title="Watercolour" rel="noopener noreferrer">
                  <h6 className="light">Water Colour</h6>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/pastel" passHref>
                <a title="Pastel" rel="noopener noreferrer">
                  <h6 className="light">Pastel</h6>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/pencil" passHref>
                <a title="Pencil" rel="noopener noreferrer">
                  <h6 className="light">Pencil Crayon</h6>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </Cont>
  );
};

export default Dropdown;
