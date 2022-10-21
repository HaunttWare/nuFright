import React from "react";
import {image} from "./galleryProps.component";
import Rating from "../boo-scale/rating.component";

const ImageCardEntry = ({image}: image) => {

  return (
    <div className="card p-2 mb-5 " style={{ width: "15rem" }} >
      <img src={image.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title" style={{ color: 'black' }}>{ image.user.name }</h5>
        <p className="card-text" style={{ color: 'black' }} >{image.caption}</p>
        <Rating id={image.id} type={'image'} />
      </div>
    </div>
  )
}

export default ImageCardEntry;