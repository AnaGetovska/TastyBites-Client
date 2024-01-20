import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  VStack,
  Image,
  Textarea,
  Tag,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Select,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { LiaImage } from "react-icons/lia";
import ApiService from "../Services/ApiService";
import IIngredientModel from "../../Models/IIngredientModel";
import Search from "./Search";
import _ from "lodash";
import IRecipeRequest from "../../Models/IRecipeRequest";
import IIngredientRequest from "../../Models/IIngredientRequest";
import ICategoryModel from "../../Models/ICategoryModel";
import CategoryService from "../Services/CategoryService";

export default function EditRecipe(props: any) {
  const form = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState<IRecipeRequest>({
    _key: "",
    _rev: "",
    _id: "",
    name: "",
    preparationTime: 0,
    portions: 0,
    description: "",
    displayImage: undefined,
    ingredients: [],
    categories: [],
    allergensKeys: [],
  });
  const [file, setFile] = useState<File | undefined>();
  const [suggestedIngredients, setSuggestedIngredients] = useState<
    IIngredientModel[]
  >([]);
  const [searchString, setSearchString] = useState<string>("");
  const [recipeIngredients, setRecipeIngredients] = useState<
    IIngredientRequest[]
  >([]);
  const [categories, setCategories] = useState<ICategoryModel[]>();
  const [recipeCategories, setRecipeCategories] = useState<ICategoryModel[]>();

  const setSearchValue = (searchString: string) => {
    setSearchString(searchString);
  };

  useEffect(() => {
    if (searchString.length >= 2) {
      ApiService.getAllIngredientsByNameCut(searchString).then((ingredients) =>
        setSuggestedIngredients(ingredients)
      );
    }
  }, [searchString]);

  useEffect(() => {
    CategoryService.getAll().then((categories) => setCategories(categories));
  });
  console.log(categories);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      ["displayImage"]: file,
      ["categories"]: recipeCategories,
    }));
    const payload = new FormData(form?.current || undefined);

    try {
      let res = await fetch("http://localhost:5214/api/recipe/add", {
        method: "POST",
        body: payload,
      });
      let resJson = await res.json();
      console.log(resJson);
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(e: any) {
    const { name, value } = e.target;
    if (name === "DisplayImage") {
      const target = e.target as HTMLInputElement & {
        files: FileList;
      };
      setFile(target.files[0]);
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function addIngredient(i: IIngredientModel): void {
    if (recipeIngredients.length === 0 || recipeIngredients[0].name === "") {
      let newArray = [];
      if (i._key !== undefined) {
        let newIngredient: IIngredientRequest = {
          _key: i._key,
          name: i.name,
          quantity: "",
          measurementUnit: "",
        };
        newArray.push(newIngredient);
      }
      setRecipeIngredients(newArray);
    } else {
      if (i._key !== undefined) {
        let newIngredient: IIngredientRequest = {
          _key: i._key,
          name: i.name,
          quantity: "",
          measurementUnit: "",
        };
        setRecipeIngredients((previousState) => {
          if (
            !_.find(previousState, (i) => {
              return i._key === newIngredient._key;
            })
          ) {
            return [...previousState, newIngredient];
          }
          return previousState;
        });
      }
    }
  }

  function removeIngredient(name: string): void {
    setRecipeIngredients((current) =>
      current.filter((ing) => {
        return ing.name !== name;
      })
    );
  }

  function modifyIngredientState(
    state: any,
    key: string,
    property: string,
    value: any
  ) {
    _.find(state, (i) => {
      if (i._key === key) {
        i[property] = value;
      }
    });
    return state;
  }

  function addQuantity(ingKey: string, e: any) {
    const quantity: string = e.target.value;
    setRecipeIngredients((prev) =>
      modifyIngredientState(prev, ingKey, "quantity", quantity)
    );
  }

  function addMeasurementUnit(ingKey: string, e: any): void {
    const measurementUnit: string = e.target.value;
    setRecipeIngredients((prev) =>
      modifyIngredientState(prev, ingKey, "measurementUnit", measurementUnit)
    );
  }

  function onChangeCategory(category: ICategoryModel): void {
    let currentCategories = [];
    if (recipeCategories === undefined) {
      currentCategories.push(category);
    } else {
      let currentCategories: ICategoryModel[] = recipeCategories;
      currentCategories.push(category);
    }
    //FIX Categories
    console.log(currentCategories);
    setRecipeCategories(currentCategories);
  }

  return (
    <Flex direction="column" w="50%" m="auto" mt="5em">
      <Box fontSize="1.5em">Създай нова рецепта</Box>
      <form ref={form} method="post" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Заглавие</FormLabel>
          <Input isRequired type="text" name="Name" onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Порции</FormLabel>
          <Input type="number" onChange={handleChange} name="Portions"></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Време за приготвяне</FormLabel>
          <Input
            type="number"
            name="PreparationTime"
            onChange={handleChange}
          ></Input>
          <FormHelperText>Времето се измерва в минути.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Начин на приготвяне</FormLabel>
          <Textarea name="Description" onChange={handleChange}></Textarea>
          <FormHelperText>
            Подробно описание на всички стъпки в рецептата.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Необходими продукти</FormLabel>
          <Search
            label="Търси продукти"
            pholder="Име на продукт..."
            onChange={setSearchValue}
            color="#1A202C"
            bg="gray.100"
          />
          <Box h="5em">
            <Flex direction="row" mt="1em" gap="1em">
              {searchString.length >= 2 &&
                suggestedIngredients?.map((i) => (
                  <Tag
                    _hover={{ bg: "gray.200", cursor: "pointer" }}
                    key={i._key}
                    onClick={(e) => addIngredient(i)}
                  >
                    {i.name}
                  </Tag>
                ))}
            </Flex>
          </Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Продукт</Th>
                  <Th>Количество</Th>
                  <Th isNumeric>Мерна единица</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recipeIngredients.map((i) => (
                  <Tr>
                    <Td>{i.name}</Td>
                    <Td onChange={(e) => addQuantity(i._key, e)}>
                      <Input type="text" />
                    </Td>
                    <Td w="25%">
                      <Select
                        onChange={(e) => addMeasurementUnit(i._key, e)}
                        placeholder="Select option"
                      >
                                <option value="с.л.">с.л.</option>
                        <option value="ч.л.">ч.л.</option>
                        <option value="ч.ч.">ч.ч.</option>
                        <option value="к.ч.">к.ч.</option>
                                <option value="с.л.">бр.</option>
                        <option value="щипка/и">щипка/и</option>
                        <option value="гр.">гр.</option>
                        <option value="кг.">кг.</option>
                        <option value="л.">л.</option>
                        <option value="мл.">мл.</option>
                      </Select>
                    </Td>
                    <Td onClick={(e) => removeIngredient(i.name)}>X</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <FormHelperText>
              Добави всички продукти необходими за рецептата.
            </FormHelperText>
          </TableContainer>
        </FormControl>
        <FormControl>
          <FormLabel>Свързани категории</FormLabel>
          <Flex flexWrap="wrap" my="1em" direction="row">
            {categories?.map((c) => (
              <Tag
                m="0.5em"
                _hover={{ bg: "gray.200", cursor: "pointer" }}
                key={c._key}
                onClick={(e) => onChangeCategory(c)}
              >
                {c.name}
              </Tag>
            ))}
          </Flex>
          <Divider />
          <Flex flexWrap="wrap" my="1em" direction="row">
            {recipeCategories?.map((c) => (
              <Box>{c.name}</Box>
            ))}
          </Flex>
        </FormControl>
        <FormControl>
          <Box
            position="relative"
            height="10em"
            width="15em"
            borderColor="gray.300"
            borderStyle="dashed"
            borderWidth="2px"
            rounded="md"
            shadow="sm"
            role="group"
            _hover={{
              shadow: "md",
            }}
          >
            <Box
              position="absolute"
              top="40px"
              left="0"
              height="100%"
              width="100%"
              display="flex"
              flexDirection="column"
            >
              {file === undefined ? (
                <VStack
                  position="absolute"
                  top="0"
                  left="0"
                  height="100%"
                  width="100%"
                  display="flex"
                >
                  <LiaImage size="20"></LiaImage>
                  <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                    Click to upload
                  </Heading>
                  <Box>recipe images</Box>
                </VStack>
              ) : (
                <Box>
                  <Image
                    objectFit="cover"
                    position="relative"
                    top="-10"
                    h="10em"
                    w="15em"
                    borderRadius="5px"
                    src={URL.createObjectURL(file)}
                  />
                </Box>
              )}
            </Box>
            <Input
              h="100%"
              w="100%"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              type="file"
              name="DisplayImage"
              onChange={handleChange}
            />
          </Box>
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Flex>
  );
}
