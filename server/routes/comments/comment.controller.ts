import {Request, Response} from 'express';
import {db} from '../../prisma/utils/db.server';

const postComment = async (req: Request, res: Response) => {
  const {body: {message, category}, params: {type}} = req; 
  // console.log({message, category, type})
  interface Comment {
  
    message: String;
    category: String;
  };

  const data: Comment = {

    message,
    category,
  }
  console.log({data})
  try {
    // const newComment = await db.comment.create({
    //   data,
    //   include: {
    //     message: true,
    //     category: true,
    //   }
    // })
    // if (newComment) {
    //   console.log(newComment);
    //   res.sendStatus(201);
    // }
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export {postComment};