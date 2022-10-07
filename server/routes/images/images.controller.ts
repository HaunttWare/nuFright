import express from 'express';
import { db } from '../../prisma/utils/db.server';
// multer to handle multipart form data
import multer from 'multer';
// s3 client to interact with s3 buckets
import { S3Client, PutObjectCommand, GetObjectCommand, S3ClientConfig } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
require('dotenv').config();
const images = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// s3 variables
const bucketKey = (process.env.BUCKET_KEY as string);
const bucketSecret = (process.env.BUCKET_SECRET as string);
const bucketRegion = (process.env.BUCKET_REGION as string);
const bucketName = (process.env.BUCKET_NAME as string);

// const s3config: S3ClientConfig = {
//   credentials: {
//     accessKeyId: '<ACCESS_KEY_ID>
//     secretAccessKey: '<BUCKET_SECRET>'
//   },
//   region: ''
// }

const s3 = new S3Client({
  credentials: {
    accessKeyId: bucketKey,
    secretAccessKey: bucketSecret
  },
  region: bucketRegion
});

images.post('/', upload.single('image'), async (req, res) => {
  // console.log('whats in the body\n', req.body);
  // console.log('whats in the file\n', req.file);
  // console.log('whats the bucketname?\n', bucketName)


  const params = {
    Bucket: bucketName,
    Key: req.file?.originalname,
    Body: req.file?.buffer,
    ContentType: req.file?.mimetype
  }
  const command = new PutObjectCommand(params);
  s3.send(command)
    .then((data) => {
      console.log('s3 command successful', data);
    })
    .catch((err) => {
      console.error('error on s3 send command\n', err);
    })

  const ObjectParams = {
    Bucket: bucketName,
    Key: req.file?.originalname
  };

  const urlCommand = new GetObjectCommand(ObjectParams)
  // const url = await getSignedUrl(s3, urlCommand, { expiresIn: 3600 })  
  // console.log(url);

  res.sendStatus(200);
});


module.exports = images;
