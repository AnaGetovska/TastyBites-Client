import { Box, Flex, Image } from "@chakra-ui/react";
import RecipeS from "../Recipes/RecipeS";
import ShoppingList from "./ShoppingList";
import { useEffect, useState } from "react";
import ApiService from "../Services/ApiService";
import IInMenuModel from "../../Models/IInMenuModel";
import _ from "lodash";
import { IExtendedRecipeModel } from "../../Models/IExtendedRecipeModel";

interface DayRecipeMap {
  [key: string]: IExtendedRecipeModel[];
}

export default function Menu() {
  const [menu, setMenu] = useState<IInMenuModel[]>();
  const [dayRecipes, setDayRecipes] = useState<DayRecipeMap>();
  const [recipes, setRecipes] = useState<IExtendedRecipeModel[]>();
  console.log(recipes);
  useEffect(() => {
    ApiService.getWeeklyMenu().then((menu): any => {
      setMenu(menu);
      const recipeKeysInMenu = _.uniq(
        _.map(menu, (el) => el._from.split("/")[1])
      );
      const recipesByDay = _.groupBy(menu, "day");
      let tempDayRecipes: DayRecipeMap = {};
      if (recipeKeysInMenu.length === 0) {
        return;
      }
      ApiService.getAllRecipesExtendedByKeys(recipeKeysInMenu).then(
        (recipes): any => {
          setRecipes(recipes);
          Object.keys(recipesByDay).forEach((day) => {
            tempDayRecipes[day] = recipesByDay[day].map((r) =>
              _.find(recipes, (i) => i._key === r._from.split("/")[1])
            ) as IExtendedRecipeModel[];
          });
          setDayRecipes(tempDayRecipes);
          console.log(dayRecipes);
        }
      );
    });
  }, []);

  const daysOfWeek = [
    "Понеделник",
    "Вторник",
    "Сряда",
    "Четвъртък",
    "Петък",
    "Събота",
    "Неделя",
  ];
  return (
    <Flex direction={"column"} gap="1em" mt="4em">
      <Box position={"relative"}>
        <Image
          h={{ base: "6em", md: "10em", lg: "12em" }}
          w="100%"
          objectFit={"cover"}
          objectPosition={"0px 28%"}
          src="./images/menu.jpg"
          alt="peper"
          bottom={"0px"}
        ></Image>
        <Box
          position={"absolute"}
          bottom="-20px"
          left={"50%"}
          transform={"translateX(-50%)"}
          px="1em"
          py="0.5em"
          borderRadius={"5px"}
          bg="rgba(213, 236, 165, 1)"
          fontWeight={"500"}
          fontSize={{ base: "1.2em", md: "1.5em", lg: "1.7em" }}
        >
          Седмично меню
        </Box>
      </Box>
      <Flex direction="column">
        {_.keys(dayRecipes).map((i) => (
          <Flex
            position={"relative"}
            flexWrap={"wrap"}
            w="90%"
            bg="gray.100"
            m="auto"
            mt="2em"
            pt="1em"
            px="1em"
          >
            <Box
              bg="rgba(251, 233, 188, 1)"
              px="1em"
              position={"absolute"}
              top="-15px"
              left="-15px"
              borderRadius={"5px"}
              fontSize={{ base: "1em", md: "1.2em", lg: "1.5em" }}
            >
              {daysOfWeek[Number(i) - 1]}
            </Box>
            {(dayRecipes as DayRecipeMap)[i].map((r) => (
              <RecipeS recipe={r} />
            ))}
          </Flex>
        ))}
      </Flex>
      <ShoppingList></ShoppingList>
    </Flex>
  );
}
