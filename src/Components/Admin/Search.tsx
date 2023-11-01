import React, { useState } from "react";
import { IRecipeModel } from "../../Models/IRecipeModel";
import ISearchedItem from "../../Models/ISearchedItem";
import ISearchBar from "../../Models/ISearchBar";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { accent2 } from "../../Styles/ColorPalette";
//При натискане на клавиш изпращаме написаното, ако е повече от три символа се зарежда data отвън
const Search = ({ label, pholder, onChange, color, bg }: ISearchBar) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: any) => {
    onChange(e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <Box
      borderRadius="7px"
      position="relative"
      transition="background 0.3s ease"
      w="100%"
    >
      <FormControl
        bg={bg}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="5px"
      >
        <FormLabel
          fontSize="10px"
          text-transform="uppercase"
          m="unset"
          p="0.5em"
          color="white"
          bg={color ? color : "gray"}
          htmlFor="tag-input"
          borderTopLeftRadius="5px"
          borderBottomLeftRadius="5px"
        >
          {label}
        </FormLabel>
        <Input
          border="0"
          borderRadius="5px"
          w="100%"
          px="20px"
          py="15px"
          outline="none"
          type="text"
          placeholder={pholder}
          value={searchValue}
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  );
};

export default Search;
