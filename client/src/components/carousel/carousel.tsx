import React from "react";
import Carousel from "react-bootstrap/Carousel";

const CreepyCarousel = ({ contents }: any) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="mb-4 display-6 text-white">Latest Shows/Movies</h3>
      <Carousel className="w-100" indicators={false}>
        {contents.map((content: any) => (
          <Carousel.Item>
            <div className="card mx-auto" style={{width: "400px", height: "auto", backgroundColor: "#1a1a1a"}}>
              <img
                className="card-img-top"
                style={{
                  width: "400px",
                  height: "auto",
                  objectFit: "fill",
                  }}
                src={content.images}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{content.title}</h5>
                <p className="card-text">{content.description}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CreepyCarousel;
