import { Box } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFetchAgain,
  selectSelectedChat,
} from "../../store/chat/chat.selector";
import SingleChat from "../single-chat/single-chat.component";

const ChatBox = () => {
  const selectedChat = useSelector(selectSelectedChat);

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDirection="column"
      p={3}
      bg="white"
      width={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
