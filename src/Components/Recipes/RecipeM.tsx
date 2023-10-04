import React, { useEffect, useState } from "react";
import "../../App.css";
import { Box, Flex, Image, Icon } from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { LiaUtensilsSolid } from "react-icons/lia";
import { RiStarFill } from "react-icons/ri";
import StarRating from "../Rating/StarRating";
import { IRecipeModel } from "../../Models/IRecipeModel";

function RecipeM(props: any) {
  const recipe: IRecipeModel = props.recipe;
  const imagePath =
    "./images/recipes/" + recipe._key + "/" + recipe.displayImage;
  //TODO: Use this to add to favourites in DB
  const [isFavourite, setIsFavourite] = useState(false);

  //TODO: Use rating to post in DB
  const [rating, setRating] = useState();

  //TODO: Use this to load rating data for the recipe
  const votes = [1, 1, 2, 1, 2, 4];

  function handleClick() {
    setIsFavourite(!isFavourite);
  }

  return (
    <Flex
      w={{ base: "10em", sm: "10em", md: "10em", lg: "11em" }}
      h={{ base: "15em", sm: "15em", md: "15em", lg: "14em" }}
      minW="7em"
      mx={{ base: "0.2em", sm: "0.5em", md: "1em", lg: "1em" }}
      mb="2em"
      boxShadow="md"
    >
      <Flex
        bg="white"
        h="100%"
        flexDirection="column"
        w="100%"
        borderRadius="5px"
      >
        <Image
          borderTopRadius="5px"
          src={imagePath}
          alt="Chicken meal"
          fit="cover"
          h="50%"
        />
        <Box position="relative">
          <Box fontSize="0.7em" pt="1.2em" fontWeight="500">
            {recipe.name}
          </Box>
          <Icon
            onClick={handleClick}
            w="12px"
            left="5px"
            top="3px"
            position="absolute"
            as={isFavourite ? BsHeartFill : BsHeart}
          ></Icon>
          <Icon
            w="12px"
            top="85px"
            left="10px"
            position="absolute"
            as={IoIosTimer}
          ></Icon>
          <Box
            position="absolute"
            top="78px"
            left="22px"
            fontSize="0.5em"
            pt="1.2em"
          >
            {recipe.preparationTime} мин
          </Box>
          <Icon
            w="12px"
            top="85px"
            left="52px"
            position="absolute"
            as={LiaUtensilsSolid}
          ></Icon>
          <Box
            position="absolute"
            top="78px"
            left="67px"
            fontSize="0.5em"
            pt="1.2em"
          >
            {recipe.portions} порции
          </Box>
          <StarRating votes={votes} setRating={setRating}></StarRating>
        </Box>
      </Flex>
    </Flex>
  );
}

export default RecipeM;
