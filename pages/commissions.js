import styled from "styled-components";
import Image from "next/image";
import COLORS from "../Data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownLong } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  .header {
    text-align: center;
    h2 {
      max-width: 1000px;
      margin-right: auto;
      margin-left: auto;
    }
  }
  .frame {
    max-width: 1000px;
    height: 500px;
    margin: 0 auto;
    border: 50px solid ${(props) => props.colors.darkPurple};
    border-style: ridge;
    //padding:25px;
  }
  .inner-frame {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .header-two {
    text-align: center;
    background: ${(props) => props.colors.darkPurple};
    padding-top: 48px;
    padding-bottom: 48px;
    h3 {
      color: ${(props) => props.colors.ultraLightPurple};
    }
  }
  .icon- {
    font-size: 64px;
    color: ${(props) => props.colors.ultraLightPurple};
  }
  .content-box {
    display: inline-block;
    text-align: left;
    li {
      margin-left: 16px;
    }
    h4 {
      text-decoration: underline;
      text-decoration-color: ${(props) => props.colors.darkPurple};
      text-underline-offset: 4px;
    }
    p::before {
      content: "•";
      color: ${(props) => props.colors.darkPurple};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

const Commissions = () => {
  return (
    <Cont colors={COLORS}>
      <section className="header mar-md">
        <h2 className="purple mar-bottom-32">Personal Art Commissions</h2>
        <div className="frame">
          <div className="inner-frame">
            <Image
              objectFit="cover"
              alt="Dog face"
              src="/commissions/dogcopy.jpg"
              layout="fill"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="header-two mar-md">
          <h3 className="mar-bottom-16">Commission Form</h3>
          <FontAwesomeIcon icon={faDownLong} className="icon-" />
        </div>
        <div className="center-inline">
          <div className="content-box">
            <h4 className="purple mar-bottom-32 center-inline">
              What To Include?
            </h4>
            <ul>
              <li>
                <p>
                  Picture of drawing you’d like done. (Pets, family, friends,
                  wildlife, nature)
                </p>
              </li>
              <li>
                <p>What type of artwork (Watercolor, colored pencil)</p>
              </li>

              <li>
                <p>
                  Anything you would like changed in the photo (background,
                  removal of imperfections)
                </p>
              </li>
            </ul>
          </div>
        </div>

        <form ></form>
      </section>
    </Cont>
  );
};

export default Commissions;
