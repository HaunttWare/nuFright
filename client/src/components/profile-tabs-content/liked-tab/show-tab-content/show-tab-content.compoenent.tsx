import React, {useState} from "react";

type ShowTabContentProps = {
  userLikedShows: any[];
};
import { Box, Image, Text, Grid, Tooltip } from "@chakra-ui/react";

const ShowTabContent = ({ userLikedShows }: ShowTabContentProps) => {
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
        {userLikedShows.length > 0 ? (
          userLikedShows.map((show: any) => (
            <Box key={show.id}>
              <Tooltip label="Show show description" placement="top">
              <Image
                src={show.images}
                alt={show.title}
                borderRadius="lg"
                height="300px"
                width="300px"
                onClick={() => handleShowDescription(show.id)}
              />
              </Tooltip>
              <Text fontSize="xl" fontWeight="bold" color="white">
                {show.title}
              </Text>
              {showDescription && showDescriptionId === show.id ? (
                <Text color="white">{show.description}</Text>
              ) : null}
            </Box>
          ))
        ) : (
          <Text textAlign="center" fontSize="2xl" fontWeight="bold">
            You have no liked shows
          </Text>
        )}
      </Grid>
    </Box>
  );
};

export default ShowTabContent;
