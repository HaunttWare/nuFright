import React from "react";
import  {galleryProps, imageArr, image}  from "./galleryProps.component";
import ImageCardEntry from './ImageCardEntry.component';

const ImageCards = ({ allImages }: galleryProps) => {
  return (
    <div className="container text-center">
      <div className="row row-cols-3">
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
    </div>
  )
}

export default ImageCards;

/* <div class="container text-center">
  <div class="row row-cols-2">
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
    <div class="col">Column</div>
  </div>
</div> */