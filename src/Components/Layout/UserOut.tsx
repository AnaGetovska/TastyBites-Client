import { Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Box } from "@chakra-ui/react";

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
