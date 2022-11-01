import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

import { Box } from "@chakra-ui/layout";

import MyChats from "../../components/my-chats/my-chats.component";
import ChatBox from "../../components/chat-box/chat-box.component";

const Chat = ({ socket, socketConnected, setSelectedChatCompare, selectedChatCompare }: any) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div style={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        p="10px"
      >
        {!currentUser && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <h1 style={{ color: "white" }}>Please log in to access the chat</h1>
          </Box>
        )}
        {currentUser && <MyChats />}
        {currentUser && (
          <ChatBox
            socket={socket}
            socketConnected={socketConnected}
            selectedChatCompare={selectedChatCompare}
            setSelectedChatCompare={setSelectedChatCompare}
          />
        )}
      </Box>
    </div>
  );
};

export default Chat;
