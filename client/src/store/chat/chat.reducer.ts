import { ChatData, Message, Notification } from "./chat.action";
import { CHAT_ACTIONS_TYPES } from "./chat.types";

export type ChatInitialState = {
  selectedChat: ChatData | null;
  chats: ChatData[];
  messages: Message[];
  fetchAgain: boolean;
  notification: Notification[];
};

const INITIAL_STATE: ChatInitialState = {
  selectedChat: null,
  chats: [],
  messages: [],
  fetchAgain: false,
  notification: [],
};

export const chatReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case CHAT_ACTIONS_TYPES.SET_SELECTED_CHAT:
      return {
        ...state,
        selectedChat: payload,
      };
    case CHAT_ACTIONS_TYPES.SET_CHATS:
      return {
        ...state,
        chats: payload,
      };
    case CHAT_ACTIONS_TYPES.SET_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    case CHAT_ACTIONS_TYPES.SET_FETCH_AGAIN:
      return {
        ...state,
        fetchAgain: payload,
      };
    case CHAT_ACTIONS_TYPES.SET_NOTIFICATION:
      return {
        ...state,
        notification: payload,
      };
    default:
      return state;
  }
};
