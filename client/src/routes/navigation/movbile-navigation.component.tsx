// eslint-disable-next-line react-hooks/rules-of-hooks
import React from "react";
import {
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { NavItem } from "./navigation.component";
import { useNavigate } from "react-router-dom";
import { User } from "../../components/my-chats/my-chats.component";
type MobileNavProps = {
  navItems: NavItem[];
  currentUser: User;
};

const MobileNav = ({ navItems, currentUser }: MobileNavProps) => {
  return (
    <Stack
      bg={useColorModeValue("transparent", "transparent")}
      p={4}
      display={{ md: "none" }}
    >
      {navItems.map((navItem) => (
        <MobileNavItem
          navItems={[]}
          key={navItem.label}
          {...navItem}
          currentUser={currentUser}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({
  label,
  path,
  currentUser,
}: NavItem & MobileNavProps) => {
  const { onToggle } = useDisclosure();
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Flex
        py={2}
        as={Link}
        onClick={() => navigateTo(path ?? "")}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={useColorModeValue("white", "white")}>
          {label === "Chat"
            ? currentUser
              ? label
              : null // if user is logged in, show chat
            : label}
        </Text>
      </Flex>
    </Stack>
  );
};

export default MobileNav;
