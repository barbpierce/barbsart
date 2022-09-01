import Navbar from "./Navbar";
import Footer from "./Footer/index";
import styled from 'styled-components';
const Cont = styled.div`
  margin: 0 5%;
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
