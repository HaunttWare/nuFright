import React from 'react';
import { BooScale, Likes, Savedlist } from '@prisma/client';

type ShowProp = {
  show: {
    id: string,
    title: string,
    description: string, 
    genres: string,
    type: string,
    images: string,
    ratings: BooScale,
    likedBy: Likes,
    savedBy: Savedlist
  }
}
const EachShow = ({ show } : ShowProp) => {
  return (
    <div className='container'>
    <h4>{show.title}</h4>
    <h6>{show.genres}</h6>
    <img src={show.images}></img>
    <p>{show.description}</p>
  </div>

  )
}

export default EachShow;