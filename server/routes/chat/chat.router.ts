import express from "express";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from "./chat.controller";

const chatRouter = express.Router();

chatRouter.route("/").post(accessChat);
chatRouter.route("/").get(fetchChats);
chatRouter.route("/group").post(createGroupChat);
chatRouter.route("/rename").put(renameGroup);
chatRouter.route("/groupadd").put(addToGroup);
chatRouter.route("/groupremove").put(removeFromGroup);

export default chatRouter;
