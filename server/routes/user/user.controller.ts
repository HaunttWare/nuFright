import { Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';

export const getUserLikedBooks = async (req: Request, res: Response) => {
    // Get the user id from the request
    // query the db for the liked books of the user with that id
    // return the books
    const { id } = req.params;
    const likedBooks = await db.likes.findMany({
        where: {
            userId: id
        },
        include: {
            book: true
        }
    });
    res.json(likedBooks);
}





