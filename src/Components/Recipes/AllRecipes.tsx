import "../../App.css";
import { Box, Flex } from "@chakra-ui/react";
import Filter from "../Layout/Filter";
import useFilter from "../../Hooks/useFilter";

function AllRecipes() {
  const filteredItems = useFilter().filter;
  return (
    <Flex h="100%" direction={{ base: "column", md: "row" }}>
      <Filter />
      {filteredItems?.map((item) => (
        <Box key={item}>{item}</Box>
      ))}
      <Box className="all-recipes">all recipes</Box>
    </Flex>
  );
}

export default AllRecipes;
