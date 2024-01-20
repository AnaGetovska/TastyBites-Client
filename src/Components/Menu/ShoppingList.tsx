import {
  Box,
  Button,
  Center,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import ApiService from "../Services/ApiService";
import { useEffect, useState } from "react";
import IShoppingListItem from "../../Models/IShoppingListItem";

export default function ShoppingList() {
  const [shoppingList, setShoppingList] = useState<IShoppingListItem[]>();
  const [recentlyDeleted, setRecentlyDeleted] = useState<IShoppingListItem[]>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    ApiService.getShoppingList().then((list) => setShoppingList(list));
  }, []);

  console.log(shoppingList);
  function handleDeleteList(e: any): void {}

  function getIngredientValue(i: IShoppingListItem) {
    const values = i.value.split("|");
    return values[1] + " - " + values[2] + " " + values[3];
  }

  const removeFromShoppingList = async (i: IShoppingListItem) => {
    const index = shoppingList?.indexOf(i);
    if (index === undefined) {
      return;
    }

    ApiService.deleteFromShoppingList(index);
    const newList = shoppingList?.slice(index, 1);
    setShoppingList(newList);
  };

  return (
    <Center>
      <Flex
        direction="inherit"
        position="relative"
        flexWrap="wrap"
        w="90%"
        bg="gray.100"
        m="auto"
        mt="2em"
        mb="2em"
        p="1em"
      >
        <Flex
          direction="row"
          mx="auto"
          w="100%"
          justifyContent="center"
          mt="3em"
          gap="1em"
        >
          <Button bg="rgba(213, 236, 165, 1)">Добави продукт +</Button>
          {/* <Button bg="rgba(213, 236, 165, 1)" onClick={onOpen}>
            Изчисти списъка
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Сигурни ли сте?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Ще премахнете всички продукти от списъка за пазаруване.
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Затвори
                </Button>
                <Button variant="ghost" onClick={handleDeleteList}>
                  Изчисти продуктите
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal> */}
        </Flex>
        <Flex direction="column" justifyContent="flex-start">
          {shoppingList?.map((i) => (
            <Link
              _hover={{ textDecoration: "none" }}
              onClick={(e) => removeFromShoppingList(i)}
            >
              <Box textAlign={"start"}>
                {i.isIngredient ? getIngredientValue(i) : i.value}
              </Box>
            </Link>
          ))}
        </Flex>
        <Box
          bg="rgba(251, 233, 188, 1)"
          px="1em"
          py="0.5em"
          position={"absolute"}
          left={"50%"}
          top="-30px"
          transform={"translateX(-50%)"}
          borderRadius={"5px"}
          fontSize={{ base: "1em", md: "1.2em", lg: "1.5em" }}
          fontWeight={"500"}
        >
          Списък за пазаруване
        </Box>
      </Flex>
    </Center>
  );
}
