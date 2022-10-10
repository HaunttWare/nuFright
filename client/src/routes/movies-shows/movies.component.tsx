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
        data.forEach((movie: MoviesData) => {
          if (movie.type === 'movie') {
            dispatch(setCurrentMovies(data.slice(0, 50)));
          }
        })
      })
  };  

  useEffect(() => {
    getMovies();
    setCurrentMoviesLoaded(true);
  }, []);

<<<<<<< HEAD
// console.log(currentMovies);
=======
console.log('in movies' ,currentMovies);
>>>>>>> 030a78dfc8ebc8d40657b7c24ce087c7d1f3c21c

return (
  <div className="cinema-container">
    <h1>Movies</h1>
    { currentMovies?.map((movie: MoviesData, i: number) => {
      return (
        <EachMovie key={`${movie} @ ${i}`} movie={movie} />
      )
    }) }
  </div>

)
};

export default Movies;
