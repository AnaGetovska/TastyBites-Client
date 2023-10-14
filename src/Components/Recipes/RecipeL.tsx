import React, { useState } from "react";
import "../../Styles/App.css";
import {
  Box,
  Flex,
  Icon,
  Image,
  useMediaQuery,
  Link,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import Filter from "../Layout/Filter";
import StarRating from "../Rating/StarRating";
import { BsFillCircleFill } from "react-icons/bs";
import { BsHeart, BsHeartFill } from "react-icons/bs";

function RecipeL(props: any) {
  //TODO: Need extended recipe
  return (
    <>
      <DesktopRecipeL />
      <MobileRecipeL />
    </>
  );
}

function DesktopRecipeL() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 992px)");
  const imagePath =
    "./images/recipes/48625/d9369d83-ae60-4377-ad90-a5e8a2913d9a.png";
  const ingredients = [
    {
      name: "Пилешко филе",
      description: "Филе от пиле.",
      _id: "Ingredient/86966",
      _key: "86966",
      _rev: "_gq3dYUC---",
      measure: "700гр",
    },
    {
      name: "Ориз",
      description: "Обикновен ориз на зърна",
      _id: "Ingredient/84446",
      _key: "84446",
      _rev: "_gq2FLJm---",
      measure: "250гр",
    },
    {
      name: "Банани",
      description: "Обикновен ориз на зърна",
      _id: "Ingredient/84446",
      _key: "84446",
      _rev: "_gq2FLJm---",
      measure: "18бр.",
    },
    {
      name: "Сол",
      description: "Обикновен ориз на зърна",
      _id: "Ingredient/84446",
      _key: "84446",
      _rev: "_gq2FLJm---",
      measure: "1с.л.",
    },
    {
      name: "Спанак",
      description: "Обикновен ориз на зърна",
      _id: "Ingredient/84446",
      _key: "84446",
      _rev: "_gq2FLJm---",
      measure: "500гр",
    },
  ];
  const votes = [1, 1, 2, 1, 2, 4];
  const [rating, setRating] = useState();
  function handleClick() {
    setIsFavourite(!isFavourite);
  }
  const [isFavourite, setIsFavourite] = useState(false);
  return (
    <Flex
      display={{ base: "none", md: "flex" }}
      direction={{ base: "column", md: "row" }}
      gap="1em"
      mt="4em"
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
            fontSize="0.8em"
          >
            Необходими продукти
          </Box>
          <Flex direction="column" textAlign="initial" px="1em">
            <Box h="1em"></Box>
            <hr />
            {ingredients.map((i) => {
              return (
                <Flex
                  direction="column"
                  fontSize={{ md: "0.7em", lg: "0.8em" }}
                  fontWeight="500"
                  w="100%"
                >
                  <Flex direction="row" alignItems="center" my="0.2em">
                    <Icon
                      alignSelf="center"
                      color="orange"
                      w="0.5em"
                      mr="1em"
                      as={BsFillCircleFill}
                    ></Icon>
                    <Flex justifyContent="space-between" w="100%" my="0.5em">
                      <Box>{i.name}</Box>
                      <Box alignSelf="flex-end">{i.measure}</Box>
                    </Flex>
                  </Flex>
                  <Divider />
                </Flex>
              );
            })}
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
                src={imagePath}
              ></Image>
              {isLoggedIn && (
                <Box
                  onClick={handleClick}
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
            <Box textAlign="start" fontFamily="Dihi">
              Протеинови палачинки с банан
            </Box>
            <Flex direction="row" justifyContent="space-between">
              <Flex
                fontSize={{ md: "0.6em", lg: "0.7em", xl: "0.8em" }}
                alignItems="center"
                gap={{ md: "0.6em", lg: "1em" }}
              >
                <Flex alignItems="center">
                  <Image
                    src="./images/icons/timer50.png"
                    w="20px"
                    h="20px"
                  ></Image>
                  <Box pl="0.3em">120 мин</Box>
                </Flex>
                <Flex alignItems="center">
                  <Image
                    src="./images/icons/cutlery64.png"
                    w="20px"
                    h="20px"
                  ></Image>
                  <Box>4 порции</Box>
                </Flex>
                {isLoggedIn && (
                  <Flex alignItems="center">
                    <Image
                      src="./images/icons/menu50.png"
                      w="20px"
                      h="20px"
                    ></Image>
                    <Box pl="0.5em">Добави към меню</Box>
                  </Flex>
                )}
              </Flex>
              {isLoggedIn && (
                <Flex>
                  <StarRating
                    size={isMobile ? 15 : 20}
                    votes={votes}
                    setRating={setRating}
                  ></StarRating>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Box fontFamily="Dihi-italic">
            is dummy text used in laying out print, graphic
            <br /> or web designs. The passage is attributed to an unknown
            typesetter
            <br /> in the 15th century who is thought to have scrambled parts of{" "}
            <br />
            Cicero's De Finibus Bonorum et Malorum for use in a type specimen
            book.
            <br /> It usually begins with: “Lorem ipsum dolor sit amet,
            consectetur <br />
            Lorem ipsum, or lipsum as it is <br />
            sometimes known, is dummy text used in laying out print, graphic
            <br /> or web designs. The passage is attributed to an unknown
            typesetter
            <br /> in the 15th century who is thought to have scrambled parts of{" "}
            <br />
            Cicero's De Finibus Bonorum et Malorum for use in a type specimen
            book.
            <br /> It usually begins with: “Lorem ipsum dolor sit amet,
            consectetur <br />
            Lorem ipsum, or lipsum as it is <br />
            sometimes known, is dummy text used in laying out print, graphic
            <br /> or web designs. The passage is attributed to an unknown
            typesetter
            <br /> in the 15th century who is thought to have scrambled parts of{" "}
            <br />
            Cicero's De Finibus Bonorum et Malorum for use in a type specimen
            book.
            <br /> It usually begins with: “Lorem ipsum dolor sit amet,
            consectetur <br />
            Lorem ipsum, or lipsum as it is <br />
            sometimes known, is dummy text used in laying out print, graphic
            <br /> or web designs. The passage is attributed to an unknown
            typesetter
            <br /> in the 15th century who is thought to have scrambled parts of{" "}
            <br />
            Cicero's De Finibus Bonorum et Malorum for use in a type specimen
            book.
            <br /> It usually begins with: “Lorem ipsum dolor sit amet,
            consectetur <br />
            Lorem ipsum, or lipsum as it is <br />
            sometimes known, is dummy text used in laying out print, graphic
            <br /> or web designs. The passage is attributed to an unknown
            typesetter
            <br /> in the 15th century who is thought to have scrambled parts of{" "}
            <br />
            Cicero's De Finibus Bonorum et Malorum for use in a type specimen
            book.
            <br /> It usually begins with: “Lorem ipsum dolor sit amet,
            consectetur <br />
            Lorem ipsum, or lipsum as it is <br />
            sometimes known, is dummy text used in laying out print, graphic
            <br /> or web designs. The passage is attributed to an unknown
            typesetter
            <br /> in the 15th century who is thought to have scrambled parts of{" "}
            <br />
            Cicero's De Finibus Bonorum et Malorum for use in a type specimen
            book.
            <br /> It usually begins with: “Lorem ipsum dolor sit amet,
            consectetur <br />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

function MobileRecipeL() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  function handleClick() {
    setIsFavourite(!isFavourite);
  }
  const [isFavourite, setIsFavourite] = useState(false);
  const imagePath =
    "./images/recipes/48625/d9369d83-ae60-4377-ad90-a5e8a2913d9a.png";
  const ingredients = [
    {
      name: "Пилешко филе",
      description: "Филе от пиле.",
      _id: "Ingredient/86966",
      _key: "86966",
      _rev: "_gq3dYUC---",
      measure: "700гр",
    },
    {
      name: "Ориз",
      description: "Обикновен ориз на зърна",
      _id: "Ingredient/84446",
      _key: "84446",
      _rev: "_gq2FLJm---",
      measure: "250гр",
    },
    {
      name: "Банани",
      description: "Обикновен ориз на зърна",
      _id: "Ingredient/84446",
      _key: "84446",
      _rev: "_gq2FLJm---",
      measure: "18бр.",
    },
    {
      name: "Сол",
      description: "Обикновен ориз на зърна",
      _id: "Ingredient/84446",
      _key: "84446",
      _rev: "_gq2FLJm---",
      measure: "1с.л.",
    },
    {
      name: "Спанак",
      description: "Обикновен ориз на зърна",
      _id: "Ingredient/84446",
      _key: "84446",
      _rev: "_gq2FLJm---",
      measure: "500гр",
    },
  ];
  const votes = [2, 3, 5, 3, 4];
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
        bgImage={imagePath}
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
            Родопско Пилешко с ориз и манатарки и морска сол
          </Flex>
          {isLoggedIn && (
            <Flex alignItems="center" justifyContent="space-between">
              <Link>
                <Flex
                  alignItems="center"
                  fontSize="0.7em"
                  opacity="0.8"
                  gap="1em"
                >
                  <Image
                    src="./images/icons/menu50.png"
                    w="20px"
                    h="20px"
                  ></Image>
                  <Box> +Добави към меню</Box>
                </Flex>
              </Link>
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
          <Image src="./images/icons/timer50.png" maxW="20px" h="20px"></Image>
          <Box>120 мин</Box>
        </Flex>
        <Flex>
          <Image
            src="./images/icons/cutlery64.png"
            minW="20px"
            h="20px"
          ></Image>
          <Box>4 порции</Box>
        </Flex>
        <StarRating size={20} votes={votes} setRating={setRating}></StarRating>
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
              {ingredients.map((i) => {
                return (
                  <Flex direction="column" fontSize="0.8em" w="100%">
                    <Flex direction="row" alignItems="center" my="0.2em">
                      <Icon
                        alignSelf="center"
                        color="orange"
                        w="0.5em"
                        mr="1em"
                        as={BsFillCircleFill}
                      ></Icon>
                      <Flex justifyContent="space-between" w="100%" my="0.5em">
                        <Box>{i.name}</Box>
                        <Box fontWeight="500" alignSelf="flex-end">
                          {i.measure}
                        </Box>
                      </Flex>
                    </Flex>
                    <Divider />
                  </Flex>
                );
              })}
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
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Box>
      </Accordion>
    </Flex>
  );
}
export default RecipeL;
