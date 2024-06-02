import {
    Box,
    Button,
    Flex,
    Tab,
    TabList,
    TabPanel,
    Divider,
    TabPanels,
    Tabs,
    Tag,
} from "@chakra-ui/react";
import ApiService from "../Services/ApiService";
import { useEffect, useState } from "react";
import { IRecipeModel } from "../../Models/IRecipeModel";
import { accent1, accent2 } from "../../Styles/ColorPalette";
import RecipeM from "../Recipes/RecipeM";
import Search from "./Search";
import IIngredientModel from "../../Models/IIngredientModel";
import ICategoryModel from "../../Models/ICategoryModel";
import _ from "lodash";

export default function AdminMain() {
    const [allRecipes, setAllRecipes] = useState<IRecipeModel[]>();
    const [searchRecipeString, setSearchRecipeString] = useState<string>("");
    const [allIngredients, setAllIngredients] = useState<IIngredientModel[]>();
    const [searchIngredientString, setSearchIngredientString] = useState<string>("");
    const [allCategories, setAllCategories] = useState<ICategoryModel[]>();

    useEffect(() => {
        ApiService.getAllCategories().then(categories => {
            const sorted = _.sortBy(categories, "name");
            setAllCategories(sorted);
        })
    }, [])

    useEffect(() => {
        if (searchRecipeString.length >= 3) {
            ApiService.getAllRecipesByWildcard(searchRecipeString).then((recipes) =>
                setAllRecipes(recipes)
            );
        }
    }, [searchRecipeString]);

    const setRecipeSearchValue = (searchString: string) => {
        setSearchRecipeString(searchString);
    };

    useEffect(() => {
        if (searchIngredientString.length >= 3) {
            ApiService.getAllIngredientsByWildcard(searchIngredientString).then((ingredients) =>
                setAllIngredients(ingredients)
            );
        }
    }, [searchIngredientString]);

    const setIngredientSearchValue = (searchString: string) => {
        setSearchIngredientString(searchString);
    };
    return (
        <>
            <Tabs colorScheme="green" mt="4em">
                <TabList>
                    <Tab>Рецепти</Tab>
                    <Tab>Продукти</Tab>
                    <Tab>Категории</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Flex direction="column">
                            <Flex direction="row" gap="1em">
                                <Button bg={accent1} px="2.5em" as="a" href="add-recipe">
                                    Добави рецепта +
                                </Button>
                                <Box w={{ base: "100%", md: "30%" }}>
                                    <Search
                                        label="Намери рецепта"
                                        pholder="Име на рецепта..."
                                        onChange={setRecipeSearchValue}
                                        bg="rgb(207 219 176)"
                                        color={accent2}
                                    />
                                </Box>
                            </Flex>
                            <Flex mt="2em">
                                {searchRecipeString.length >= 3 &&
                                    allRecipes?.map((r) => <RecipeM key={r._key} recipe={r} />)}
                            </Flex>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column">
                            <Flex direction="row" gap="1em">
                                <Button bg={accent1} px="2.5em" as="a" href="add-ingredient">
                                    Добави продукт +
                                </Button>
                                <Box w={{ base: "100%", md: "30%" }}>
                                    <Search
                                        label="Намери продукт"
                                        pholder="Име на продукт..."
                                        onChange={setIngredientSearchValue}
                                        bg="rgb(207 219 176)"
                                        color={accent2}
                                    />
                                </Box>
                            </Flex>
                            <Flex mt="2em">
                                {searchIngredientString.length >= 3 &&
                                    allIngredients?.map((i) => <Box key={i._key}>{i.name}</Box>)}
                            </Flex>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex direction="column" justifyContent="start" gap="1em">
                            <Button w="15em" bg={accent1} px="2.5em" as="a" href="add-category">
                                Добави категория +
                            </Button>
                            <Box textAlign="start" fontWeight="500">
                                Всички категории:
                            </Box>
                            <Flex flexWrap="wrap" gap="1em">
                            {allCategories?.map((c) => <Tag >{c.name}</Tag>)}
                            </Flex>
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}
