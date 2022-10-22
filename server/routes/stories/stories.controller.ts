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
            images: true,
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

// POST REQUESTS

const addStory = (req:Request, res:Response) => {
    let newStory = req.body;
    if(newStory.title && newStory.text && newStory.userId) {
        if(newStory.text.length <= 10000 && (newStory.description ? newStory.description.length <= 300 : true)) {
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
                console.log(err);
                res.status(500).send(err);
            });
        } else {
            if(newStory.text.length > 10000) {
                res.status(500).send('story is too long!');
            } else if(newStory.description) {
                if(newStory.description.length > 300) {
                    res.status(500).send('description is too long!');
                }
            }
        }
    } else {
        res.status(500).send('Cannot post story due to missing field(s)');
    }
}

// UPDATE REQUESTS

const editStory = (req:Request, res:Response) => {
    db.stories.findUnique({
        where: {
            id: req.body.id,
        }
    })
    .then((result:any) => {
        if(result) {
            if(req.body.user === result.authorId) {
                db.stories.update({
                    where: {
                        id: req.body.id,
                    },
                    data: {
                        story: req.body.newStory,
                        description: req.body.newDescription,
                        images: req.body.image,
                    }
                })
                .then((result:any) => {
                    res.status(200).send(result);
                })
                .catch((err:Error) => {
                    console.error(err);
                    res.sendStatus(500);
                });
            } else {
                res.sendStatus(404);
            }
        } else {
            res.sendStatus(404);
        }
    })
    .catch((err:Error) => {
        console.log(err);
        res.sendStatus(500);
    });
}

export {
    getAllStories,
    addStory,
    editStory,
}