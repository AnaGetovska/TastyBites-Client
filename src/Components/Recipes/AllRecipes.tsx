import "../../App.css";
import { Flex, Box } from "@chakra-ui/react";
import Filter from "../Layout/Filter";
import * as _ from "lodash";
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
    <Flex h="100%" direction={{ base: "column", md: "row" }}>
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
