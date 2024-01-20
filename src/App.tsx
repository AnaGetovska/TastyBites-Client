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
import { Flex } from "@chakra-ui/react";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminHome from "./Components/Admin/AdminHome";
import EditRecipe from "./Components/Admin/EditRecipe";
import UserOut from "./Components/Layout/UserOut";
import FridgeContentsFilter from "./Components/FridgeContentsFilter";
import Menu from "./Components/Menu/Menu";
import Register from "./Components/Login/Register";

function App() {
  return (
    <Flex direction="column" h="100%">
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="admin" element={<AdminHome />} />
          <Route path="edit-recipe" element={<EditRecipe />} />
        </Route>
        <Route element={<UserOut />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index path="all-recipes" element={<AllRecipes />} />
          <Route path="recipe/:key" element={<RecipeL />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="fridge-filter" element={<FridgeContentsFilter />} />
          <Route path="challenge" element={<Challenge />} />
          <Route path="avatar" element={<UserInfo />} />
          <Route path="menu" element={<Menu />} />
        </Route>
      </Routes>
    </Flex>
  );
}

export default App;
