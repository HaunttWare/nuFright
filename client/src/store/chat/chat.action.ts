import { CHAT_ACTIONS_TYPES } from "./chat.types";
import { createAction } from "../utils/createAction";
import { UserData } from "../user/user.action";

export type Message = {
  id: string;
  content: string;
  sender: UserData;
  senderId: string;
  chatId: string;
  createdAt: Date;
};

export type ChatData = {
  id: string;
  chatName: string;
  isGroupChat: boolean;
  users: UserData[];
  messages: Message[];
  latestMessage: Message;
  groupAdminId: string | null;
};

export type Notification = {
  id: string;
  chatId: string;
  chat: ChatData;
  senderId: string;
  sender: UserData;
  content: string;
  createdAt: Date;
  quantity: number;
};

export const setSelectedChat = (chat: ChatData | null) =>
  createAction(CHAT_ACTIONS_TYPES.SET_SELECTED_CHAT, chat);

export const setChats = (chats: ChatData[]) =>
  createAction(CHAT_ACTIONS_TYPES.SET_CHATS, chats);

export const setFetchAgain = (fetchAgain: boolean) =>
  createAction(CHAT_ACTIONS_TYPES.SET_FETCH_AGAIN, fetchAgain);

const addNotification = (
  notifications: Notification[],
  incomingNotification: Notification
) => {
  const existingNotifications = notifications.find(
    (notification) => notification.chatId === incomingNotification.chatId
  );

  if (existingNotifications) {
    return notifications.map((notification) =>
      notification.chatId === incomingNotification.chatId
        ? {
            ...notification,
            quantity: notification.quantity + 1,
          }
        : notification
    );
  }

  return [...notifications, { ...incomingNotification, quantity: 1 }];
};

export const setNotification = (notification: Notification[]) =>
  createAction(CHAT_ACTIONS_TYPES.SET_NOTIFICATION, notification);

export const addToNotifications = (
  notifications: Notification[],
  incomingNotification: Notification
) => {
  const newNotifications = addNotification(notifications, incomingNotification);
  return setNotification(newNotifications);
};
