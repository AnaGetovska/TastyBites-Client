import { Navigate } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import Layout from "./Components/Layout/Layout";

export default function ProtectedRoute() {
  const user = useAuth().auth;
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return <Layout />;
}
