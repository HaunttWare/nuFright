import { CHAT_ACTIONS_TYPES } from "./chat.types";
import { createAction } from "../utils/createAction";
import { UserData } from "../user/user.action";

export type ChatData = {
  id: string;
  chatName: string;
  isGroupChat: boolean;
  users: UserData[];
  // messages: Message[];
  groupAdminId: string | null;
};

export const setSelectedChat = (chat: ChatData | null) =>
  createAction(CHAT_ACTIONS_TYPES.SET_SELECTED_CHAT, chat);

export const setChats = (chats: ChatData[]) =>
  createAction(CHAT_ACTIONS_TYPES.SET_CHATS, chats);

export const setFetchAgain = (fetchAgain: boolean) =>
  createAction(CHAT_ACTIONS_TYPES.SET_FETCH_AGAIN, fetchAgain);
