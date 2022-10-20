import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSender, getSenderName } from "../../config/chatLogics";
import { setFetchAgain, setSelectedChat } from "../../store/chat/chat.action";
import {
  selectFetchAgain,
  selectSelectedChat,
} from "../../store/chat/chat.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import ProfileModal from "../profile-modal/profile-modal.component";
import UpdateGroupChatModal from "../update-groupchat-modal/update-groupchat-modal.component";

const SingleChat = () => {
  const fetchAgain = useSelector(selectFetchAgain);
  const selectedChat = useSelector(selectSelectedChat);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            width="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="back"
              icon={<ArrowBackIcon />}
              onClick={() => dispatch(setSelectedChat(null))}
            />

            {!selectedChat.isGroupChat ? (
              <>{getSenderName(currentUser, selectedChat.users)}
                <ProfileModal user={getSender(currentUser, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal />
              </>
            )}
          </Text>
            <Box
                display="flex"
                justifyContent="flex-end"
                p={3}
                bg="gray.100"
                width="100%"
                height="100%"
                borderRadius="lg"
                overflowY="hidden"
                >
                    {/* messages here */}
                </Box>


        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Text fontSize="3xl" pb={3}>
            {" "}
            Click on a user to start chatting{" "}
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
