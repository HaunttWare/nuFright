import { db } from "../../prisma/utils/db.server";
import { Request, Response } from "express";

//New conversation
export const createConversation = async (req: Request, res: Response) => {
  const { userId, recipientId } = req.body;
  try {
    const newConversation = await db.conversation.create({
      data: {
        users: {
          connect: [{ id: userId }, { id: recipientId }],
        },
      },
    });
    res.status(200).json(newConversation);
  } catch (error) {
    console.log(error);
  }
};

//Get conversation of a user
export const getConversation = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const conversation = await db.conversation.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
    res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
  }
};

//Get conversation includes two userId
export const getConversationByUserId = async (req: Request, res: Response) => {
  const { firstUserId, secondUserId } = req.params;
  try {
    const conversation = await db.conversation.findMany({
      where: {
        users: {
          every: {
            id: {
              in: [firstUserId, secondUserId],
            },
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
    res.status(200).json(conversation[0]);
  } catch (error) {
    console.log(error);
  }
};
