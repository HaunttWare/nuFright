import React, {useEffect} from "react";
import CreepyCarousel from "../../components/carousel";
import { useSelector } from "react-redux";
import { setCurrentMovies, MoviesData } from "../../store/movies/movies.action";
import { selectCurrentMovies } from "../../store/movies/movies.selector";
import { useDispatch } from "react-redux";
import axios from "axios";
import Carousel2 from "../../components/carousel2";
import Carousel3 from "../../components/carousel3";

const Home = () => {
  const currentMovies = useSelector(selectCurrentMovies);
  const dispatch = useDispatch();

  const getMovies = () => {
    axios.get('/api/movies')
      .then(({ data }) => {
        data.forEach((movie: MoviesData) => {
          if (movie.type === 'movie') {
            dispatch(setCurrentMovies(data.slice(0, 5)));
          }
        })
      })
  };  

  useEffect(() => {
    getMovies();
  }, []);


  return (
  <div className="container">
    <h1 style={{fontFamily: 'Creepster, cursive' }}>Welcome to nuFright</h1>
    <h2 style={{fontFamily: 'Creepster, cursive' }} >The one stop shop for all of you freaks out there 😈 </h2><br></br>
    <h3 style={{fontFamily: 'Creepster, cursive' }}>Top Shows/Movies</h3>
    <CreepyCarousel />
    <br></br>
    <h3 style={{fontFamily: 'Creepster, cursive' }}>Top Haunts:</h3>
    <Carousel2 /><br></br>
    <h3>Favoirte tales of terror:</h3>
    <Carousel3 /><br></br>
  </div>

  )
  };

export default Home;
