import React from "react";
import { image } from "./galleryProps.component";
import Rating from "../boo-scale/rating.component";

const ImageCardEntry = ({ image }: image) => {
  return (
    <div className="card text-black" >
      <img
        src={image.image}
        className="card-img-top"
        style={{ width: "100%", height: "150px"}}
        alt="..."
      />
      <div className="card-body" style={{ color: 'black' }} >
        <h5 className="card-title" style={{ color: 'black' }} >
          <b>{image.user.name}</b>
        </h5>
        <hr />
        <p className="card-text pb-3 text-black"> - {image.caption}</p>
        <Rating id={image.id} type={"image"} />
      </div>
    </div>
  );
};

export default ImageCardEntry;
