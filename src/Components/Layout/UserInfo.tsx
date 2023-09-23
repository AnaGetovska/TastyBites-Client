import { Box, Avatar, Flex } from "@chakra-ui/react";

const UserInfo = () => {
  return (
    <Flex direction="row">
      <Box
        fontSize={{ base: "4px", md: "4px", lg: "0.8em" }}
        w="7em"
        m="auto"
        bg="yellow.100"
        position="absolute"
        z-index="1"
      >
        Ana Cherkasova
      </Box>
      <Avatar
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
        _hover={{
          textDecoration: "none",
          opacity: "0.6",
        }}
      />
    </Flex>
  );
};

export default UserInfo;
