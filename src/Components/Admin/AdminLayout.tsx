import { Outlet } from "react-router-dom";
import Navbar from "../Layout/NavLogin";
import useAuth from "../../Hooks/useAuth";
import Login from "../Login/Login";
import { Box, Flex } from "@chakra-ui/react";

const AdimnLayout = () => {
  const user = useAuth().auth;
  return (
    <>
      {user?.isAdmin && (
        <Flex direction="column" h="100%">
          <Navbar />
          <main className="App" inline-style="flex-grow: 1">
            <Outlet />
          </main>
        </Flex>
      )}
    </>
  );
};

export default AdimnLayout;
