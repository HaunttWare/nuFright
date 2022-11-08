import { createSelector } from "reselect";

const selectChatReducer = (state: any) => state.chat;

export const selectSelectedChat = createSelector(
  [selectChatReducer],
  (chat) => chat.selectedChat
);

export const selectChats = createSelector(
  [selectChatReducer],
  (chat) => chat.chats
);

export const selectMessages = createSelector(
  [selectChatReducer],
  (chat) => chat.messages
);

export const selectFetchAgain = createSelector(
  [selectChatReducer],
  (chat) => chat.fetchAgain
);

export const selectNotification = createSelector(
  [selectChatReducer],
  (chat) => chat.notification
);
