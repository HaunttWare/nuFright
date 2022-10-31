import React from "react";
import {
  Box,
  Link,
  Popover,
  PopoverTrigger,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { NavItem } from "./navigation.component";
import { User } from "../../components/side-drawer/side-drawer.component";
type DesktopNavProps = {
  navItems: NavItem[];
  navigateTo: (path: string) => void;
  currentUser: User;
};

const DesktopNav = ({ navItems, navigateTo, currentUser }: DesktopNavProps) => {
  const linkColor = useColorModeValue("white", "white");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                onClick={() => navigateTo(navItem.path ?? "")}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label === "Chat" ? (
                  currentUser ? navItem.label : null // if user is logged in, show chat
                ) : (
                  navItem.label
                )}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopNav;
