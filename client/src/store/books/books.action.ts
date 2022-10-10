import { BOOKS_ACTIONS_TYPES } from "./books.types";
import { createAction } from "../utils/createAction";

export type BookData = {
  book_id: string;
  name: string;
  cover: string;
  url: string;
  authors?: string[];
  synopsis?: string;
  rating?: number;
  pages?: number;
  published_date?: string;
};

export const setBookList = (bookList: BookData[] | []) =>
  createAction(BOOKS_ACTIONS_TYPES.SET_BOOK_LIST, bookList);
