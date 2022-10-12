import React from "react";

const PhotosTab = () => {
  return (
    <div className="card-body p-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="lead fw-normal mb-0">Uploaded photos</p>
        <p className="mb-0">
          <a href="#!" className="text-muted">
            Show all
          </a>
        </p>
      </div>
      <div className="row g-2">
        <div className="col mb-2">
          <img
            src="https://tinyurl.com/4wwv3dxy"
            alt="image 1"
            className="w-100 rounded-3"
          />
        </div>
        <div className="col mb-2">
          <img
            src="https://tinyurl.com/3m7xcfyy"
            alt="image 1"
            className="w-100 rounded-3"
          />
        </div>
      </div>
      <div className="row g-2">
        <div className="col">
          <img
            src="https://tinyurl.com/4kaap6kv"
            alt="image 1"
            className="w-100 rounded-3"
          />
        </div>
        <div className="col">
          <img
            src="https://tinyurl.com/452azerx"
            alt="image 1"
            className="w-100 rounded-3"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotosTab;
