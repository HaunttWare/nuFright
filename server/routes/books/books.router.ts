import express from "express";

import { getBooks, getBook, likeBook } from "./books.controller";

const booksRouter = express.Router();

booksRouter.get("/", getBooks);

booksRouter.get("/:id", getBook);

booksRouter.post("/like", likeBook);


export default booksRouter;