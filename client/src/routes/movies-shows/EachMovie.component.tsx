import React, { useEffect, useState } from 'react';
import { BooScale, Likes, Savedlist } from "@prisma/client";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import axios from 'axios';

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
  const [checkIsLiked, setCheckIsLiked] = useState(false); 
  const [isSaved, setIsSaved] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  console.log('user', currentUser);

const handleLikeSelect = () => {
  axios.post('/movies/like', {
    userId: currentUser.id,
    cinemaId: movie.id,
    isLiked: true
  })
  .then(() => {
    setCheckIsLiked(true);
  })
  .catch((err) => {
    console.error(err);
  })
}

const handleUnlikeSelect = () => {
setCheckIsLiked(false);
  // axios.delete(`/movies/unlike/${movie.id}`, {id: currentUser.id, cinemaId: movie.id})
//   .then(() => {
//     setCheckIsLiked(false);
//   })
//   .catch((err) => {
//     console.error(err)
//   })
 }

const handleSavedRender = () => {
  setIsSaved(true);

}
const handleUnSaveRender = () => {
 setIsSaved(false);
}

const isLikedRender = () => {
  if (checkIsLiked) {
    return (<button onClick={handleUnlikeSelect}>Unlike</button>)
  } else {
    return (<button onClick={handleLikeSelect}>Like</button>)
  }
};
const isSavedRender = () => {
  if (isSaved) {
    return (<button onClick={handleUnSaveRender}>Unsave</button>)
  } else {
    return (<button>save</button>)
  }
};
useEffect(() => {

}, [checkIsLiked])
  return (
    <div className='container'>
    <h4>{movie.title}</h4>
    <h6>{movie.genres}</h6>
    <img src={movie.images}></img>
    <p>{movie.description}</p>
    {isLikedRender()}
    {isSavedRender()}
  </div>
  )
};

export default EachMovie;


// I might use this card later on
// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
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