import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { ShowData } from "../../store/shows/shows.action";
import Comments from "../../components/comments/comments";
import Rating from "../../components/boo-scale/rating.component";

import { CoverImage } from "./films.styles";

type ShowProp = {
  show: ShowData;
};
const EachShow = ({ show }: ShowProp) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleLike = () => {
    axios
      .post(`/api/shows/${show.id}/like`, {
        userId: currentUser.id,
        likedId: likeId,
        isLiked: !isLiked,
      })
      .then(({ data }) => {
        setLikeId(data.id);
        setIsLiked(!isLiked);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!currentUser) return;
    if (show.likedBy) {
      const liked = show.likedBy.find((like) => like.userId === currentUser.id);
      if (liked) {
        setIsLiked(true);
        setLikeId(liked.id);
      }
    }
  }, [show, currentUser.id]);

  return (
    <>
      <div className="movie_card" id="bright">
        <div className="info_section">
          <div className="movie_header">
            <img className="locandina" src={show.images} />
            <h1>{show.title}</h1>
            <p className="type">{show.genres}</p>
          </div>
          <div className="movie_desc">
            <p className="text">{show.description}</p>
          </div>
          <Rating id={show.id} type={"cinema"} />
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
        <CoverImage image={show.images} />
      </div>
      {showComments && <Comments category={show} type={"cinema"} />}
    </>
  );
};

export default EachShow;
