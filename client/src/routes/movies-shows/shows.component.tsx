import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentShows, ShowData } from '../../store/shows/shows.action';
import { selectCurrentShows } from '../../store/shows/shows.selector';
import EachShow from './EachShow.component';
import Pagination from '../../components/pagination/pagination.component';
import Comments from '../../components/comments/comments';
import Rating from '../../components/boo-scale/rating.component';

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

  // const getShows = () => {
  //   axios.get('/api/shows')
  //     .then(({ data }) => {
  //         dispatch(setCurrentShows(data));
  //     })
  // };

  useEffect(() => {
    // getShows();
    setCurrentShowsLoaded(true);
  }, []);

  return (
    <>
      {currentShows.length ? (
        currentShows.map((show: ShowData) => {
          return (
            <div>
              <EachShow show={show} />
            </div>
          )
        })
      ) : (
        <div>loading...</div>
      )}
    </>
  )
};

export default Shows;

      //     <div className='movie_card' id='bright'>
      //       <div className='info_section'>
      //         <div className='movie_header'>
      //           <img className='locandina' src={show.images} />
      //           <h1>{show.title}</h1>
      //           <h4>add director and year here</h4>
      //           <span className='minutes'>add show length here</span>
      //           <p className='type'>{show.genres}</p>
      //         </div>
      //         <div className='movie_desc'>
      //           <p className='text'>{show.description}</p>
      //         </div>
      //         <div className='movie_social'>
      //           <ul>
      //             <li>
      //               <i className='fa-solid fa-share-nodes'></i>
      //             </li>
      //             <li>
      //               <i className='fa-solid fa-heart'></i>
      //             </li>
      //             <li>
      //               <i className='fa-solid fa-message'></i>
      //             </li>
      //           </ul>
      //           <Comments category={show} type={'cinema'} />
      //           <Rating id={show.id} type={'cinema'} />
      //         </div>
      //       </div>
      //       <div className='blur_back bright_back'></div>
      //     </div>
      //   ))
      // ) : (
      //   <div className='d-flex justify-content-center'>
      //     <div className='spinner-border' role='status'>
      //       <span className='sr-only'>Loading...</span>
      //     </div>
      //   </div>