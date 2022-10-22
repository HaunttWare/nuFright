import React, { useEffect, useState } from 'react';
import CreepyCarousel from '../../components/carousel/carousel';
import { useSelector } from 'react-redux';
import { setCurrentMovies, MoviesData } from '../../store/movies/movies.action';
import { selectCurrentMovies } from '../../store/movies/movies.selector';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './home.style.scss';
import { setCurrentShows, ShowData } from '../../store/shows/shows.action';
import { selectCurrentShows } from '../../store/shows/shows.selector';

type TopFilms = ShowData & MoviesData

const Home = () => {
  const movies = useSelector(selectCurrentMovies);
  const shows = useSelector(selectCurrentShows)
  const dispatch = useDispatch();
  const [topFilms, setTopFilms] = useState<TopFilms[]>([])

  const getContents = async () => {
    try {
      const movieData = await axios.get('/api/movies');
      dispatch(setCurrentMovies(movieData.data));
      const showData = await axios.get('/api/shows');
      dispatch(setCurrentShows(showData.data));
      setTopFilms([...movieData.data.slice(0, 3), ...showData.data.slice(0, 3)])
    } catch (err) {
      console.log('error fetching film content', err);
    }
  };

  useEffect(() => {
    getContents();
  }, []);
 
  return (
    <div
      className='vh-100 d-flex justify-content-center align-items-center'
      style={{
        width: '100%',
      }}
    >
      <CreepyCarousel contents={topFilms} />
    </div>
  );
};

export default Home;
