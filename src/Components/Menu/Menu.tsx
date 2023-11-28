import { Box, Flex, Image } from "@chakra-ui/react";
import RecipeS from "../Recipes/RecipeS";

export default function Menu() {
  const ingredients = [
    { ingredient: "Ориз", measurement: "500 гр" },
    { ingredient: "Олио", measurement: "2 с.л." },
    { ingredient: "Домати", measurement: "2 бр." },
    { ingredient: "Лук", measurement: "2 бр." },
    { ingredient: "Босилек", measurement: "1 стрък" },
    { ingredient: "Зехтин", measurement: "4 с.л" },
  ];
  const daysOfWeek = [
    "Понеделник",
    "Вторник",
    "Сряда",
    "Четвъртък",
    "Петък",
    "Събота",
    "Неделя",
  ];
  return (
    <Flex direction={"column"} gap="1em" mt="4em">
      <Box position={"relative"}>
        <Image
          h={{ base: "6em", md: "10em", lg: "12em" }}
          w="100%"
          objectFit={"cover"}
          objectPosition={"0px 28%"}
          src="./images/menu.jpg"
          alt="peper"
          bottom={"0px"}
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
          fontSize={{ base: "1em", md: "1.2em", lg: "1.5em" }}
        >
          Седмично меню
        </Box>
      </Box>
      <Flex direction="column">
        {daysOfWeek.map((i) => (
          <Flex
            position={"relative"}
            flexWrap={"wrap"}
            w="90%"
            bg="gray.100"
            m="auto"
            mt="2em"
            pt="1em"
            px="1em"
          >
            <Box
              bg="rgba(251, 233, 188, 1)"
              px="1em"
              position={"absolute"}
              top="-15px"
              left="-15px"
              borderRadius={"5px"}
              fontSize={"1.2em"}
            >
              {i}
            </Box>
            <RecipeS ingredients={ingredients} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
