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
// I might use this card later on
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// <Row xs={1} md={2} className="g-4">
//   {Array.from({ length: 2 }).map((_, idx) => (
  //     <Col>
//       <Card>
//         <Card.Img variant="top" src={movie.images} />
//         <Card.Body>
//           <Card.Title>{movie.title}</Card.Title>
//           <Card.Text>
//             {movie.description}
//           </Card.Text>
//           <Card.Text>
//             {movie.genres}
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </Col>
//   ))}
// </Row>