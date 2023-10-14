import { Outlet } from "react-router-dom";
import Navbar from "./NavLogin";
import useAuth from "../../Hooks/useAuth";
import Login from "../Login/Login";
import { Box, Flex } from "@chakra-ui/react";

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
            <Login />
          </main>
        </Box>
      )}
    </>
  );
}
