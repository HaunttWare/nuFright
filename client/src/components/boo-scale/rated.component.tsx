import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";


const Rated = ( {id, score, setScore, type}:{ id: string; score: number; setScore: React.Dispatch<React.SetStateAction<number>>; type: string; }) => {
  const currentUser = useSelector(selectCurrentUser);

  const handleRate = (rating: number) => {
    axios.post(`/api/ratings/images${type}`, {
      userId: currentUser.id,
      horrorId: id,
      rating
    })
    .then(({data}) => {
      console.log('successfully rated image\n', data);
      setScore(rating);
    })
    .catch((err) => {
      console.error('error on rating image\n', err);
    })
  }
  
  const handleIcon = (num: number) => {
    if (score >= num) {
      return (<i className="icon bi-star-fill"></i>)
    } else {
      return (<i className="icon bi-star"></i>)
    }
  }
  
  useEffect(() => {

  }, [score]);

  return (
    <div className="btn-group me-1" role="group" >
      <button type="button"  className="btn btn-danger" onClick={() => { handleRate(1); }} >
      {handleIcon(1)}
      </button>
      <button type="button" className="btn btn-danger"onClick={() => { handleRate(2); }} >
      {handleIcon(2)}
      </button>
      <button type="button" className="btn btn-danger" onClick={() => { handleRate(3); }} >
      {handleIcon(3)}
      </button>
      <button type="button" className="btn btn-danger" onClick={() => { handleRate(4); }} >
      {handleIcon(4)}
      </button>
      <button type="button" className="btn btn-danger" onClick={() => { handleRate(5); }} >
      {handleIcon(5)}
      </button>
    </div>
  )
};

export default Rated;