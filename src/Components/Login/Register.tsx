import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IRegisterRequest from "../../Models/IRegisterRequest";
import { isVisible } from "@testing-library/user-event/dist/utils";

export default function Register() {
  const navigate = useNavigate();
  const [userData, setUserData] = React.useState<IRegisterRequest>({
    username: "",
    password: "",
    password2: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isVisible, setIsVisible] = useState(false);

  function handleChange(event: React.SyntheticEvent) {
    const { id, value } = event.target as HTMLInputElement;
    setUserData((prevData) => {
      return {
        ...prevData,
        [id]: value,
      };
    });
    console.log(userData);
    //Fix error feedback
    if (userData.password === userData.password2) {
      setIsVisible(false);
      setErrorMessage("");
    }

    if (userData.password !== userData.password2) {
      setErrorMessage("Паролите не съвпадат.");
      setIsVisible(true);
    }
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (userData.password !== userData.password2) {
      return;
    }
    const payload = {
      username: "",
      password: "",
      email: "",
    };
    payload.username = userData.username;
    payload.password = userData.password;
    payload.email = userData.email;
    fetch("http://localhost:5214/api/user/register", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(payload),
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((res) => res.json())
      .then((post: any) => {
        navigate("/login");
      })
      .catch((err) => {
        return err.message;
      });
  };
  return (
    <>
      <Box
        w="100%"
        h="100%"
        bgImage="url('/images/on-register.jpg')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        opacity="0.9"
      >
        <Center h="100%">
          <Box w={["100%", "70%", "55%", "25%"]} bg="white" borderRadius="15">
            <Box
              display={{ base: "flex", md: "none" }}
              h={{ base: "100%", md: "none" }}
              bgImage="url('/images/on-register.jpg')"
              bgPosition="center"
              bgRepeat="no-repeat"
              bgSize="cover"
            >
              <Image m="1em" w="18%" src="/images/Logo.svg" />
              <Heading
                mt="1.2em"
                as="h1"
                textAlign="center"
                fontSize="1.5em"
                mb="1em"
                opacity="0.7"
              >
                Добре дошъл!
              </Heading>
              <Heading
                mt="1.2em"
                as="h3"
                textAlign="center"
                fontSize="1.2em"
                mb="1em"
                px="1em"
              >
                Създай своят профил в няколко лесни стъпки
              </Heading>
            </Box>
            <Center>
              <VStack w="95%">
                <Box h="1.5em" fontSize="0.8em" color="red">
                  {isVisible && errorMessage}
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
                      mb="1em"
                    />
                    <FormLabel htmlFor="password">Повтори паролата:</FormLabel>
                    <Input
                      type="password"
                      id="password2"
                      placeholder="password again"
                      onChange={handleChange}
                      mb="1em"
                    />
                    <FormLabel htmlFor="password">Имейл адрес:</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      placeholder="email"
                      onChange={handleChange}
                      mb="2em"
                    />
                  </FormControl>
                  <Center>
                    <Button
                      isLoading={isSubmitting}
                      bg="rgba(213, 236, 165, 1)"
                      type="submit"
                      mb="3em"
                    >
                      Регистрирай се
                    </Button>
                  </Center>
                </form>
              </VStack>
            </Center>
          </Box>
        </Center>
      </Box>
    </>
  );
}
