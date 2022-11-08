import { Images } from ".prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ImagePost from '../../components/Gallery-components/galleryPost.component';
import ImageCards from '../../components/Gallery-components/ImageCards.component';
 import{ imageArr } from '../../components/Gallery-components/galleryProps.component';
 import Comments from '../../components/comments/comments';



const Gallery = () => {
  const [allImages, setAllImages] = useState<imageArr | null>(null);
  const [gotImages, setGotImages] = useState(false);

  useEffect(() => {
    axios.get('/api/images')
      .then(({ data }) => {
        setAllImages(data);
      })
      .then(() => {
        setGotImages(true);
      })
      .catch((err) => {
        console.error('error on get images from db client\n', err);
      })
  }, [gotImages]);

  return (
    <div className="container">
      <h1 style={{ fontFamily: 'Montserrat', color: "whitesmoke", display: "flex", justifyContent: "center", alignContent: "center", fontSize: "2.5em"}} >Gallery</h1>
      <ImagePost setGotImages={setGotImages} />
      {
        allImages ?
          <ImageCards allImages={allImages} />
          :
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
      }
      {/* <Comments allImages={allImages} /> */}
    </div>
  );
}
export default Gallery;
