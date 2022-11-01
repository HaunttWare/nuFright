// eslint-disable-next-line react-hooks/rules-of-hooks
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
type DesktopNavProps = {
  navItems: NavItem[];
  navigateTo: (path: string) => void;
};

const DesktopNav = ({ navItems, navigateTo }: DesktopNavProps) => {
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
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopNav;
