import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";
import { User } from "../side-drawer/side-drawer.component";

type UserListItemProps = {
  user: User;
  handleFunc: () => void;
};

const UserListItem = ({ user, handleFunc }: UserListItemProps) => {
  return (
    <Box
      onClick={handleFunc}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{ bg: "#a51d2a", color: "white" }}
      display="flex"
      alignItems="center"
      width="100%"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.photo}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email:</b> {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
