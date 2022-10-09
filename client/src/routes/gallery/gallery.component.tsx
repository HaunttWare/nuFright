import axios from "axios";
import React, { useEffect, useState } from "react";
import ImagePost from '../../components/Gallery-components/galleryPost.component';


const Gallery = () => {
  const [allImages, setAllImages] = useState([]);
  

  useEffect(() => {
    axios.get('/images')
    .then(({data}) => {
      console.log('images from database', data);

    })
    .catch((err) => {
      console.error('error on get images from db client\n', err);
    })
  })

  return (
    <div className="container">
      <h1>Gallery</h1>
      <ImagePost />
      
    </div>
  );
}
export default Gallery;
