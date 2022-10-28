
import axios from 'axios';
import { Request, Response } from 'express';
import { resolveModuleName } from 'typescript';
import { config } from '../../config';
import { db } from '../../prisma/utils/db.server';

export const getVideos = async (req: Request, res: Response) => {
  const { query } = req.params;
  try {
    const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?key=${config.YOUTUBE_API_KEY}q=${query}&part=snippet&type=video&maxResults=50`)
    const videoData = data.items.map((video: any) => {
      const { id, snippet } = video;
      const videoObj = {
        videoId : id.videoId,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails.default.url        
      }
      return videoObj;
    })
    res.status(200).send(videoData);
  }
  catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
}
export const getUserPlaylist = async (req: Request, res: Response) => {
  const {userId} = req.params;
  try {
    const playListData = await db.playlist.findMany({ where:{ userId } })
    res.status(200).send(playListData);
  }
  catch(err) {
    console.error(err);
  }
}

export const addToPlaylist = async (req: Request, res: Response) => {
  const { video, userId } = req.body;
  console.log(userId);
  try { 
    const newVideos = await db.playlist.create({
      data: {
        videoId: video.videoId,
        title: video.title,
        thumbnail: video.thumbnail,
        description: video.description,
        userId,
      } 
    })
    res.status(201).send(newVideos);
  }
  catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export const deletePlaylistEntry = async (req: Request, res: Response) => {
  const { videoId } = req.params;
  try {
    const deletion = await db.playlist.delete({ where: { id: videoId }})
    res.send(deletion).status(200);

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
