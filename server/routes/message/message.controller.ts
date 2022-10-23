import { Request, Response } from "express";
import { db } from "../../prisma/utils/db.server";

export const sendMessage = async (req: Request, res: Response) => {
  const { chatId, senderId, content } = req.body;

  if (!chatId || !senderId || !content) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  try {
    const message = await db.message.create({
      data: {
        chatId,
        senderId,
        content,
      },

      include: {
        sender: true,
        chat: {
          include: {
            users: true,
          },
        },
      },
    });
    await db.chat.update({
      where: {
        id: chatId,
      },
      data: {
        latestMessageId: message.id,
      },
      include: {
        latestMessage: true,
        users: true,
      },
    });

    res.status(201).json(message);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { chatId } = req.params;

  try {
    const messages = await db.message.findMany({
      where: {
        chatId,
      },
      include: {
        sender: true,
        chat: true,
        latestMessage: true,
      },
    });
    res.status(200).json(messages);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
