import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ApiService from "../Services/ApiService";
import { useEffect, useState } from "react";
import { IRecipeModel } from "../../Models/IRecipeModel";
import { accent1, accent2 } from "../../Styles/ColorPalette";
import RecipeM from "../Recipes/RecipeM";
import Search from "./Search";

export default function AdminHome() {
  const [allRecipes, setAllRecipes] = useState<IRecipeModel[]>();
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    if (searchString.length >= 3) {
      ApiService.getAllRecipesByNameCut(searchString).then((recipes) =>
        setAllRecipes(recipes)
      );
    }
  }, [searchString]);

  const setSearchValue = (searchString: string) => {
    setSearchString(searchString);
  };
  return (
    <>
      <Tabs colorScheme="green" mt="4em">
        <TabList>
          <Tab>Рецепти</Tab>
          <Tab>Продукти</Tab>
          <Tab>Категории</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex direction="column">
              <Flex direction="row" gap="1em">
                <Button bg={accent1} px="2.5em" as="a" href="edit-recipe">
                  Добави рецепта +
                </Button>
                <Box w={{ base: "100%", md: "30%" }}>
                  <Search
                    label="Намери рецепта"
                    pholder="Име на рецепта..."
                    onChange={setSearchValue}
                    bg="rgb(207 219 176)"
                    color={accent2}
                  />
                </Box>
              </Flex>
              <Flex mt="2em">
                {searchString.length >= 3 &&
                  allRecipes?.map((r) => <RecipeM key={r._key} recipe={r} />)}
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
