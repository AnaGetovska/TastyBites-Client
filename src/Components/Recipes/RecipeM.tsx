import React, { useState } from "react";
import "../../Styles/App.css";
import { Box, Flex, Image, Icon, useMediaQuery, Link } from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { LiaUtensilsSolid } from "react-icons/lia";
import StarRating from "../Rating/StarRating";
import useAuth from "../../Hooks/useAuth";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { IExtendedRecipeModel } from "../../Models/IExtendedRecipeModel";

function RecipeM(props: any) {
  const recipe: IExtendedRecipeModel = props.recipe;
  const navigate = useNavigate();
  const isAuthenticated = useAuth().auth ? true : false;
  const [isMobile] = useMediaQuery("(max-width: 992px)");
  const imagePath =
    "./images/recipes/" + recipe._key + "/" + recipe.displayImage;
  //TODO: Use this to add to favourites in DB
  const [isFavourite, setIsFavourite] = useState(false);

  //TODO: Use rating to post in DB
  const [rating, setRating] = useState();
  //TODO: Use this to load rating data for the recipe
  const votes = [1, 1, 2, 5, 5, 4];

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
          onClick={(e) => navigate("/recipe/" + recipe._key)}
          borderTopRadius="5px"
          src={imagePath}
          alt="Chicken meal"
          fit="cover"
          h="50%"
        />
        <Flex direction="column" height="50%" justifyContent="space-around">
          <Flex direction="column">
            {isAuthenticated && (
              <Icon
                onClick={handleClick}
                w="12px"
                mt="0.2em"
                ml="0.2em"
                as={isFavourite ? BsHeartFill : BsHeart}
              ></Icon>
            )}
            <Box fontSize="0.7em" fontWeight="500">
              {recipe.name}
            </Box>
          </Flex>
          <Flex justifyContent="space-around" mb="0.5em">
            <Flex direction="row" alignItems="center">
              <Icon w="12px" as={IoIosTimer}></Icon>
              <Box fontSize="0.5em">{recipe.preparationTime} мин</Box>
            </Flex>
            <Flex direction="row" alignItems="center">
              <Icon w="12px" as={LiaUtensilsSolid}></Icon>
              <Box fontSize="0.5em">{recipe.portions} порции</Box>
            </Flex>
            {isAuthenticated && (
              <StarRating
                size={isMobile ? 8 : 10}
                rating={recipe.rating}
                ratingCount={recipe.ratingCount}
                setRating={setRating}
              ></StarRating>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default RecipeM;
