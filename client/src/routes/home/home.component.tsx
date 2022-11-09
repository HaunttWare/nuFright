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

import "./home.styles.scss";

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
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            // convert the user's location to a city name
            const location = await axios.get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const city = location.data.city;

            // get the events for the user's city
            const events = await fetchEvents(city);
            setEvents(events);
          });
        }
      } catch (err) {
        console.log("error fetching events", err);
      }
    };
    getEvents();
    getContents();
  }, []);


  return (
    // a container with the carousel on the left and the events on the right side of the screen using bootstrap
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          
   
          <CreepyCarousel contents={topFilms} />
        </div>
        <div className="col-6">
          <div className="container">
         {/* header centered saying events for today with big font*/}
            <h1 className="text-center mb-4 display-4 text-white">Events for Today</h1>
            {events.length > 0 ? (
              events.map((event) => (
                <div className="row align-items-center event-block no-gutters margin-40px-bottom">
                  <div className="col-lg-5 col-sm-12">
                    <div className="position-relative">
                      <img src={event.image} alt="event banner" />
                      <div className="events-date">
                        <div className="font-size28">{event.day}</div>
                        <div className="font-size14">{event.month}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-sm-12">
                    <div className="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
                      <h5 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                        <a
                          href={event.link}
                          target="_blank"
                          className="text-theme-color"
                        >
                          {event.title}
                        </a>
                      </h5>
                      {/* span saying check this event */}
                      <span className="text-muted">
                        Check this event out
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // if there are no events, display a message saying no events available centered 
              <h3 className="text-center mb-4 text-white">No events available</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
