import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentMovies, MoviesData } from '../../store/movies/movies.action';
import { selectCurrentMovies } from '../../store/movies/movies.selector';
import EachMovie from './EachMovie.component';
import Pagination from '../../components/pagination/pagination.component';
import './movie.styles.scss';

const Movies = () => {
  const currentMovies = useSelector(selectCurrentMovies);
  const [currentMoviesLoaded, setCurrentMoviesLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(20);
  const dispatch = useDispatch();

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const PagesOfMovies = currentMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentMoviesLoaded(true);
  }, []);
  
  return (
    <>
      {currentMovies.length ? (currentMovies.map((movie: MoviesData) => (
          <div className='movie_card' id='bright'>
            <div className='info_section'>
              <div className='movie_header'>
                <img
                  className='locandina'
                  src={movie.images}
                />
                <h1>{movie.title}</h1>
                <h4>add director and year here</h4>
                <span className='minutes'>add movie length here</span>
                <p className='type'>{movie.genres}</p>
              </div>
              <div className='movie_desc'>
                <p className='text'>{movie.description}</p>
              </div>
              <div className='movie_social'>
                <ul>
                  <li>
                    <i className='fa-solid fa-share-nodes'></i>
                  </li>
                  <li>
                    <i className='fa-solid fa-heart'></i>
                  </li>
                  <li>
                    <i className='fa-solid fa-message'></i>
                  </li>
                </ul>
              </div>
            </div>
            <div className='blur_back bright_back'></div>
          </div>
        ))) : (
        <div className='d-flex justify-content-center'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Movies;
