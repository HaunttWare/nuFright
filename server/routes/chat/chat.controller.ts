import { Request, Response } from "express";
import { db } from "../../prisma/utils/db.server";

export const accessChat = async (req: Request, res: Response) => {
  const { userId, currentUserId } = req.body;

  if (!userId || !currentUserId) {
    return res.status(400).json({ message: "Bad request" });
  }

  const chat = await db.chat.findFirst({
    where: {
      isGroupChat: false,
      users: {
        every: {
          id: {
            in: [userId, currentUserId],
          },
        },
      },
    },
    include: {
      users: true,
      messages: true,
    },
  });

  if (chat) {
    return res.status(200).json({ chat });
  } else {
    const newChat = await db.chat.create({
      data: {
        isGroupChat: false,
        chatName: "sender",
        users: {
          connect: [{ id: userId }, { id: currentUserId }],
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    return res.status(200).json({ chat: newChat });
  }
};

export const fetchChats = async (req: Request, res: Response) => {
  const { currentUserId } = req.query;

  try {
    const chats = await db.chat.findMany({
      where: {
        users: {
          some: {
            id: currentUserId as string,
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    chats.sort((a, b) => {
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    });

    return res.status(200).json(chats);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createGroupChat = async (req: Request, res: Response) => {
  const { userIds, currentUserId, chatName } = req.body;

  if (!userIds || !currentUserId || !chatName) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  if (userIds.length < 2) {
    return res
      .status(400)
      .json({ message: "More than 2 users are required to form a group chat" });
  }

  const newGroupChat = await db.chat.create({
    data: {
      isGroupChat: true,
      groupAdminId: currentUserId,
      chatName,
      users: {
        connect: [
          { id: currentUserId },
          ...userIds.map((userId: string) => {
            return { id: userId };
          }),
        ],
      },
    },
    include: {
      users: true,
      groupAdmin: true,
      messages: true,
    },
  });

  return res.status(200).json(newGroupChat);
};

export const renameGroup = async (req: Request, res: Response) => {
  const { chatId, chatName } = req.body;

  const updatedGroupChat = await db.chat.update({
    where: {
      id: chatId,
    },
    data: {
      chatName,
    },
    include: {
      users: true,
      groupAdmin: true,
      messages: true,
    },
  });

  if (!updatedGroupChat) {
    return res.status(400).json({ message: "Chat not found" });
  } else {
    return res.status(200).json(updatedGroupChat);
  }
};

export const addToGroup = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  const updatedUsersInChat = await db.chat.update({
    where: {
      id: chatId,
    },
    data: {
      users: {
        connect: {
          id: userId,
        },
      },
    },
    include: {
      users: true,
      groupAdmin: true,
      messages: true,
    },
  });

  if (!updatedUsersInChat) {
    return res.status(400).json({ message: "Chat not found" });
  } else {
    return res.status(200).json(updatedUsersInChat);
  }
};

export const removeFromGroup = async (req: Request, res: Response) => {
  const { chatId, userId } = req.body;

  const updatedUsersInChat = await db.chat.update({
    where: {
      id: chatId,
    },
    data: {
      users: {
        disconnect: {
          id: userId,
        },
      },
    },
    include: {
      users: true,
      groupAdmin: true,
      messages: true,
    },
  });

  if (!updatedUsersInChat) {
    return res.status(400).json({ message: "Chat not found" });
  } else {
    return res.status(200).json(updatedUsersInChat);
  }
};
