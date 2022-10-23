import express from "express";
import { getMessages, sendMessage } from "./message.controller";

const messageRouter = express.Router();


messageRouter.route("/").post(sendMessage);
messageRouter.route("/:chatId").get(getMessages);


export default messageRouter;