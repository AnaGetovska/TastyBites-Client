import "../../App.css";
import { Box, Flex, Button } from "@chakra-ui/react";
import CategoryService from "../Services/CategoryService";
import * as _ from "lodash";
import { useEffect, useState } from "react";
import ICategoryModel from "../../Models/ICategoryModel";
import useFilter from "../../Hooks/useFilter";
import { CloseIcon } from "@chakra-ui/icons";

function CategoryTag(props: any) {
  const [category, setCategory] = useState<ICategoryModel>();
  const key: string = props.categoryKey;
  const { removeKey } = useFilter();
  useEffect(() => {
    CategoryService.getByKey(key).then((cat) => {
      setCategory(cat);
    });
  }, []);

  const handleClick = () => {
    removeKey(category?._key);
  };

  return (
    <Button
      onClick={handleClick}
      position="relative"
      px="1em"
      h="2em"
      fontSize="0.8em"
      bg="gray.100"
    >
      {category?.name}
      <CloseIcon
        m="0.5em"
        position="absolute"
        boxSize={1.5}
        top="-0.5px"
        right="-2px"
      />
    </Button>
  );
}

export default CategoryTag;
