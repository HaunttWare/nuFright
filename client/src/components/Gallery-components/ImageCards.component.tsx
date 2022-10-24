import React from "react";
import { galleryProps } from "./galleryProps.component";
import ImageCardEntry from './ImageCardEntry.component';

const ImageCards = ({ allImages }: galleryProps) => {
  return (
    <div className="row">
      {allImages.map((image, index) => {
        return (
          <div className="col-4" key={index}>
            <ImageCardEntry image={image} />
          </div>
        );
      })}
    </div>
  )
}

export default ImageCards;


