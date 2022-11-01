import React from "react";
import { image } from "./galleryProps.component";
import Rating from "../boo-scale/rating.component";
import Swal from 'sweetalert2';


const ImageCardEntry = ({ image }: image) => {

  const handleImageClick = () => {
    console.log('Image click', image.image)

    Swal.fire({
      imageUrl: image.image,
      imageAlt: '',
      background: '#181a1b',
      color: '#fff',
      showConfirmButton: false,
      showCloseButton: true
    })
  }

  return (
    <div className="card text-black" >
      <img
        src={image.image}
        onClick={(e) => {handleImageClick()}}
        className="card-img-top"
        style={{ width: "100%", height: "150px", objectFit: "cover", backgroundColor: '#181a1b'}}
        alt="..."
      />
      <div className="card-body" style={{ color: 'white', backgroundColor: '#181a1b' }} >
        <h5 className="card-title" style={{ color: 'white' }} >
          <b>{image.user.name}</b>
        </h5>
        <hr />
        <p className="card-text pb-3 text-white"> - {image.caption}</p>
        <Rating id={image.id} type={"image"} />
      </div>
    </div>
  );
};

export default ImageCardEntry;
