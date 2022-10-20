import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChatData,
  setChats,
  setSelectedChat,
} from "../../store/chat/chat.action";
import {
  selectChats,
  selectFetchAgain,
  selectSelectedChat,
} from "../../store/chat/chat.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { AddIcon } from "@chakra-ui/icons";
import { Box, useToast, Button, Stack, Text } from "@chakra-ui/react";
import ChatLoading from "../chat-loading/chat-loading.component";
import { getSenderName } from "../../config/chatLogics";
import GroupChatModal from "../groupchat-modal/groupchat-moda.component";

const MyChats = () => {
  const currentUser = useSelector(selectCurrentUser);
  const chats = useSelector(selectChats);
  const selectedChat = useSelector(selectSelectedChat);
  const fetchAgain = useSelector(selectFetchAgain)
  const dispatch = useDispatch();

  const [loggedUser, setLoggedUser] = useState(null);

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const { data } = await axios.get("/api/chat/", {
        params: {
          currentUserId: currentUser.id,
        },
      });
      console.log(data);
      dispatch(setChats(data));
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Failed to load chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      setLoggedUser(currentUser);
      fetchChats();
    }
  }, [currentUser, fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bg="white"
      width={{ base: "100%", md: "30%" }}
      borderRadius="lg"
      boxShadow="md"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
        <Button
          display="flex"
          fontSize={{ base: "18px", md: "20px", lg: "18px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>

        </GroupChatModal>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bg="#f5f5f5"
        width="100%"
        height="100%"
        borderRadius="lg"
        overflow="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat: ChatData) => (
              <Box
                onClick={() => dispatch(setSelectedChat(chat))}
                cursor="pointer"
                bg={
                  selectedChat && selectedChat.id === chat.id
                    ? "#e5e5e5"
                    : "white"
                }
                color={
                  selectedChat && selectedChat.id === chat.id
                    ? "black"
                    : "gray.500"
                }
                p={3}
                py={2}
                borderRadius="lg"
                key={chat.id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSenderName(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
