import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { Message } from "../../store/chat/chat.action";

import { Avatar, Tooltip } from "@chakra-ui/react";

import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/chatLogics";
import ScrollableFeed from "react-scrollable-feed";

type ScrollableChatProps = {
  messages: Message[];
};

const ScrollableChat = ({ messages }: ScrollableChatProps) => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message: Message, idx) => (
          <div key={idx} style={{ display: "flex" }}>
            {(isSameSender(messages, message, idx, currentUser.id) ||
              isLastMessage(messages, idx, currentUser.id)) && (
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                  src={message.sender.photo}
                />
              </Tooltip>
            )}

            <span
              style={{
                backgroundColor:
                  message.sender.id === currentUser.id ? "#c43c49" : "#fff",
                color: message.sender.id === currentUser.id ? "#fff" : "#000",
                padding: "5px 15px",
                borderRadius: "20px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(
                  messages,
                  message,
                  idx,
                  currentUser.id
                ),
                marginTop: isSameUser(messages, message, idx)
                  ? 3
                  : 10,
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
