import React, { useEffect, useState } from "react";
import "../../Styles/App.css";
import { Box, Flex, Image, Icon, useMediaQuery, Link } from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { LiaUtensilsSolid } from "react-icons/lia";
import StarRating from "../Rating/StarRating";
import useAuth from "../../Hooks/useAuth";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { IExtendedRecipeModel } from "../../Models/IExtendedRecipeModel";
import ApiService from "../Services/ApiService";
import _ from "lodash";

function RecipeM(props: any) {
  const recipe: IExtendedRecipeModel = props.recipe;
  const navigate = useNavigate();
  const isAuthenticated = useAuth().auth ? true : false;
  const [isMobile] = useMediaQuery("(max-width: 992px)");
  const imageUrl = "http://localhost:5214/api/image/" + recipe?.displayImage;
  //TODO: Use this to add to favourites in DB
  const [isFavourite, setIsFavourite] = useState<boolean>();
  //TODO: Use rating to post in DB
  const [rating, setRating] = useState();
  //TODO: Use this to load rating data for the recipe
  const votes = [1, 1, 2, 5, 5, 5, 4];

  useEffect(() => {
    ApiService.getFavourites().then((favourites) => {
      if (_.find(favourites, { _key: recipe._key })) {
        setIsFavourite(true);
        return;
      }
      setIsFavourite(false);
    });
  }, []);

  function handleClick() {
    console.log(isFavourite);
    setIsFavourite(!isFavourite);
    if (isFavourite) {
      ApiService.deleteFromFavourites(recipe._key);
    } else {
      ApiService.addToFavourites(recipe._key);
    }
  }

  return (
    <Flex
      w={{ base: "10em", sm: "11em", md: "11em", lg: "12em" }}
      h={{ base: "15em", sm: "16em", md: "15em", lg: "17em" }}
      minW="7em"
      mx={{ base: "0.2em", sm: "0.5em", md: "1em", lg: "1em" }}
      mb="2em"
      boxShadow="md"
      className="on-focus"
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
          src={imageUrl}
          alt="Chicken meal"
          fit="cover"
          h="50%"
          className="add-cursor"
        />
        <Flex direction="column" height="50%" justifyContent="space-around">
          <Flex direction="column">
            {isAuthenticated && (
              <Icon
                onClick={handleClick}
                w="15px"
                mt="0.2em"
                ml="0.2em"
                as={isFavourite ? BsHeartFill : BsHeart}
              ></Icon>
            )}
            <Box fontSize="0.9em" fontWeight="500">
              {recipe.name}
            </Box>
          </Flex>
          <Flex justifyContent="space-around" mb="0.5em">
            <Flex direction="row" alignItems="center">
              <Icon w="15px" as={IoIosTimer}></Icon>
              <Box fontSize="0.6em">{recipe.preparationTime} мин</Box>
            </Flex>
            <Flex direction="row" alignItems="center">
              <Icon w="15px" as={LiaUtensilsSolid}></Icon>
              <Box fontSize="0.6em">{recipe.portions} порции</Box>
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
