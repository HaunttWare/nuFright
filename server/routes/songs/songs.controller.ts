import express, { Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';
import { config } from '../../config';
import multer from 'multer';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { runInNewContext } from 'vm';
import { userInfo } from 'os';

// setting up the s3 buckets to store songs in
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.BUCKET_KEY,
    secretAccessKey: config.BUCKET_SECRET
  },
  region: config.BUCKET_REGION
});

/// posting a blob to the db
const postBlob = async (req: Request, res: Response) => {
  const { name, userId } = req.body;

  const params = {
    send: {
      Bucket: config.BUCKET_NAME,
      Key: req.file?.originalname,
      Body: req.file?.buffer,
      ContentType: req.file?.mimetype
    },
    url: {
      Bucket: config.BUCKET_NAME,
      Key: req.file?.originalname
    }
  }

  const command = new PutObjectCommand(params.send);
  s3.send(command)
    .then((data) => {
      console.log('s3 command successful', data);
    })
    .catch((err) => {
      console.error('error on s3 send command\n', err);
    })
  
  const urlCommand = new GetObjectCommand(params.url)
  const url = await getSignedUrl(s3, urlCommand, { expiresIn: ( 6 * 24 * 60 * 60) })
  // console.log('reqfile→→→→', req.file);
  db.song.create({
    data: {
      fileURL: url,
      fileName: name,
      userId: userId,
    }
  })
  .then((data) => {
    res.status(201).send(data);
  })
  .catch((err) => {
    console.error('error in song upload\n', err);
    res.sendStatus(500);
  });
};

// get all blobs from the db

const getBlobs = async (req: Request, res: Response) => {
  try {
   const songs = await db.song.findMany({})
    res.status(200).send(songs)
  } catch (err) {
    console.error('could not retrieve songs loser');
    res.sendStatus(500);
  }
}


export {
  postBlob,
  upload,
  getBlobs
}