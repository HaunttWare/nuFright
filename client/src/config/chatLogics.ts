import { Message } from "../store/chat/chat.action";
import { UserData } from "../store/user/user.action";

export const getSenderName = (
  loggedUser: UserData | null,
  users: UserData[]
) => {
  return users[0].id === loggedUser?.id ? users[1].name : users[0].name;
};

export const getSender = (loggedUser: UserData | null, users: UserData[]) => {
  return users[0].id === loggedUser?.id ? users[1] : users[0];
};

export const isSameSender = (
  messages: Message[],
  message: Message,
  idx: number,
  userId: string
) => {
  return (
    idx < messages.length - 1 &&
    (messages[idx + 1].senderId !== message.senderId ||
      messages[idx + 1].senderId === undefined) &&
    messages[idx].senderId !== userId
  );
};

export const isLastMessage = (
  messages: Message[],
  idx: number,
  userId: string
) => {
  return (
    idx === messages.length - 1 &&
    messages[messages.length - 1].senderId !== userId &&
    messages[messages.length - 1].senderId
  );
};

export const isSameSenderMargin = (
  messages: Message[],
  message: Message,
  idx: number,
  userId: string
) => {
  if (
    idx < messages.length - 1 &&
    messages[idx + 1].senderId === message.senderId &&
    messages[idx].senderId !== userId
  ) {
    return 33;
  } else if (
    (idx < messages.length - 1 &&
      messages[idx + 1].senderId !== message.senderId &&
      messages[idx].senderId !== userId) ||
    (idx === messages.length - 1 && messages[idx].senderId !== userId)
  ) {
    return 0;
  } else {
    return "auto";
  }
};

export const isSameUser = (
  messages: Message[],
  message: Message,
  idx: number
) => {
  return idx > 0 && messages[idx - 1].senderId === message.senderId;
};
