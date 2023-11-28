import React, { useState } from "react";
import "../../Styles/App.css";
import { Box, Divider, Flex, Image, Link } from "@chakra-ui/react";
import IIngredientModel from "../../Models/IIngredientModel";

function RecipeS(props: any) {
  const ingredients: [string, string] = props.ingredients;

  const [isOpen, setIsOpen] = useState(false);
  const [shoppingList, setShoppingList] = useState<IIngredientModel[]>([]);

  function toggleIngredinets(): void {
    setIsOpen((prevValue) => !prevValue);
  }

  function handleClick(i: IIngredientModel): void {
    setShoppingList((prevState) => [...prevState, i]);
    console.log(shoppingList);
  }

  return (
    <Flex direction="row">
      <Flex
        w={{ base: "3em", md: "6em", lg: "9em" }}
        h={{ base: "10em", md: "10em", lg: "11em" }}
        minW="7em"
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
            src={"./images/vegetables.jpg"}
            alt="Chicken meal"
            fit="cover"
            h="60%"
          />
          <Box fontSize="0.8em" fontWeight={"500"} m="auto">
            Зеленчуци на фурна
          </Box>
        </Flex>
      </Flex>
      <Flex direction="row" w="100%" position={"relative"}>
        <Box
          position={"relative"}
          h="11em"
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
            w={{ base: "3em", md: "6em", lg: "7em" }}
            h="11em"
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
            {ingredients.map((i: any) => (
              <Flex fontSize={"0.6em"} justifyContent={"space-between"}>
                <Box textAlign="start">
                  {i.ingredient} - {i.measurement}
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

        <Box
          onClick={toggleIngredinets}
          h="1.4em"
          m="0"
          transform={"rotate(90deg) translateX(50%)"}
          px="1em"
          borderTopRadius={"5px"}
          fontSize="0.8em"
          bg="rgba(251, 233, 188, 1)"
          position={"absolute"}
          top="0.5em"
          right={"-1.4em"}
        >
          Продукти
        </Box>
      </Flex>
    </Flex>
  );
}

export default RecipeS;
