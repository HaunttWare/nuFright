import React from "react";
import { ImageData } from "../../../routes/profile/profile.component";

type PhotosTabProps = {
  userImages: ImageData[];
};

const PhotosTab = ({ userImages }: PhotosTabProps) => {
  return (
    <div className="card-body p-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="lead fw-normal mb-0">Uploaded photos</p>
      </div>
      <div className="row g-2">
        {userImages.map((image) => (
          <div className="col-6 col-md-4 col-lg-3" key={image.id}>
            <img
              src={image.image}
              alt="user-photo"
              className="w-100 rounded-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosTab;
