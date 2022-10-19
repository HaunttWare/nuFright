import { prisma } from '@prisma/client';
import express, {Request, Response} from 'express';
import { ModuleResolutionKind } from 'typescript';
import { db } from '../../prisma/utils/db.server';

// GET REQUESTS

const getAllStories = (req:Request, res:Response) => {
    db.stories.findMany({
        select: {
            id: true,
            title: true,
            story: true,
            createdAt: true,
            description: true,
            author: {
                select: {
                    name: true,
                }
            },
            ratings: true,
            Comment: true,
            likedBy: true,
            savedBy: true,
        }
    })
    .then((result:any) => {
        res.status(200).send(result);
    })
    .catch((err:Error) => {
        res.status(500).send(err);
    })
}

const getName = (req:Request, res:Response) => {
    const { userId }  = req.params;
    db.user.findUnique({
        where: {
            id: req.body.userId ? req.body.userId : userId,
        }
    })
    .then((result:any) => {
        res.status(200).send(result.name);
    })
    .catch((err:Error) => {
        console.error(err);
        res.status(500);
    })
}

// POST REQUESTS

const addStory = (req:Request, res:Response) => {
    let newStory = req.body;
    if(newStory.title && newStory.text && newStory.userId) {
        db.stories.create({
            data: {
                authorId: newStory.userId,
                title: newStory.title,
                story: newStory.text,
                images: newStory.image ? newStory.image : '',
                description: newStory.description ? newStory.description : '',
            }
        })
        .then((result:any) => {
            res.sendStatus(200);
        })
        .catch((err:Error) => {
            res.status(500).send(err);
        });
    } else {
        res.status(500).send('Cannot post story due to missing field(s)');
    }
}

// UPDATE REQUESTS

const editStory = (req:Request, res:Response) => {
    db.stories.update({
        where: {
            id: req.body.id,
        },
        data: {
            story: req.body.newStory,
            description: req.body.newDescription,
        }
    })
    .then((result:any) => {
        res.status(200).send(result);
    })
    .catch((err:Error) => {
        console.error(err);
        res.sendStatus(500);
    });
}

export {
    getAllStories,
    getName,
    addStory,
    editStory,
}