import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";
import React from "react";
import { User } from "../side-drawer/side-drawer.component";

type UserBadgeItemProps = {
  user: User;
  handleFunc: () => void;
};

const UserBadgeItem = ({ user, handleFunc }: UserBadgeItemProps) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="blackAlpha"
      cursor="pointer"
      onClick={handleFunc}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
