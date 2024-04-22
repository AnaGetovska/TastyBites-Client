import { useEffect, useState } from "react";
import "../../Styles/App.css";
import {
  Box,
  Flex,
  Image,
  useMediaQuery,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Heading,
} from "@chakra-ui/react";
import Filter from "../Layout/Filter";
import StarRating from "../Rating/StarRating";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";
import ApiService from "../Services/ApiService";
import IIngredientModel from "../../Models/IIngredientModel";
import { IExtendedRecipeModel } from "../../Models/IExtendedRecipeModel";
import { useParams } from "react-router-dom";
import IInMenuModel from "../../Models/IInMenuModel";
import AddInMenu from "../Menu/AddInMenu";
import Markdown from "react-markdown";

function RecipeL(props: any) {
  const [recipe, setRecipe] = useState<IExtendedRecipeModel>();
  const [menu, setMenu] = useState<IInMenuModel[]>();
  const { key } = useParams();
  useEffect(() => {
    ApiService.getRecipeExtendedByKey(key || "0").then((recipe) => {
      setRecipe(recipe[0]);
    });
  }, [recipe === undefined]);

  return (
    <>
      <DesktopRecipeL recipe={recipe} key={key} />
      <MobileRecipeL recipe={recipe} />
    </>
  );
}

function DesktopRecipeL(props: any) {
  const { key } = useParams();
  const isAuthenticated = useAuth().auth ? true : false;

  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [rating, setRating] = useState();
  const [isFavourite, setIsFavourite] = useState(false);

  const recipe = props?.recipe;
  const rIngredients: IIngredientModel[] = props.recipe?.ingredients;
  const [isMobile] = useMediaQuery("(max-width: 992px)");
  const imageUrl = "http://localhost:5214/api/image/" + recipe?.displayImage;

  function handleIsFavourite() {
    setIsFavourite(!isFavourite);
  }

  return (
    <Flex
      display={{ base: "none", md: "flex" }}
      direction={{ base: "column", md: "row" }}
      h="inherit"
      gap="1em"
    >
      <Filter />
      <Box w={{ md: "30%", lg: "30%", xl: "20%" }} mt="1em">
        <Box
          position="sticky"
          top={{ base: "120px", md: "75px" }}
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          borderTopLeftRadius="15px"
          borderBottomRadius="5px"
        >
          <Box
            borderTopLeftRadius="15px"
            borderBottomRightRadius="15px"
            bg="rgba(255, 207, 86, 1)"
            fontWeight="500"
            p="0.3em"
            fontSize="1em"
          >
            Необходими продукти
          </Box>
          <Flex direction="column" textAlign="initial" px="1em">
            <Box h="1em"></Box>
            <hr />
            {rIngredients?.map((i: any) => (
              <Flex
                direction="column"
                fontSize={{ md: "0.8em", lg: "0.9em" }}
                fontWeight="500"
                w="100%"
              >
                <Flex direction="row" alignItems="center" my="0.2em">
                  <Flex justifyContent="space-between" w="100%" my="0.5em">
                    <Box>{i.name}</Box>
                    <Box alignSelf="flex-end">
                      {i.quantity + " " + i.measurementUnit}
                    </Box>
                  </Flex>
                </Flex>
                <Divider />
              </Flex>
            ))}
            <Box h="2em"></Box>
          </Flex>
        </Box>
      </Box>
      <Box w={{ md: "70%", lg: "70%" }} mr="1em" mt="1em">
        <Flex direction="column" alignItems="center">
          <Box w={{ md: "100%", lg: "70%", xl: "60%" }}>
            <Box w="100%" position="relative">
              <Image
                borderTopRadius="5px"
                h="20em"
                w="100%"
                objectFit="cover"
                src={imageUrl}
              ></Image>
              {isLoggedIn && (
                <Box
                  onClick={handleIsFavourite}
                  color="white"
                  right="10px"
                  top="10px"
                  position="absolute"
                >
                  {isFavourite ? (
                    <BsHeartFill size={20} />
                  ) : (
                    <BsHeart size={20} />
                  )}
                </Box>
              )}
            </Box>
          </Box>
          <Flex
            direction="column"
            fontWeight="500"
            bg="orange"
            h="5em"
            w={{ md: "100%", lg: "70%", xl: "60%" }}
            borderBottomRadius="5px"
            justifyContent="space-around"
            px="1em"
          >
            <Heading as="h1" textAlign="start" fontFamily="Dihi">
              {recipe?.name}
            </Heading>
            <Flex direction="row" justifyContent="space-between">
              <Flex
                fontSize={{ md: "0.6em", lg: "0.7em", xl: "0.8em" }}
                alignItems="center"
                gap={{ md: "0.6em", lg: "1em" }}
              >
                <Flex alignItems="center">
                  <Image
                    src="/images/icons/timer50.png"
                    w="20px"
                    h="20px"
                  ></Image>
                  <Box pl="0.3em">{recipe?.preparationTime} мин</Box>
                </Flex>
                <Flex alignItems="center">
                  <Image
                    src="/images/icons/cutlery64.png"
                    w="20px"
                    h="20px"
                  ></Image>
                  <Box>{recipe?.portions} порции</Box>
                </Flex>
                {isLoggedIn && <AddInMenu recipeKey={recipe?._key} />}
              </Flex>
              {isLoggedIn && (
                <Flex>
                  <StarRating
                    size={isMobile ? 15 : 20}
                    ratingCount={recipe?.ratingCount}
                    rating={recipe?.rating}
                    setRating={setRating}
                  ></StarRating>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Box
            w={{ md: "100%", lg: "70%", xl: "60%" }}
            my="2em"
            textAlign="left"
          >
            <Markdown>{recipe?.description}</Markdown>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
function MobileRecipeL(props: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);
  const { key } = useParams();

  const rIngredients: IIngredientModel[] = props.recipe?.ingredients;
  const recipe = props?.recipe;
  const imageUrl = "http://localhost:5214/api/image/" + recipe?.displayImage;

  function handleClick() {
    setIsFavourite(!isFavourite);
  }

  const [rating, setRating] = useState();
  return (
    <Flex
      bg="white"
      direction="column"
      mt="4em"
      display={{ base: "flex", md: "none" }}
    >
      <Box
        position="relative"
        bgImage={imageUrl}
        h="16em"
        w="100%"
        justifyContent="flex-end"
        bgSize="cover"
        bgPosition="center"
      >
        <Box
          bg="#fdfdfd"
          bottom="0px"
          borderTopRadius="15px"
          position="absolute"
          pt="1.5em"
          w="inherit"
          h="auto"
          px="2em"
        >
          <Flex fontWeight="500" textAlign="left">
            {recipe?.name}
          </Flex>
          {isLoggedIn && (
            <Flex alignItems="center" justifyContent="space-between">
              <AddInMenu recipeKey={recipe?._key} size="mobile" />
              <Flex onClick={handleClick} color="black">
                {isFavourite ? (
                  <BsHeartFill size={20} />
                ) : (
                  <BsHeart size={20} />
                )}
              </Flex>
            </Flex>
          )}
        </Box>
      </Box>
      <Flex
        bg="#fdfdfd"
        py="3em"
        fontSize="0.8em"
        px="2em"
        justifyContent="space-around"
        direction="row"
        wrap="wrap"
      >
        <Flex>
          <Image src="/images/icons/timer50.png" maxW="20px" h="20px"></Image>
          <Box>{recipe?.preparationTime} мин</Box>
        </Flex>
        <Flex>
          <Image src="/images/icons/cutlery64.png" minW="20px" h="20px"></Image>
          <Box>{recipe?.portions} порции</Box>
        </Flex>
        <StarRating
          size={20}
          ratingCount={recipe?.ratingCount}
          rating={recipe?.rating}
          setRating={setRating}
        ></StarRating>
      </Flex>
      <Accordion borderColor="transparent" defaultIndex={[0, 1]} allowMultiple>
        <Box borderWidth="inherit" bg="#fdfdfd">
          <AccordionItem
            borderWidth="inherit"
            boxShadow="rgba(0, 0, 0, 0.3) 0px 19px 33px, rgba(0, 0, 0, 0.12) 0px 25px 12px;"
            borderTopRadius="15px"
            bg="white"
            px="1em"
          >
            <h2>
              <AccordionButton
                _hover={{
                  bg: "white",
                  borderTopRadius: "15px",
                  transition: "none",
                }}
              >
                <Box fontWeight="500" as="span" flex="1" textAlign="left">
                  Необходими продукти
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {rIngredients?.map((i: any) => (
                <Flex
                  direction="column"
                  fontSize={{ base: "0.7em", md: "0.7em", lg: "0.8em" }}
                  fontWeight="500"
                  w="100%"
                >
                  <Flex direction="row" alignItems="center" my="0.2em">
                    <Flex justifyContent="space-between" w="100%" my="0.5em">
                      <Box>{i.name}</Box>
                      <Box alignSelf="flex-end">
                        {i.quantity + " " + i.measurementUnit}
                      </Box>
                    </Flex>
                  </Flex>
                  <Divider />
                </Flex>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Box>
        <Box bg="white">
          <AccordionItem borderTopRadius="15px" bg="#ffcc6e">
            <h2>
              <AccordionButton
                _hover={{
                  bg: "#ffcc6e",
                  borderTopRadius: "15px",
                  transition: "none",
                }}
              >
                <Box as="span" flex="1" textAlign="left">
                  Начин на приготвяне
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{recipe?.description}</AccordionPanel>
          </AccordionItem>
        </Box>
      </Accordion>
    </Flex>
  );
}
export default RecipeL;
