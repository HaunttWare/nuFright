import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import { MoviesData } from '../../store/movies/movies.action';

const CreepyCarousel = ({ contents }: any) => {
  console.log(contents);
  return (
    <div className='d-flex flex-column align-items-center'>
      <h3>Top Shows/Movies</h3>
      <Carousel className='w-100'>
        {contents.map((content: any) => (
          <Carousel.Item>
            <img
              className='d-block mx-auto'
              style={{
                width: '400px',
                height: '400px',
                objectFit: 'fill',
              }}
              src={content.images}
              alt={content.type}
            />
            {/* <Carousel.Caption>
              <h3>Smile</h3>
              <p>Horror,Mystery,Thriller</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CreepyCarousel;
