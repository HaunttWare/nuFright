import React, {useState} from "react";

type MovieTabContentProps = {
  userLikedMovies: any;
};

import { Box, Image, Text, Grid, Tooltip } from "@chakra-ui/react";

const MovieTabContent = ({ userLikedMovies }: MovieTabContentProps) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showDescriptionId, setShowDescriptionId] = useState("");

  const handleShowDescription = (id: string) => {
    setShowDescriptionId(id);
    if (showDescriptionId === id) {
      setShowDescription(!showDescription);
    }
  };


  return (
    <Box>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {userLikedMovies.length > 0 ? (
          userLikedMovies.map((movie: any) => (
            <Box key={movie.id}>
              <Tooltip label="Show movie description" placement="top">
              <Image
                src={movie.images}
                alt={movie.title}
                borderRadius="lg"
                height="300px"
                width="300px"
                onClick={() => handleShowDescription(movie.id)}
              />
              </Tooltip>
              <Text fontSize="xl" fontWeight="bold" color="white">
                {movie.title}
              </Text>
              {showDescription && showDescriptionId === movie.id ? (
                <Text color="white">{movie.description}</Text>
              ) : null}
            </Box>
          ))
        ) : (
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">
            You have no liked movies
          </Text>
        )}
      </Grid>
    </Box>
  );
};

export default MovieTabContent;
