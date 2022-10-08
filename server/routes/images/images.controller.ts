import express, { Request, Response } from 'express';
import { db } from '../../prisma/utils/db.server';
import { config } from '../../config';
import multer from 'multer';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const s3 = new S3Client({
  credentials: {
    accessKeyId: config.BUCKET_KEY,
    secretAccessKey: config.BUCKET_SECRET
  },
  region: config.BUCKET_REGION
});


const uploadImage = async (req: Request, res: Response) => {
  const { userId, caption } = req.body
  console.log('req.body', req.body);
  console.log('req.file', req.file);

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
  const url = await getSignedUrl(s3, urlCommand, { expiresIn: ( 4 * 24 * 60 * 60) })
  
   db.images.create({
    data: {
      image: url,
      userId: userId,
      caption: caption
     },
     select: {
       image: true,
       caption: true
     }
   })
   .then((data) => {
     console.log('data from upload Image', data);
     res.status(200).send(data);
  })
  .catch((err) => {
    console.error('error on image upload\n', err);
    res.sendStatus(500);
  })
  
  


}

const getImages = async (req: Request, res: Response) => {
  

  try {
    const images = await db.images.findMany({})
    console.log('all images', images);
    res.status(200).send(images);

  } catch (err) {
    console.error('could not get images!');
    res.sendStatus(500);
  }


}

const getUserImgs = async (req: Request, res: Response) => {
  const { userId } = req.params;


  try {
    const userImages = await db.images.findMany({
      where: {
        userId: userId
      }
    })
    console.log('here are the user images', userImages);
    res.status(200).send(userImages);
  } catch (err) {
    console.error('could not find users images', err)
    res.sendStatus(500);
  }

  
}


export {
  uploadImage,
  getImages,
  getUserImgs,
  upload
}


// images.post('/', upload.single('image'), async (req, res) => {

//   const params = {
//     Bucket: config.BUCKET_NAME,
//     Key: req.file?.originalname,
//     Body: req.file?.buffer,
//     ContentType: req.file?.mimetype
//   }
//   const command = new PutObjectCommand(params);
//   s3.send(command)
//     .then((data) => {
//       console.log('s3 command successful', data);
//     })
//     .catch((err) => {
//       console.error('error on s3 send command\n', err);
//     })

//   const ObjectParams = {
//     Bucket: config.BUCKET_NAME,
//     Key: req.file?.originalname
//   };

//   const urlCommand = new GetObjectCommand(ObjectParams)
//   const url = await getSignedUrl(s3, urlCommand, { expiresIn: 3600 })
//   console.log('the almighty url',url);
//   res.sendStatus(200);
// });