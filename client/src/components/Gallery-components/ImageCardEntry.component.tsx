import React from "react";
import  {galleryProps, imageArr, image}  from "./galleryProps.component";


const ImageCardEntry = ({ image }: image) => {
  return (
    <div className="card" style={{ width: '18rem'}} >
      <img src={image.image} className="card-img-top" alt="..."   />
      <div className="card-body">
        <h4 className="card-title" style={{color: 'black'}} >{image.userId.slice(0, 6)}</h4>
        <p className="card-text" >{ image.caption }</p>
      </div>
    </div>
  )
}

export default ImageCardEntry;