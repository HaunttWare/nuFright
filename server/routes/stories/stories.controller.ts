import express, {Request, Response} from 'express';
import { ModuleResolutionKind } from 'typescript';
import { db } from '../../prisma/utils/db.server';

// GET REQUESTS

const getAllStories = (req:Request, res:Response) => {
    db.stories.findMany()
    .then((result:any) => {
        res.status(200).send(result);
    })
    .catch((err:Error) => {
        res.status(500).send(err);
    })
}

// POST REQUESTS

export {
    getAllStories,
}