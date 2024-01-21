import { Outlet } from "react-router-dom";
import Navbar from "./Nav";
import useAuth from "../../Hooks/useAuth";
import Login from "../Login/Login";
import { Box, Flex } from "@chakra-ui/react";
import Register from "../Login/Register";

export default function UserOut() {
  const user = useAuth().auth;
  const removeAuth = useAuth().removeAuth;
  if (user) {
    removeAuth();
  }
  return (
    <>
      {!user && (
        <Box h="100%">
          <main className="App">
            <Outlet />
          </main>
        </Box>
      )}
    </>
  );
}
