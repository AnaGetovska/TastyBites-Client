import "./Styles/App.css";
import Login from "./Components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import AllRecipes from "./Components/Recipes/AllRecipes";
import RecipeM from "./Components/Recipes/RecipeM";
import RecipeL from "./Components/Recipes/RecipeL";
import RecipeS from "./Components/Recipes/RecipeS";
import Favourites from "./Components/Recipes/Favourites";
import Challenge from "./Components/Challenge/ChallengeMain";
import UserInfo from "./Components/Layout/UserInfo";
import { Box } from "@chakra-ui/react";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminHome from "./Components/Admin/AdminHome";
import UserOut from "./Components/Layout/UserOut";

function App() {
  return (
    <Box h="100%">
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="admin" element={<AdminHome />} />
        </Route>
        <Route element={<UserOut />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index path="all-recipes" element={<AllRecipes />} />
          <Route path="recipe-m" element={<RecipeM />} />
          <Route path="recipe-l" element={<RecipeL />} />
          <Route path="recipe-s" element={<RecipeS />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="avatar" element={<UserInfo />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
