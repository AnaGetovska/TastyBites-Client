import { Outlet } from "react-router-dom";
import Navbar from "./NavLogin";
import useAuth from "../../Hooks/useAuth";
import Login from "../Login/Login";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  const user = useAuth().auth;
  return (
    <>
      {!user ? (
        <Box h="100%">
          <main className="App">
            <Login />
          </main>
        </Box>
      ) : (
        <Box h="100%">
          <Navbar />
          <main className="App">
            <Outlet />
          </main>
        </Box>
      )}
    </>
  );
};

export default Layout;
