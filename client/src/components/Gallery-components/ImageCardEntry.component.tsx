import React from "react";
import  {galleryProps, imageArr, image}  from "./galleryProps.component";
import Rating from "../boo-scale/rating.component";

const ImageCardEntry = ({ image }: image) => {
  return (
    <div className="card" style={{ width: '18rem'}} >
      <img src={image.image} className="card-img-top" alt="..."   />
      <div className="card-body">
        <p className="card-text" style={{ color: 'black' }} >{image.caption}</p>
        <Rating id={image.id} />
      </div>
    </div>
  )
}

export default ImageCardEntry;