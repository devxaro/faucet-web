import { JSX } from "react";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Footer from "@components/layouts/Footer";
import Header from "@components/layouts/Header";
import "@utils/i18n";

const Layout = (): JSX.Element => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          width: "100%",
          marginTop: "69px",
          marginBottom: "30px",
        }}
      >
        <Outlet />
        <ToastContainer
          className="custom-toast-container"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
