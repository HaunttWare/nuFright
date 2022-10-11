import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMovies, MoviesData } from "../../store/movies/movies.action";
import { selectCurrentMovies } from "../../store/movies/movies.selector";
import EachMovie from "./EachMovie.component";
import Pagination from "../../components/pagination/pagination.component";

const Movies = () => {
  const currentMovies = useSelector(selectCurrentMovies);
  const [currentMoviesLoaded, setCurrentMoviesLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(20);
  const dispatch = useDispatch();

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const PagesOfMovies = currentMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getMovies = () => {
    axios.get('/movies')
      .then(({ data }) => {
        data.forEach((movie: MoviesData) => {
          if (movie.type === 'movie') {
            dispatch(setCurrentMovies(data));
          }
        })
      })
  };  

  useEffect(() => {
    getMovies();
    setCurrentMoviesLoaded(true);
  }, []);

console.log('in movies' ,currentMovies);

return (
  <div className="cinema-container">
    <h1>Movies</h1>
    { PagesOfMovies?.map((movie: MoviesData, i: number) => {
      return (
        <EachMovie key={`${movie} @ ${i}`} movie={movie} />
      )
    }) }
    <Pagination 
    booksPerPage={moviesPerPage}
    totalBooks={currentMovies.length}
    paginate={paginate}
    />
  </div>

)
};

export default Movies;
