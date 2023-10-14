import "../../Styles/App.css";
import { Flex } from "@chakra-ui/react";
import Filter from "../Layout/Filter";
import RecipeM from "./RecipeM";
import ApiService from "../Services/ApiService";
import { useEffect, useState } from "react";
import { IRecipeModel } from "../../Models/IRecipeModel";

function AllRecipes() {
  const [allRecipes, setAllRecipes] = useState<IRecipeModel[]>();

  useEffect(() => {
    ApiService.getAllRecipesExtended().then((recipes) =>
      setAllRecipes(recipes)
    );
  }, []);

  return (
    <Flex
      display={{ base: "none", md: "flex" }}
      direction={{ base: "column", md: "row" }}
      gap="1em"
      mt="4em"
    >
      <Filter />
      <Flex
        flexWrap="wrap"
        direction={"row"}
        justifyContent="space-around"
        py="2em"
      >
        {allRecipes?.map((r) => (
          <RecipeM recipe={r} />
        ))}
      </Flex>
    </Flex>
  );
}

export default AllRecipes;
