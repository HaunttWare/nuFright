import React from "react";
import { galleryProps } from "./galleryProps.component";
import ImageCardEntry from './ImageCardEntry.component';

const ImageCards = ({ allImages }: galleryProps) => {
  return (
    <div className="
      d-flex
      flex-row
      flex-wrap
      justify-content-between
      row-cols-3
      align-items-center"
    >
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


