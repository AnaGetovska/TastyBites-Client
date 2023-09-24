import "../../App.css";
import { Flex } from "@chakra-ui/react";
import Filter from "../Layout/Filter";
import * as _ from "lodash";

function AllRecipes() {
  return (
    <Flex h="100%" direction={{ base: "column", md: "row" }}>
      <Filter />
    </Flex>
  );
}

export default AllRecipes;
