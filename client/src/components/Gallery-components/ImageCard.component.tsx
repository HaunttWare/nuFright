import React from "react";
import  {galleryProps, imgs}  from "./galleryProps.component";

const ImageCard = ({ allImages }: galleryProps) => {
  let cTitle = (allImages[0].userId).slice(0, 6);

  return (
    <div className="card">
      <img src={allImages[0].image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title" >{cTitle}</h5>
        <p className="card-text" >{ allImages[0].caption }</p>
      </div>
    </div>
  )
}

export default ImageCard;