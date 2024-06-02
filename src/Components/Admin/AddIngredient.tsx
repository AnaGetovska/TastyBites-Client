import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function AddIngredient(props: any) {
  const form = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = new FormData(form?.current || undefined);

    try {
      let res = await fetch("http://localhost:5214/api/ingredient/add", {
        method: "POST",
        body: payload,
      });
      await res.json();
    } catch (err) {}
  };

  return (
    <Flex direction="column" w="50%" m="auto" mt="5em">
      <Box fontSize="1.5em">Създай нов продукт</Box>
      <form ref={form} method="post" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Име на продукт</FormLabel>
          <Input isRequired type="text" name="Name" />
        </FormControl>
        <FormControl>
          <FormLabel>Описание</FormLabel>
          <Input type="text" name="Description"></Input>
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </Flex>
  );
}
