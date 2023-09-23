import React from "react";
import "../../App.css";
import { Box, Flex, Image } from "@chakra-ui/react";
import Sidebar from "../Layout/Filter";

function RecipeM() {
  return (
    <Flex h="100%" direction="row">
      <Sidebar />
      <Flex
        bg="yellow.100"
        w={[
          "100%", // 0-30em
          "50%", // 30em-48em
          "25%", // 48em-62em
          "15%", // 62em+
        ]}
        h="20em"
      >
        <Image
          h="10em"
          w="100%"
          src="./images/chicken-rice.png"
          alt="Chicken meal"
          fit="cover"
        />
      </Flex>
    </Flex>
  );
}

export default RecipeM;
