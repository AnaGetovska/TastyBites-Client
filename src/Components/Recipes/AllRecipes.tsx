import "../../Styles/App.css";
import { Flex } from "@chakra-ui/react";
import Filter from "../Layout/Filter";
import RecipeM from "./RecipeM";
import ApiService from "../Services/ApiService";
import { useEffect, useState } from "react";
import { IExtendedRecipeModel } from "../../Models/IExtendedRecipeModel";
import useFilter from "../../Hooks/useFilter";
import _ from "lodash";

function AllRecipes() {
  const [allRecipes, setAllRecipes] = useState<IExtendedRecipeModel[]>();
  const filteredCategories: string[] = useFilter().filter;

  function filterRecipes(): IExtendedRecipeModel[] {
    if (filteredCategories.length === 0) {
      return allRecipes as IExtendedRecipeModel[];
    }
    return _.filter(
      allRecipes,
      (recipe: IExtendedRecipeModel) =>
        _.intersection(
          _.map(recipe.categories, (cat) => cat._key),
          filteredCategories
        ).length > 0
    ) as IExtendedRecipeModel[];
  }

  useEffect(() => {
    ApiService.getAllRecipesExtended().then((recipes) =>
      setAllRecipes(recipes)
    );
  }, []);
  return (
    <Flex
      display={{ md: "flex" }}
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
        {filterRecipes()?.map((r) => (
          <RecipeM recipe={r} key={r?._key} />
        ))}
      </Flex>
    </Flex>
  );
}

export default AllRecipes;
