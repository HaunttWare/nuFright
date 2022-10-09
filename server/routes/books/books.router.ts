import express from "express";

import { getBooks, getBook } from "./books.controller";

const booksRouter = express.Router();

booksRouter.get("/", getBooks);

booksRouter.get("/:id", getBook);


export default booksRouter;