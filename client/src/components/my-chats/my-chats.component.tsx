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

import { getSenderName } from "../../config/chatLogics";

import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  useToast,
  Button,
  Stack,
  Text,
  Tooltip,
  Input,
  Spinner,
} from "@chakra-ui/react";

import ChatLoading from "../chat-loading/chat-loading.component";
import GroupChatModal from "../groupchat-modal/groupchat-moda.component";
import UserListItem from "../user-list-item/user-list-item.component";
import SearchUser from "../search-user/search-user.component";

export type User = {
  id: string;
  name: string;
  email: string;
  photo: string;
  createdAt: string;
};

const MyChats = () => {
  const currentUser = useSelector(selectCurrentUser);
  const chats = useSelector(selectChats);
  const selectedChat = useSelector(selectSelectedChat);
  const fetchAgain = useSelector(selectFetchAgain);
  const dispatch = useDispatch();

  const [loggedUser, setLoggedUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const toast = useToast();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/", {
        params: {
          search,
          currentUserId: currentUser.id,
        },
      });
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId: string) => {
    try {
      setLoadingChat(true);
      const { data } = await axios.post("/api/chat/", {
        userId,
        currentUserId: currentUser.id,
      });

      if (!chats.find((chat: ChatData) => chat.id === data.id)) {
        setChats([data, ...chats]);
      }

      dispatch(setSelectedChat(data));
      setLoadingChat(false);
      setIsSearching(false);
    } catch (error: any) {
      toast({
        title: "Error fetching chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const fetchChats = async () => {
    try {
      const { data } = await axios.get("/api/chat/", {
        params: {
          currentUserId: currentUser.id,
        },
      });

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
      width={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      boxShadow="md"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <SearchUser isSearching={isSearching} setIsSearching={setIsSearching} />

        <GroupChatModal>
          <Tooltip label="Create Group Chat" hasArrow placement="bottom-end">
            <Button
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
              display={isSearching ? "none" : "flex"}
            >
              <Text
                display={{ base: "none", lg: "flex" }}
                fontSize={{ base: "16px", md: "12px" }}
              >
                New Group Chat
              </Text>
            </Button>
          </Tooltip>
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
        {isSearching ? (
          <>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResults?.map((user) => (
                <UserListItem
                  key={user.id}
                  user={user}
                  handleFunc={() => accessChat(user.id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </>
        ) : chats ? (
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
                px={3}
                py={2}
                borderRadius="lg"
                key={chat.id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSenderName(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
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
