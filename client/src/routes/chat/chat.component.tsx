import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

import { Box } from "@chakra-ui/layout";

import SideDrawer from "../../components/side-drawer/side-drawer.component";
import MyChats from "../../components/my-chats/my-chats.component";
import ChatBox from "../../components/chat-box/chat-box.component";

const Chat = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div style={{ width: "100%" }}>
      {currentUser && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        p="10px"
      >
        {currentUser && <MyChats />}
        {currentUser && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chat;
