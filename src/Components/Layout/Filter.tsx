import {
  Box,
  Flex,
  Button,
  Link,
  useColorModeValue,
  Collapse,
  Stack,
  Accordion,
} from "@chakra-ui/react";
import CategoryContainer from "../Recipes/CategoryContainer";
import ICategoryFilter from "../../Models/ICategoryFilter";
import { NavLink as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryService from "../Services/CategoryService";
import * as _ from "lodash";
import { CategoryType } from "../../Models/CategoryType";
import useFilter from "../../Hooks/useFilter";
import CategoryTag from "../Recipes/CategoryTag";

const CategoryData: ICategoryFilter[] = [
  {
    key: "Cuisine",
    title: "Кухня",
    categories: [],
  },
  {
    key: "Course",
    title: "Вид ястие",
    categories: [],
  },
  {
    key: "Diet",
    title: "Диета",
    categories: [],
  },
];

const Filter = (props: any) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    CategoryService.getAll()
      .then((categories) => {
        const groupedData = _.groupBy(categories, (c) => {
          return CategoryType[c.type];
        });

        const cuisine = _.find(CategoryData, { title: "Кухня" });
        if (cuisine) {
          cuisine.categories = groupedData?.Cuisine || [];
        }

        const diet = _.find(CategoryData, { title: "Диета" });
        if (diet) {
          diet.categories = groupedData?.Diet || [];
        }

        const course = _.find(CategoryData, { title: "Вид ястие" });
        if (course) {
          course.categories = groupedData?.Course || [];
        }
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  if (isLoaded) {
    return (
      <>
        <DesktopFilter />
        <MobileFilter />
      </>
    );
  }
  return <></>;
};

const DesktopFilter = () => {
  return (
    <>
      <Flex
        position="sticky"
        top="65px"
        display={{ base: "none", md: "flex" }}
        direction="column"
        className="sidebar"
        bg="rgba(249, 249, 249, 1)"
        w={{ md: "24%", lg: "20%", xl: "15%" }}
        h="100%"
      >
        <Box
          mt="0.5em"
          fontSize={{ base: "0.5em", md: "0.8em", lg: "1em" }}
          fontWeight="500"
        >
          Всички рецепти
        </Box>
        <Link as={RouterLink} to="/fridge-filter">
          <Button
            w="95%"
            bg="rgba(213, 236, 165, 1)"
            ml="auto"
            mr="auto"
            mt="1em"
            fontSize="0.8em"
          >
            Какво имам в хладилника?
          </Button>
        </Link>
        {FillCategory(CategoryData, false, "rgba(251, 233, 188, 1)")}
      </Flex>
    </>
  );
};
const MobileFilter = () => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const filteredItems = useFilter().filter;
  return (
    <Flex
      position="sticky"
      top="65px"
      py="0.5em"
      display={{ base: "flex", md: "none" }}
      direction="column"
      bg="white"
    >
      {/* <Link as={RouterLink} to="/fridge-filter">
        <Button mx="1em" w="70%" bg="rgba(213, 236, 165, 1)" fontSize="0.8em">
          Какво имам в хладилника?
        </Button>
      </Link> */}
      <Button
        fontSize={"0.8em"}
        h="2.2em"
        m="auto"
        w={{ base: "70%" }}
        onClick={handleToggle}
      >
        Филтър
      </Button>
      <Collapse in={show} animateOpacity>
        <Stack
          bg={useColorModeValue("white", "gray.800")}
          w="70%"
          m="auto"
          py={1}
        >
          <Accordion allowToggle>
            {FillCategory(CategoryData, true, "gray.100")}
          </Accordion>
        </Stack>
      </Collapse>
      <Flex mt="0.5em" justifyContent="center" gap="2" flexWrap="wrap">
        {filteredItems?.map((item) => (
          <CategoryTag
            fontSize="0.7em"
            categoryKey={item}
            key={item}
          ></CategoryTag>
        ))}
      </Flex>
    </Flex>
  );
};

function FillCategory(
  categoryData: ICategoryFilter[],
  isMobile: boolean,
  bgColor: string
) {
  return categoryData.map((c: ICategoryFilter) => {
    return (
      <CategoryContainer
        title={c.title}
        values={c.categories}
        bg={bgColor}
        isMobile={isMobile}
        key={c.key}
      />
    );
  });
}

export default Filter;
