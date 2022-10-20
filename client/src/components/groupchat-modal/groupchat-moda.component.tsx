import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { ChatData, setChats } from "../../store/chat/chat.action";

import { User } from "../side-drawer/side-drawer.component";
import { selectChats } from "../../store/chat/chat.selector";
import axios from "axios";
import UserListItem from "../user-list-item/user-list-item.component";
import UserBadgeItem from "../user-list-item/user-badge-item.component";

type GroupChatModalProps = {
  children: React.ReactNode;
};

const GroupChatModal = ({ children }: GroupChatModalProps) => {
  const chats = useSelector(selectChats);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

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
      console.log(data);
      setLoading(false);
      setSearchResults(data);
    } catch (error) {
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

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const { data } = await axios.post("/api/chat/group", {
        chatName: groupChatName,
        userIds: selectedUsers.map((user) => user.id),
        currentUserId: currentUser.id,
      });
      console.log(data);
      dispatch(setChats([...chats, data]));
      onClose();
      toast({
        title: "New Group Chat Created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
        toast({
            title: "Something went wrong",
            description: "Failed to create the group chat",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    }
  };

  const handleAddToGroup = async (userToAdd: User) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    } else {
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
  };

  const handleRemoveFromGroup = (userToRemove: User) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user.id !== userToRemove.id)
    );
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="35px" display="flex" justifyContent="center">
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: Adonis, John, Erin, Federico, Royce"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {/* selected users */}
            <Box width="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user.id}
                  user={user}
                  handleFunc={() => handleRemoveFromGroup(user)}
                />
              ))}
            </Box>

            {/* render searched users */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              searchResults
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user.id}
                    user={user}
                    handleFunc={() => handleAddToGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
