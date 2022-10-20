import { ChatData } from "./chat.action";
import { CHAT_ACTIONS_TYPES } from "./chat.types";

export type ChatInitialState = {
  selectedChat: ChatData | null;
  chats: ChatData[];
  fetchAgain: boolean;
};

const INITIAL_STATE: ChatInitialState = {
  selectedChat: null,
  chats: [],
  fetchAgain: false,
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
    case CHAT_ACTIONS_TYPES.SET_FETCH_AGAIN:
      return {
        ...state,
        fetchAgain: payload,
      };

    default:
      return state;
  }
};
