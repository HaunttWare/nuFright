import { Images } from ".prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ImagePost from '../../components/Gallery-components/galleryPost.component';
import ImageCard from '../../components/Gallery-components/ImageCard.component';
import loadSpinner from '../../components/Gallery-components/loadSpinner.component';
 import{ galleryProps, imgs } from '../../components/Gallery-components/galleryProps.component';



const Gallery = () => {
  const [allImages, setAllImages] = useState<imgs | null>(null);
  const [gotImages, setGotImages] = useState(false);

  useEffect(() => {
    axios.get('/images')
      .then(({ data }) => {
        console.log('images from database', data);
        setAllImages(data);
      })
      .then(() => {
        setGotImages(true);
        console.log('images in the state', allImages);
      })
      .catch((err) => {
        console.error('error on get images from db client\n', err);
      })
  }, [gotImages]);

  return (
    <div className="container">
      <h1>Gallery</h1>
      <ImagePost />
      {
        allImages ?
          <ImageCard allImages={allImages} />
          :
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
      }
    </div>
  );
}
export default Gallery;
