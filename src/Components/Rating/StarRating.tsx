import { useState } from "react";
import "../../Styles/App.css";
import { Box, HStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
interface IStarRating {
  ratingCount: number;
  rating: number;
  setRating: Function;
  position?: "static" | "relative" | "fixed" | "absolute" | "sticky";
  top?: { base: string; lg: string };
  left?: string;
  starsCount?: number;
  size?: any;
  hideAverageRating?: boolean;
}
function StarRating({
  ratingCount,
  rating,
  setRating,
  starsCount,
  size,
  hideAverageRating,
}: IStarRating) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Box position="relative">
      <Box
        display={hideAverageRating ? "none" : "flex"}
        fontSize="0.5em"
        color="gray.500"
        position="absolute"
        top="-15px"
        left="0"
      >
        {rating + "/5"}
      </Box>
      <Box
        fontSize="0.5em"
        color="gray.500"
        position="absolute"
        top="-15px"
        right="0"
      >
        ({ratingCount})
      </Box>
      <HStack spacing="1px">
        {[...Array(starsCount || 5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <Box
              as="label"
              key={index}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setRating(ratingValue)}
            >
              <FaStar cursor={"pointer"} size={size || 10} />
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}

export default StarRating;
