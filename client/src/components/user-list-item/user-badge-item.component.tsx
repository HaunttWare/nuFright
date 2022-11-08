import React from "react";

import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";

import { User } from "../my-chats/my-chats.component";

type UserBadgeItemProps = {
  user: User;
  admin?: string;
  handleFunc: () => void;
};

const UserBadgeItem = ({ user, handleFunc, admin }: UserBadgeItemProps) => {
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
      {admin === user.id && <span> ( Admin ) </span>}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
