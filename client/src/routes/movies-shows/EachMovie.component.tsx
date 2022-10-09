import React from 'react';
import { BooScale, Likes, Savedlist } from "@prisma/client";

type MovieProp = {
 movie:{
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
const EachMovie = ({ movie } : MovieProp) => {

  return (
  <div className='container'>
    <h4>{movie.title}</h4>
    <h6>{movie.genres}</h6>
    <img src={movie.images}></img>
    <p>{movie.description}</p>
  </div>
  )
}

export default EachMovie;