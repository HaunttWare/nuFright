import React, { useEffect, useState } from "react";
import CreepyCarousel from "../../components/carousel/carousel";
import { useSelector } from "react-redux";
import { setCurrentMovies, MoviesData } from "../../store/movies/movies.action";
import { selectCurrentMovies } from "../../store/movies/movies.selector";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCurrentShows, ShowData } from "../../store/shows/shows.action";
import { selectCurrentShows } from "../../store/shows/shows.selector";
import { fetchEvents } from "../../config/apiCalls";

type TopFilms = ShowData & MoviesData;

const Home = () => {
  const movies = useSelector(selectCurrentMovies);
  const shows = useSelector(selectCurrentShows);
  const dispatch = useDispatch();
  const [topFilms, setTopFilms] = useState<TopFilms[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  const getContents = async () => {
    try {
      const movieData = await axios.get("/api/movies");
      dispatch(setCurrentMovies(movieData.data));
      const showData = await axios.get("/api/shows");
      dispatch(setCurrentShows(showData.data));
      setTopFilms([
        ...movieData.data.slice(0, 3),
        ...showData.data.slice(0, 3),
      ]);
    } catch (err) {
      console.log("error fetching film content", err);
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      // get the user's location

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          // convert the user's location to a city name
          const location = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const city = location.data.locality;

          // get the events for the user's city
          const events = await fetchEvents(city);

          setEvents(events);
        });
      }
    };
    getEvents();
    getContents();
  }, []);

  // useEffect(() => {
  //   getContents();
  // }, []);

  return (
    //  display the carousel on the left side of the page and the events on the right side as a side bar
    <div className="home">
      <div className="home__carousel">
        <CreepyCarousel contents={topFilms} />
      </div>
      <div className="home__events">
        <h2>Events</h2>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.title}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events in your area</p>
        )}
      </div>
    </div>
  );
};

export default Home;

 // <div
    //   className='vh-100 d-flex justify-content-center align-items-center'
    //   style={{
    //     width: '100%',
    //   }}
    // >
    //   <CreepyCarousel contents={topFilms} />
    // </div>
