import "./App.css";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import AllRecipes from "./Components/Recipes/AllRecipes";
import RecipeM from "./Components/Recipes/RecipeM";
import Favourites from "./Components/Recipes/Favourites";
import Challenge from "./Components/Challenge/ChallengeMain";
import ProtectedRoute from "./ProtectedRoute";
import NavDefault from "./Components/Layout/NavDefault";
import UserInfo from "./Components/Layout/UserInfo";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box h="100%">
      <Routes>
        <Route element={<Layout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index path="all-recipes" element={<AllRecipes />} />
          <Route path="recipe-m" element={<RecipeM />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="nav-default" element={<NavDefault />} />
          <Route path="avatar" element={<UserInfo />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
