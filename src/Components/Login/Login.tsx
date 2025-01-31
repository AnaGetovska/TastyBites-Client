import React from "react";
import ILoginRequest from "../../Models/ILoginRequest";
import {
  Box,
  Center,
  Heading,
  Image,
  FormControl,
  Input,
  FormLabel,
  VStack,
  Button,
  Link,
  Flex,
} from "@chakra-ui/react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState<ILoginRequest>({
    username: "",
    password: "",
  });
  const setAuth = useAuth().setAuth;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleChange(event: React.SyntheticEvent) {
    const { id, value } = event.target as HTMLInputElement;
    setUserData((prevData) => {
      return {
        ...prevData,
        [id]: value,
      };
    });
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetch("http://localhost:5214/api/user/authenticate", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(userData),
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((res) => res.json())
      .then((post: any) => {
        setAuth(post);
        navigate("/all-recipes");
      })
      .catch((err) => {
        return err.message;
      });
  };
  return (
    <Box
      w="100%"
      h="100%"
      bgImage="url('/images/vegetables.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      opacity="0.9"
    >
      <Center h="100%">
        <Box
          w={[
            "90%", // 0-30em
            "70%", // 30em-48em
            "55%", // 48em-62em
            "25%", // 62em+
          ]}
          bg="white"
          borderRadius="15"
        >
          <Image m="1em" w="18%" src="/images/Logo.svg" />
          <Heading
            mt="1.2em"
            as="h1"
            textAlign="center"
            fontSize="1.5em"
            mb="1em"
          >
            Влез в профила си
          </Heading>
          <Center>
            <VStack w="95%">
              <Box h="1.5em" fontSize="0.8em" color="red">
                {errorMessage}
              </Box>
              <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                  <FormLabel htmlFor="username">Потребителско име:</FormLabel>
                  <Input
                    type="text"
                    id="username"
                    placeholder="username"
                    onChange={handleChange}
                    mb="1em"
                  />
                  <FormLabel htmlFor="password">Парола:</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    placeholder="password"
                    onChange={handleChange}
                    mb="2em"
                  />
                </FormControl>
                <Center>
                  <Flex direction="column">
                    <Button
                      isLoading={isSubmitting}
                      bg="rgba(213, 236, 165, 1)"
                      type="submit"
                      mt="1em"
                    >
                      Влез
                    </Button>
                    <Link
                      onClick={(e) => navigate("/register")}
                      mt="1em"
                      mb="3em"
                    >
                      Регистрирай се
                    </Link>
                  </Flex>
                </Center>
              </form>
            </VStack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
}
