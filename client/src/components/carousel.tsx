import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { MoviesData } from '../store/movies/movies.action';

const CreepyCarousel = ({ movies }: any) => {
  return (
    <Carousel className="w-50">
      <Carousel.Item>
        <img
          className="d-block w-50"
          src="https://image.tmdb.org/t/p/w500//hiaeZKzwsk4y4atFhmncO5KRxeT.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Smile</h3>
          <p>Horror,Mystery,Thriller</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50"
          src="https://image.tmdb.org/t/p/w500//pHkKbIRoCe7zIFvqan9LFSaQAde.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Orphan: First Kill</h3>
          <p>Horror,Thriller</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50"
          src="https://image.tmdb.org/t/p/w500//zfE0R94v1E8cuKAerbskfD3VfUt.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>It Chapter Two</h3>
          <p>
          Horror,Fantasy
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CreepyCarousel;