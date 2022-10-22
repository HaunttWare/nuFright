import express, { Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';

const postBadge = (req: Request, res: Response) => {
  const { userId, badgeName, description, badge } = req.body;
  // badge var is image source, temporary
  const id = `${userId}=${badgeName}`;
  db.badges.create({
    data: {
      id,
      name: badgeName,
      description,
      badge,
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      badge: true
    }
  })
    .then((data) => {
      // console.log('badge created', data);
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error('error posting badge\n', err);
      res.sendStatus(500);
    })
  
};

const getUserBadges = (req: Request, res: Response) => {
  const { userId } = req.params;

  db.badges.findMany({
    where: {
      userId,
    }
  })
};

export {
  postBadge
}