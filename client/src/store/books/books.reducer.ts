import { BOOKS_ACTIONS_TYPES } from "./books.types";

const INITIAL_STATE = {
  bookList: [],
};

export const booksReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case BOOKS_ACTIONS_TYPES.SET_BOOK_LIST:
      return {
        ...state,
        bookList: payload,
      };
    default:
      return state;
  }
};
