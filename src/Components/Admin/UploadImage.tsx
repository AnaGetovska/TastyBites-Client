import {
  AspectRatio,
  Box,
  BoxProps,
  Container,
  forwardRef,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { LiaImage } from "react-icons/lia";

export default function UploadImage() {
  const [uploadedImage, setUploadedImage] = useState("");
  return (
    <Container>
      <Box
        h="10em"
        w="15em"
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
        <Box position="relative" height="100%" width="100%">
          <Box
            position="absolute"
            top="40px"
            left="0"
            height="100%"
            width="100%"
            display="flex"
            flexDirection="column"
          >
            <VStack>
              <LiaImage size="20"></LiaImage>
              <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                Click to upload
              </Heading>
              <Text fontWeight="light">recipe images</Text>
            </VStack>
          </Box>
          <Input
            type="file"
            h="100%"
            w="100%"
            top="0"
            left="0"
            opacity="0"
            aria-hidden="true"
            accept="image/*"
          />
        </Box>
      </Box>
    </Container>
  );
}
