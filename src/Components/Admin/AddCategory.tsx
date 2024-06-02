import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function AddCategory(props: any) {
  const form = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = new FormData(form?.current || undefined);

    try {
      let res = await fetch("http://localhost:5214/api/category/add", {
        method: "POST",
        body: payload,
      });
      await res.json();
    } catch (err) {}
  };

  return (
    <Flex direction="column" w="50%" m="auto" mt="5em">
      <Box fontSize="1.5em">Създай нова категория</Box>
      <form ref={form} method="post" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Име на категория</FormLabel>
          <Input isRequired type="text" name="Name" />
        </FormControl>
        <FormControl>
          <FormLabel>Тип категория</FormLabel>
          <Select name="Type">
            <option value="0">Кухня</option>
            <option value="1">Диета</option>
            <option value="2">Вид ястие - предястие, основно и т.нт.</option>
            <option value="3">Алерген</option>
          </Select>
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
