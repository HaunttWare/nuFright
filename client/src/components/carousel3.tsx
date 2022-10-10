import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Carousel3 = () => {

    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://static.wikia.nocookie.net/scary-stories-to-tell-in-the-dark/images/a/a9/Haunted.png/revision/latest?cb=20200922144620"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media1.popsugar-assets.com/files/thumbor/xrM0nIS3W_cwhA6P7rbWjUWMFqE/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2014/11/21/847/n/1922283/d840f7ac34eb16ba_thumb_temp_cover_file143449891416595157/i/Scary-Stories-Tell-Dark-Original-Artwork.jpg"
            alt="Second slide"
          />
  
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9WwXEo5s3ULeaX1XU4n5J8gWLuI7rtYtA5Q&usqp=CAU"
            alt="Third slide"
          />
  
          <Carousel.Caption>
            <h3></h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  
}

export default Carousel3;