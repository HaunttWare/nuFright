import React from "react";
import  {galleryProps}  from "./galleryProps.component";
import ImageCardEntry from './ImageCardEntry.component';

const ImageCards = ({ allImages }: galleryProps) => {
  return (
    <div className="d-inline-flex flex-row p-2 flex-wrap row ">
      {
        allImages.map((card) => {
          return (
            <div className="col" >
              <ImageCardEntry image={card} />
            </div>
          )
        })
        }
    </div>
  )
}

export default ImageCards;


