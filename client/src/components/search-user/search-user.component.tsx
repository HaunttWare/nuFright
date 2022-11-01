import React from "react";

import { Box } from "@chakra-ui/layout";
import { Button, Tooltip, Text } from "@chakra-ui/react";

type SearchUserProps = {
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchUser = ({ setIsSearching, isSearching }: SearchUserProps) => {
  return (
    <>
      <Box
        display={{ base: "flex", md: "flex" }}
        flexDirection={{ base: "row", md: "column" }}
        alignItems={{ base: "center", md: "flex-start" }}
        justifyContent={{ base: "space-between", md: "flex-start" }}
        width="80%"
      >
        <Text
          fontSize={{ base: "20px", md: "22px" }}
          fontWeight="bold"
          color="gray.700"
          display={isSearching ? "none" : "block"}
        >
          My Chats
        </Text>
        <Tooltip
          label={isSearching ? "Click to go back" : "Search Users to chat"}
          hasArrow
          placement="bottom-end"
        >
          <Button
            variant="ghost"
            onClick={() => setIsSearching(!isSearching)}
            size={{ base: "md", md: "sm" }}
          >
            {isSearching ? (
              // back arrow
              <i className="fas fa-arrow-left"></i>
            ) : (
              // search icon
              <i className="fas fa-search"></i>
            )}
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

export default SearchUser;
