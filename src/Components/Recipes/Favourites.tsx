import React, { useEffect, useState } from "react";
import "../../Styles/App.css";
import { Box, Flex, Image } from "@chakra-ui/react";
import { IExtendedRecipeModel } from "../../Models/IExtendedRecipeModel";
import ApiService from "../Services/ApiService";
import Filter from "../Layout/Filter";
import RecipeM from "./RecipeM";

function Favourites() {
  const [allRecipes, setAllRecipes] = useState<IExtendedRecipeModel[]>();

  useEffect(() => {
    ApiService.getFavourites().then((recipes) => setAllRecipes(recipes));
  }, []);
  return (
    <Flex direction={"column"} gap="1em" bg="rgb(251 233 188)" h="inherit">
      <Box position={"relative"}>
        <Image
          h={{ base: "6em", md: "10em", lg: "12em" }}
          w="100%"
          objectFit={"cover"}
          objectPosition={"0px 88%"}
          src="./images/favourites.jpg"
          alt="peper"
          bottom={"0"}
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
          Любими рецепти
        </Box>
      </Box>
      <Flex
        display={{ md: "flex" }}
        direction={{ base: "column", md: "row" }}
        gap="1em"
        mt="4em"
        mx="auto"
      >
        {allRecipes !== undefined && allRecipes.length <= 0 && (
          <Box
            fontSize={{ base: "1em", md: "1.5em" }}
            fontStyle="italic"
            fontFamily="none"
          >
            <Image
              m="auto"
              mb="1em"
              w={{ base: "5em", md: "10em" }}
              src="images/chef.png"
            ></Image>
            Все още няма любими рецепти.
          </Box>
        )}
        <Flex
          flexWrap="wrap"
          direction={"row"}
          justifyContent="space-around"
          py="2em"
          mt="2em"
        >
          {allRecipes?.map((r) => (
            <RecipeM recipe={r} key={r?._key} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Favourites;
