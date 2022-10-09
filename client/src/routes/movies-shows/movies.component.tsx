import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMovies, MoviesData } from "../../store/movies/movies.action";
import { selectCurrentMovies } from "../../store/movies/movies.selector";
import EachMovie from "./EachMovie.component";

const Movies = () => {
  const currentMovies = useSelector(selectCurrentMovies);
  const [currentMoviesLoaded, setCurrentMoviesLoaded] = useState(false);
  const dispatch = useDispatch();


  const getMovies = () => {
    axios.get('/movies')
      .then(({ data }) => {
       dispatch(setCurrentMovies(data));
      })
  }; 

  useEffect(() => {
    getMovies();
    setCurrentMoviesLoaded(true);
  }, []);

console.log(currentMovies);

return (
  <div className="container">
    <h1>Movies</h1>
    { currentMovies?.map((movie: MoviesData, i: number) => {
      console.log(movie);
      return (
        <EachMovie key={`${movie} @ ${i}`} movie={movie} />
      )
    }) }
  </div>

)
};

export default Movies;
