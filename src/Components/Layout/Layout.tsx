import { Outlet } from "react-router-dom";
import Navbar from "./Nav";
import useAuth from "../../Hooks/useAuth";
import Login from "../Login/Login";
import { Box, Flex } from "@chakra-ui/react";

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
        <Flex direction="column" h="100%">
          <Navbar />
          <main className="App">
            <Outlet />
          </main>
        </Flex>
      )}
    </>
  );
};

export default Layout;
