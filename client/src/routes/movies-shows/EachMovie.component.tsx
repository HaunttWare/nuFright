import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { MoviesData } from "../../store/movies/movies.action";
import Comments from "../../components/comments/comments";
import Rating from "../../components/boo-scale/rating.component";

import "./movie.styles.scss";
import { CoverImage } from "./films.styles";

type MovieProp = {
  movie: MoviesData;
};

const EachMovie = ({ movie }: MovieProp) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleLike = () => {
    if (currentUser) {
      axios
        .post(`/api/movies/${movie.id}/like`, {
          userId: currentUser.id,
          likedId: likeId,
          isLiked: !isLiked,
        })
        .then(({ data }) => {
          setLikeId(data.id);
          setIsLiked(!isLiked);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    if (movie.likedBy) {
      const liked = movie.likedBy.find(
        (like) => like.userId === currentUser.id
      );
      if (liked) {
        setIsLiked(true);
        setLikeId(liked.id);
      }
    }
  }, [movie, currentUser.id]);

  return (
    <>
      <div className="movie_card" id="bright">
        <div className="info_section">
          <div className="movie_header">
            <img className="locandina" src={movie.images} />
            <h1>{movie.title}</h1>
            <p className="type">{movie.genres}</p>
          </div>
          <div className="movie_desc">
            <p className="text">{movie.description}</p>
          </div>
          <Rating id={movie.id} type={"cinema"} />
          <div className="movie_social">
            <ul>
              <li>
                <i
                  className="fa-solid fa-heart"
                  onClick={handleLike}
                  style={{ color: isLiked ? "red" : "" }}
                ></i>
              </li>
              <li>
                <i
                  className="fa-solid fa-message"
                  onClick={handleShowComments}
                ></i>
              </li>
            </ul>
          </div>
        </div>
        <CoverImage image={movie.images} />
      </div>
      {showComments && <Comments category={movie} type={"cinema"} />}
    </>
  );
};

export default EachMovie;
