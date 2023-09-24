import {
  Checkbox,
  Flex,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import ICategoryModel from "../../Models/ICategoryModel";
import { useState } from "react";
import useFilter from "../../Hooks/useFilter";

const CategoryContainer = (props: any) => {
  const title: string = props.title;
  const values: ICategoryModel[] = props.values;
  const bg: string = props.bg;
  const isMobile: boolean = props.isMobile;
  const { filter, addKey, removeKey } = useFilter();

  function handleChange(e: any): void {
    const { value, checked } = e.target;
    if (checked) {
      addKey(value);
    } else {
      removeKey(value);
    }
  }

  function isChecked(key: string): boolean {
    return filter.indexOf(key) !== -1;
  }

  const showValues = values.map((v) => (
    <Flex key={v._key}>
      <Checkbox
        key={v._key}
        onChange={handleChange}
        isChecked={isChecked(v._key)}
        border="gray"
        colorScheme="green"
        iconColor="white.400"
        size="sm"
        pr="0.6em"
        value={v._key}
      >
        {v.name}
      </Checkbox>
    </Flex>
  ));

  if (isMobile === true) {
    return (
      <AccordionItem bg={bg}>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{showValues}</AccordionPanel>
      </AccordionItem>
    );
  }

  return (
    <Flex
      direction="column"
      bg={bg}
      m="0.5em"
      borderRadius="8"
      p="0.5em"
      pl="1em"
      fontSize="0.8em"
    >
      <Flex
        direction="column"
        w="100%"
        textAlign="center"
        borderBottom="1px solid black"
        fontWeight="500"
      >
        {title}
      </Flex>
      {showValues}
    </Flex>
  );
};

export default CategoryContainer;
