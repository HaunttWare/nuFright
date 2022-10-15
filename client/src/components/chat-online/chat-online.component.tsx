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

  useEffect(() => {
    const userIdFilter = onlineUsers
      .filter((user) => user.userId !== null && user.userId !== currentUserId)
      .map((user) => user.userId);

    const getOtherOnlineUsers = async () => {
      try {
        const otherOnlineUsers = await Promise.all(
          userIdFilter.map(async (userId) => {
            const res = await axios.get(`/api/user/${userId}`);
            return res.data;
          })
        );
        setOtherOnlineUsers(otherOnlineUsers);
      } catch (err) {
        console.log(err);
      }
    };
    getOtherOnlineUsers();
  }, [onlineUsers, currentUserId]);

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
