import { Box, Button, Divider, Flex, Image, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Search from "./Admin/Search";
import ApiService from "./Services/ApiService";
import IIngredientModel from "../Models/IIngredientModel";
import { CloseIcon } from "@chakra-ui/icons";
import { IRecipeModel } from "../Models/IRecipeModel";
import RecipeM from "./Recipes/RecipeM";

//TODO: FIX Duplicated ingredients when added
//TODO: Vegetables imagein mobile screen should be positioned in the bottom
export default function FridgeContentsFilter() {
  const [myIngredients, setMyIngredients] = useState<IIngredientModel[]>([]);

  const [searchString, setSearchString] = useState<string>("");
  const [recipesResult, setRecipesResult] = useState<IRecipeModel[]>([]);
  const setSearchValue = (searchString: string) => {
    setSearchString(searchString);
  };
  const [suggestedIngredients, setSuggestedIngredients] = useState<
    IIngredientModel[]
  >([]);

  useEffect(() => {
    if (searchString.length >= 2) {
      ApiService.getAllIngredientsByWildcard(searchString).then((ingredients) =>
        setSuggestedIngredients(ingredients)
      );
    }
  }, [searchString]);

  function addIngredient(i: IIngredientModel): void {
    if (myIngredients.indexOf(i) === -1) {
      let ingredients = [...myIngredients];
      ingredients.push(i);
      setMyIngredients(ingredients);
    }
  }
  function removeIngredient(i: IIngredientModel): void {
    if (myIngredients.includes(i)) {
      setMyIngredients((prevState) =>
        prevState.filter(function (ing: IIngredientModel) {
          return ing !== i;
        })
      );
    }
  }

  async function handleClick(e: any) {
    const payload = myIngredients?.map((i) => i._key);
    if (payload.length > 0) {
      ApiService.getAllRecipesByIngredients(payload).then((recipes) => {
        setRecipesResult(recipes);
        console.log(recipes);
      });
    }
  }

  return (
    <Flex direction="column" w="100%" alignItems="center" mt="4em">
      <Flex
        flexWrap="wrap"
        direction={"column"}
        justifyContent="space-around"
        alignItems={"center"}
        py="2em"
        w={{ base: "100%", md: "85%" }}
      >
        <Box position={"relative"}>
          <Flex
            position={"relative"}
            direction="column"
            alignItems="center"
            gap="1em"
            bg="rgb(249 249 249)"
            w={{ base: "23em", md: "30em", lg: "35em" }}
            h="21em"
            borderRadius={"5px"}
          >
            <Flex
              fontWeight={"500"}
              fontSize={{ base: "0.7em", md: "0.9em" }}
              opacity={"0.6"}
              w={{ base: "70%", md: "40%" }}
              pt="2em"
            >
              Добави продуктите с които разполагаш и потърси подходящи рецепти.
            </Flex>
            <Flex w={{ base: "90%", md: "80%" }} direction="column">
              <Search
                label="Търси продукти"
                pholder="Име на продукт..."
                onChange={setSearchValue}
                color="#1A202C"
                bg="gray.100"
              />
              <Box h="4em">
                <Flex direction="row" mt="1em" gap="1em">
                  {searchString.length >= 2 &&
                    suggestedIngredients?.map((i) => (
                      <Tag
                        fontSize={{ base: "0.7em", md: "0.8em" }}
                        _hover={{ bg: "gray.200", cursor: "pointer" }}
                        key={i._key}
                        onClick={(e) => addIngredient(i)}
                      >
                        {i.name}
                      </Tag>
                    ))}
                </Flex>
              </Box>
              <Divider />
              <Flex direction={"row"} h="3em">
                {myIngredients?.map((i) => (
                  <Button
                    key={i._key}
                    onClick={(e) => removeIngredient(i)}
                    position="relative"
                    px="1em"
                    m="0.5em"
                    h="2em"
                    fontSize="0.8em"
                    bg="rgba(213, 236, 165, 1)"
                  >
                    {i?.name}
                    <CloseIcon
                      m="0.5em"
                      position="absolute"
                      boxSize={1.5}
                      top="-0.5px"
                      right="-2px"
                    />
                  </Button>
                ))}
              </Flex>
            </Flex>
            <Button onClick={handleClick}>Търси</Button>
          </Flex>
          <Box
            position={"absolute"}
            top="-20px"
            right={{ base: "68px", md: "125px", lg: "168px" }}
            px="1em"
            py="0.5em"
            borderRadius={"5px"}
            bg="rgba(213, 236, 165, 1)"
            fontWeight={"500"}
          >
            Какво имам в хладилника?
          </Box>
        </Box>

        <Image
          opacity={"0.3"}
          boxSize={{ base: "0em", md: "15em", lg: "18em" }}
          position={"absolute"}
          src="./images/vegetables.png"
          alt="fridge drawing"
          top={"60px"}
          right={"0px"}
        ></Image>
        <Image
          opacity={"0.3"}
          transform={"scaleX(-1)"}
          boxSize={{ base: "0em", md: "15em", lg: "18em" }}
          position={"absolute"}
          src="./images/vegetables.png"
          alt="fridge drawing"
          top={"260px"}
          left={"0px"}
        ></Image>
      </Flex>
      <Flex flexWrap="wrap" direction={"row"} justifyContent="space-around">
        {recipesResult?.map((r) => (
          <RecipeM recipe={r} key={r._key} />
        ))}
      </Flex>
      <Flex direction="row">
        <Image
          opacity={"0.3"}
          h={{ base: "5em", md: "0", lg: "0" }}
          src="./images/vegetables3.png"
          alt="potato, tomato, cabbage"
          bottom={"0px"}
          left={"0px"}
        ></Image>
        <Image
          opacity={"0.3"}
          h={{ base: "5em", md: "0", lg: "0" }}
          src="./images/peper.png"
          alt="peper"
          bottom={"0px"}
          right={"10px"}
        ></Image>
      </Flex>
    </Flex>
  );
}
