import Navbar from "./Navbar";
import Footer from "../components/footer/index";
import styled from "styled-components";
const Cont = styled.div`
  margin: 0 5%;
  @media only screen and (max-width: 500px) {
    margin: 0;
  }
`;
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Cont>{children}</Cont>
      <Footer />
    </>
  );
};

export default Layout;
