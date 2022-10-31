import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { setCurrentUser } from "../../store/user/user.action";
import { setSelectedChat } from "../../store/chat/chat.action";
import { setNotification, Notification } from "../../store/chat/chat.action";
import { selectNotification } from "../../store/chat/chat.selector";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  BellIcon,
} from "@chakra-ui/icons";

import { GoogleIcon } from "./signIn-Icon";

// @ts-ignore
import NotificationBadge, { Effect } from "react-notification-badge";

import { getSenderName } from "../../config/chatLogics";

import MobileNav from "./movbile-navigation.component";
import DesktopNav from "./desktop-navigation.component";
import axios from "axios";

export interface NavItem {
  label: string;
  path?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Cinema",
    path: "/cinema",
  },
  {
    label: "Books",
    path: "/books",
  },
  {
    label: "Stories",
    path: "/stories",
  },
  {
    label: "Gallery",
    path: "/gallery",
  },
  {
    label: "Costumes",
    path: "/costumes",
  },
  {
    label: "Find Haunts",
    path: "/find-haunts",
  },
  {
    label: "Sounds",
    path: "/sounds",
  },
  {
    label: "Playlist",
    path: "/playlist",
  },
  {
    label: "Chat",
    path: "/chats",
  },
];

const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure();
  const currentUser = useSelector(selectCurrentUser);
  const notifications = useSelector(selectNotification);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue("transparent", "transparent")}
          color={useColorModeValue("white", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"creepster"}
              color={useColorModeValue("white", "white")}
              onClick={() => navigateTo("/home")}
              cursor="pointer"
            >
              Nufright
            </Text>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <DesktopNav navItems={NAV_ITEMS} navigateTo={navigateTo} currentUser={currentUser} />
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {!currentUser ? (
              <Button
                as={"a"}
                href="/api/auth/google"
                fontSize={"sm"}
                fontWeight={400}
                bg={"white"}
                color="black"
                
              >
                <GoogleIcon boxSize="5" pr={2} />
                Sign In
              </Button>
            ) : (
              <Box display="flex">
                <Menu>
                  <MenuButton p={1}>
                    <NotificationBadge
                      count={notifications.length}
                      effect={Effect.SCALE}
                    />
                    <BellIcon fontSize="2xl" m={1} />
                  </MenuButton>
                  <MenuList pl={2} color="black">
                    {!notifications.length && "No new notifications"}
                    {notifications.map((notif: Notification) => (
                      <MenuItem
                        key={notif.id}
                        onClick={() => {
                          dispatch(setSelectedChat(notif.chat));
                          dispatch(
                            setNotification(
                              notifications.filter(
                                (n: Notification) => n.id !== notif.id
                              )
                            )
                          );
                        }}
                      >
                        {notif.chat.isGroupChat
                          ? notif.quantity > 1
                            ? `${notif.quantity} New messages in ${notif.chat.chatName}`
                            : `New message in ${notif.chat.chatName}`
                          : notif.quantity > 1
                          ? `${
                              notif.quantity
                            } New messages from ${getSenderName(
                              currentUser,
                              notif.chat.users
                            )}`
                          : `New message from ${getSenderName(
                              currentUser,
                              notif.chat.users
                            )}`}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    bg={useColorModeValue("transparent", "transparent")}
                  >
                    <Avatar
                      size="sm"
                      cursor="pointer"
                      name={currentUser?.name}
                      src={currentUser?.photo}
                    />
                  </MenuButton>
                  <MenuList color="black">
                    <MenuItem onClick={() => navigateTo("/profile")}>
                      My Profile
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={() => dispatch(setCurrentUser(null))} as="a" href='/api/auth/logout'>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            )}
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav navItems={NAV_ITEMS} currentUser={currentUser}/>
        </Collapse>
      </Box>
      <Outlet />
    </>
  );
};

export default Navigation;
