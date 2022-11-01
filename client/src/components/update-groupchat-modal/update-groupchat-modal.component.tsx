import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFetchAgain,
  selectSelectedChat,
} from "../../store/chat/chat.selector";

import { setFetchAgain, setSelectedChat } from "../../store/chat/chat.action";
import { selectCurrentUser } from "../../store/user/user.selector";

import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { User } from "../my-chats/my-chats.component";
import UserBadgeItem from "../user-list-item/user-badge-item.component";
import UserListItem from "../user-list-item/user-list-item.component";

type UpdateGroupChatModalProps = {
  fetchMessages: () => void;
};

const UpdateGroupChatModal = ({ fetchMessages }: UpdateGroupChatModalProps) => {
  const fetchAgain = useSelector(selectFetchAgain);
  const selectedChat = useSelector(selectSelectedChat);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const handleAddToGroup = async (userToAdd: User) => {
    if (selectedChat.users.find((user: User) => user.id === userToAdd.id)) {
      toast({
        title: "User already in group",
        status: "error",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }

    if (selectedChat.groupAdminId !== currentUser.id) {
      toast({
        title: "Only group admin can add users",
        status: "error",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.put("/api/chat/groupadd", {
        chatId: selectedChat.id,
        userId: userToAdd.id,
      });

      dispatch(setSelectedChat(data));
      dispatch(setFetchAgain(!fetchAgain));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Something went wrong",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
    setGroupChatName("");
  };

  const handleRemoveFromGroup = async (userToRemove: User) => {
    if (
      selectedChat.groupAdminId !== currentUser.id &&
      userToRemove.id !== currentUser.id
    ) {
      toast({
        title: "Only group admin can remove users",
        status: "error",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.put("/api/chat/groupremove", {
        chatId: selectedChat.id,
        userId: userToRemove.id,
      });

      userToRemove.id === currentUser.id
        ? dispatch(setSelectedChat(null))
        : dispatch(setSelectedChat(data));
      dispatch(setFetchAgain(!fetchAgain));
      fetchMessages();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Something went wrong",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        position: "bottom",
        isClosable: true,
      });
    }
    setGroupChatName("");
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const { data } = await axios.put("/api/chat/rename", {
        chatId: selectedChat.id,
        chatName: groupChatName,
      });
      dispatch(setSelectedChat(data));
      dispatch(setFetchAgain(!fetchAgain));
      setRenameLoading(false);
    } catch (error: any) {
      setRenameLoading(false);
      toast({
        title: "Error renaming group chat",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });
    }
    setGroupChatName("");
  };

  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const { data } = await axios.get("/api/user", {
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
        description: "Failed to load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        aria-label="update-gc"
        icon={<ViewIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="center" fontSize="35px">
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" flexWrap="wrap" width="100%" pb={3}>
              {selectedChat.users.map((user: User) => (
                <UserBadgeItem
                  key={user.id}
                  user={user}
                  admin={selectedChat.groupAdminId}
                  handleFunc={() => handleRemoveFromGroup(user)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="red"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add user to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResults?.map((user: User) => (
                <UserListItem
                  key={user.id}
                  user={user}
                  handleFunc={() => handleAddToGroup(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleRemoveFromGroup(currentUser)}
              colorScheme="red"
            >
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
