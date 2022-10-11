import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setCurrentShows, ShowData } from "../../store/shows/shows.action";
import { selectCurrentShows } from "../../store/shows/shows.selector";
import EachShow from "./EachShow.component";
import Pagination from "../../components/pagination/pagination.component";

const Shows = () => {
  const currentShows = useSelector(selectCurrentShows);
  const [currentShowsLoaded, setCurrentShowsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showsPerPage] = useState(20);
  const dispatch = useDispatch();

  const indexOfLastShow = currentPage * showsPerPage;
  const indexOfFirstShow = indexOfLastShow - showsPerPage;
  const PagesOfShows = currentShows.slice(indexOfFirstShow, indexOfLastShow);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getShows = () => {
    axios.get('/api/shows')
      .then(({ data }) => {
          console.log(data);
          dispatch(setCurrentShows(data));
      })
  };

  useEffect(() => {
    getShows();
    setCurrentShowsLoaded(true);
  }, []);

  console.log('in showssss', currentShows);

return (
  <div className="cinema-container">
    <h1>Shows</h1>
    { PagesOfShows?.map((show: ShowData, i: number) => {
      return (
        <EachShow key={`${show} @ ${i}`} show={show} />
      )
    }) }
    <br></br>
    <Pagination 
      booksPerPage={showsPerPage}
      totalBooks={currentShows.length}
      paginate={paginate}
    />
  </div>
)
};

export default Shows;
