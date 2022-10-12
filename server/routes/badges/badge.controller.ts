import express, { Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';

const postBadge = (req: Request, res: Response) => {
  const { userId, badgeName, description, badge } = req.body;
  // badge var is image source, might be temporary

  
}