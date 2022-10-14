import express from "express";
import { createConversation, getConversation, getConversationByUserId } from "./conversation.controller";

const conversationRouter = express.Router();

conversationRouter.post("/", createConversation);
conversationRouter.get("/:userId", getConversation);
conversationRouter.get("/find/:firstUserId/:secondUserId", getConversationByUserId);

export default conversationRouter;
