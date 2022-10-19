import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { MoviesData } from "../../store/movies/movies.action";
import Comments from '../../components/comments/comments';

type MovieProp = {
  movie: MoviesData;
};

const EachMovie = ({ movie }: MovieProp) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [saveId, setSaveId] = useState("");

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

  const handleSave = () => {
    if (currentUser) {
      axios
        .post(`/api/movies/${movie.id}/save`, {
          userId: currentUser.id,
          savedId: saveId,
          isSaved: !isSaved,
        })
        .then(({ data }) => {
          setSaveId(data.id);
          setIsSaved(!isSaved);
        })
        .catch((err) => console.log(err));
    }
  };

  if (currentUser) {
  useEffect(() => {

    if (movie.likedBy) {
      const liked = movie.likedBy.find(
        (like) => like.userId === currentUser.id
        );
        if (liked) {
          setIsLiked(true);
          setLikeId(liked.id);
        }
      }
      if (movie.savedBy) {
        const saved = movie.savedBy.find(
          (save) => save.userId === currentUser.id
          );
          if (saved) {
            setIsSaved(true);
            setSaveId(saved.id);
          }
        }
      }, [movie, currentUser.id]);
    }

  return (
    <div className="col-md-3 col-sm-6">
      <div className="card">
        <img src={movie.images} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          {/* movie genre */}
          <p className="card-text">
            <small className="text-muted">{movie.genres}</small>
          </p>
          <p className="card-text">{movie.description}</p>
          <button className="btn btn-secondary" onClick={handleLike}>
            {isLiked ? "Unlike" : "Like"}
          </button>
          <button className="btn btn-secondary" onClick={handleSave}>
            {isSaved ? "Unsave" : "Save"}
          </button>
          <Comments category={movie} type={'cinema'} />
        </div>
      </div>
    </div>
  );
};

export default EachMovie;
