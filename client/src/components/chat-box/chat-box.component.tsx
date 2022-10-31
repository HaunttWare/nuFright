import React from "react";

import { useSelector } from "react-redux";
import { selectSelectedChat } from "../../store/chat/chat.selector";

import { Box } from "@chakra-ui/react";

import SingleChat from "../single-chat/single-chat.component";

const ChatBox = ({
  socket,
  socketConnected,
  setSelectedChatCompare,
  selectedChatCompare,
}: any) => {
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
      <SingleChat
        socket={socket}
        socketConnected={socketConnected}
        selectedChatCompare={selectedChatCompare}
        setSelectedChatCompare={setSelectedChatCompare}
      />
    </Box>
  );
};

export default ChatBox;
