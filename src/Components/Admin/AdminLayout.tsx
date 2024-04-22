import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Nav";
import useAuth from "../../Hooks/useAuth";
import { Flex } from "@chakra-ui/react";

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
