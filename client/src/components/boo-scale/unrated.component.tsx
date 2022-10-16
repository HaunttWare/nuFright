import axios from 'axios';
import React from 'react';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";


const Unrated = (id: {id: string }) => {
  const currentUser = useSelector(selectCurrentUser);

  const handleRate = (rating: number) => {
    axios.post('/api/ratings/images', {
      userId: currentUser.id,
      horrorId: id,
      rating
    })
    .then(({data}) => {
      console.log('successfully rated image\n', data);
    })
    .catch((err) => {
      console.error('error on rating image\n', err);
    })
  }
  
  return (
    <div className="btn-group me-1" role="group" >
      <button type="button"  className="btn btn-primary" onClick={() => { handleRate(1); }} >
      <i className="icon bi-star"></i>
      </button>
      <button type="button" className="btn btn-primary"onClick={() => { handleRate(2); }} >
      <i className="icon bi-star"></i>
      </button>
      <button type="button" className="btn btn-primary" onClick={() => { handleRate(3); }} >
      <i className="icon bi-star"></i>
      </button>
      <button type="button" className="btn btn-primary" onClick={() => { handleRate(4); }} >
      <i className="icon bi-star"></i>
      </button>
      <button type="button" className="btn btn-primary" onClick={() => { handleRate(5); }} >
      <i className="icon bi-star"></i>
      </button>
    </div>
  )
};

export default Unrated;