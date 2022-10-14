import Navbar from "./Navbar";
import Footer from "../components/footer/index";
import styled from "styled-components";
const Cont = styled.div`
  overflow: hidden;
 
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
