import { useState } from "react";
import "../../Styles/App.css";
import { Box, HStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
interface IStarRating {
  votes: number[];
  setRating: Function;
  position?: "static" | "relative" | "fixed" | "absolute" | "sticky";
  top?: { base: string; lg: string };
  left?: string;
  count?: number;
  size?: any;
  hideAverageRating?: boolean;
}
function StarRating({
  votes,
  setRating,
  count,
  size,
  hideAverageRating,
}: IStarRating) {
  const timesVoted = votes.length;
  const rating = Math.round(votes.reduce((a, b) => a + b, 0)) / timesVoted;
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
        {rating.toFixed(2)}/5
      </Box>
      <Box
        fontSize="0.5em"
        color="gray.500"
        position="absolute"
        top="-15px"
        right="0"
      >
        ({timesVoted})
      </Box>
      <HStack spacing="1px">
        {[...Array(count || 5)].map((star, index) => {
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
