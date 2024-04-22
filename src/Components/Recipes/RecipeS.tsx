import React, { useEffect, useState } from "react";
import "../../Styles/App.css";
import { Box, Flex, Image, Link } from "@chakra-ui/react";
import IIngredientModel from "../../Models/IIngredientModel";
import { IExtendedRecipeModel } from "../../Models/IExtendedRecipeModel";
import ApiService from "../Services/ApiService";
import IShoppingListItem from "../../Models/IShoppingListItem";
import useProducts from "../../Hooks/useProducts";

interface IRecipeS {
  recipe: IExtendedRecipeModel;
  onChange: Function;
}

function RecipeS({ recipe, onChange }: IRecipeS) {
  const ingredients: IIngredientModel[] = recipe.ingredients;
  const imagePath = `/images/recipes/${recipe._key}/${recipe.displayImage}`;
  console.log(recipe);
  const productsContext = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingListItem, setShoppingListItem] = useState<IShoppingListItem>();
  function toggleIngredinets(): void {
    setIsOpen((prevValue) => !prevValue);
  }

  useEffect(() => {
    if (shoppingListItem === undefined) {
      return;
    }
    ApiService.addToShoppingList(shoppingListItem);
  }, [shoppingListItem]);

  function handleClick(i: IIngredientModel): void {
    const itemValue = [i._key, i.name, i.quantity, i.measurementUnit];
    const shoppingItem: IShoppingListItem = {
      isIngredient: true,
      value: itemValue.join("|"),
    };
    productsContext.addShoppingItem(shoppingItem);

    setShoppingListItem(shoppingItem);
    onChange();
  }

  return (
    <Flex direction="row">
      <Box
        h={{ base: "12em", md: "12em", lg: "13em" }}
        minW="8em"
        my="1em"
        boxShadow="md"
      >
        <Flex
          bg="white"
          h="100%"
          flexDirection="column"
          borderRadius="5px"
          zIndex={"1"}
        >
          <Image
            borderTopRadius="5px"
            src={imagePath}
            alt="Chicken meal"
            fit="cover"
            h="60%"
          />
          <Box fontSize="0.8em" fontWeight={"500"} m="auto" mx="0.5em">
            {recipe?.name}
          </Box>
        </Flex>
      </Box>
      <Flex direction="row" w="100%" position={"relative"}>
        <Box
          position={"relative"}
          h={{ base: "12em", md: "12em", lg: "13em" }}
          mt="1em"
          className={isOpen ? "transition" : "hidden transition"}
          css={{
            "&::after": {
              position: "absolute",
              bottom: "0",
              height: "1em",
              left: "0",
              right: "0",
              zIndex: "6",
              content: '""',
              background:
                "linear-gradient(rgba(251, 233, 188, 0), rgba(251, 233, 188, 1))",
            },
          }}
        >
          <Box
            bg="rgba(251, 233, 188, 1)"
            my="0"
            p="0.5em"
            h={{ base: "12em", md: "12em", lg: "13em" }}
            minW="8em"
            overflowY={"scroll"}
            className={
              isOpen ? "transition scroll" : "hidden transition scroll"
            }
            css={{
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgb(207 192 152)",
                borderRadius: "24px",
              },
            }}
          >
            {ingredients?.map((i: any) => (
              <Flex fontSize={"0.6em"} justifyContent={"space-between"}>
                <Box textAlign="start">
                  {i.name} - {i.quantity + " " + i.measurementUnit}
                </Box>
                <Link
                  className="add-groceries-icon"
                  onClick={(e) => handleClick(i)}
                >
                  +
                </Link>
              </Flex>
            ))}
          </Box>
        </Box>
        <Image
          onClick={toggleIngredinets}
          w="1.4em"
          position={"absolute"}
          top="1em"
          left="0"
          borderTopRadius="5px"
          src={"./images/products.png"}
          alt="products label"
          fit="cover"
        />
      </Flex>
    </Flex>
  );
}

export default RecipeS;
