import express from "express";
import {
  findOrCreateConversation,
  getConversation,
} from "./conversation.controller";

const conversationRouter = express.Router();

conversationRouter.get("/:userId", getConversation);
conversationRouter.post(
  "/find/:firstUserId/:secondUserId",
  findOrCreateConversation
);

export default conversationRouter;
