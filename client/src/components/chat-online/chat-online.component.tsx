import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  User,
  onlineUser,
  Conversation,
} from "../../routes/chat/chat.component";

import "./chat-online.styles.css";

type ChatOnlineProps = {
  onlineUsers: onlineUser[];
  currentUserId: string;
  setCurrentChat: (conversation: Conversation) => void;
};

const ChatOnline = ({
  onlineUsers,
  currentUserId,
  setCurrentChat,
}: ChatOnlineProps) => {
  const [otherOnlineUsers, setOtherOnlineUsers] = useState<User[]>([]);

  console.log("onlineUsers", onlineUsers);

  console.log("otherOnlineUsers", otherOnlineUsers);

  useEffect(() => {
    const getOtherOnlineUsers = async () => {
      try {
        if (onlineUsers.length > 0) {
          const { data } = await axios.get("/api/user", {
            params: {
              userIds: onlineUsers.map((user) => user.userId),
            },
          });
          console.log("data", data);
          setOtherOnlineUsers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getOtherOnlineUsers();
  }, [onlineUsers]);

  const handleClick = async (user: User) => {
    try {
      const { data } = await axios.post(
        `/api/conversations/find/${currentUserId}/${user.id}`
      );
      setCurrentChat(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {otherOnlineUsers ? (
        <>
          {otherOnlineUsers.map((user, idx) => (
            <div
              key={idx}
              className="chatOnlineFriend"
              onClick={() => handleClick(user)}
            >
              <div className="chatOnlineImgContainer">
                <img
                  className="chatOnlineImg"
                  src={user.photo}
                  referrerPolicy="no-referrer"
                  alt=""
                />
                <div className="chatOnlineBadge"></div>
              </div>
              <span className="chatOnlineName">{user.name}</span>
            </div>
          ))}
        </>
      ) : (
        <div className="chatOnlineNoFriend">No friends online</div>
      )}
    </div>
  );
};

export default ChatOnline;
