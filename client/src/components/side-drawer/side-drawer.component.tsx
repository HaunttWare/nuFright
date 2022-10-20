import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import {
  ChatData,
  setChats,
  setSelectedChat,
} from "../../store/chat/chat.action";

import { Box } from "@chakra-ui/layout";
import {
  Button,
  Tooltip,
  MenuButton,
  Text,
  Menu,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  Input,
  DrawerBody,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "../profile-modal/profile-modal.component";
import ChatLoading from "../chat-loading/chat-loading.component";
import UserListItem from "../user-list-item/user-list-item.component";
import { selectChats } from "../../store/chat/chat.selector";

export type User = {
  id: string;
  name: string;
  email: string;
  photo: string;
  createdAt: string;
};

const SideDrawer = () => {
  const currentUser = useSelector(selectCurrentUser);
  const chats = useSelector(selectChats);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

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
        setChats([...chats, data]);
      }

      dispatch(setSelectedChat(data));
      setLoadingChat(false);
      onClose();
    } catch (error: any) {
      setLoadingChat(false);
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

  return (
    <>
      <Box display="flex">
        <Tooltip label="Search Users to chat" hasArrow placement="bottom">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={currentUser.name}
                src={currentUser.photo}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={currentUser}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
