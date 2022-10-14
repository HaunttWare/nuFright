import { db } from "../../prisma/utils/db.server";
import { Request, Response } from "express";

//Add message
export const addMessage = async (req: Request, res: Response) => {
  const { conversationId, senderId, message } = req.body;
  try {
    const newMessage = await db.message.create({
      data: {
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: senderId,
          },
        },
        message,
      },
    });
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

//Get message
export const getMessages = async (req: Request, res: Response) => {
  const { conversationId } = req.params;
  try {
    const messages = await db.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: true,
      },
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
