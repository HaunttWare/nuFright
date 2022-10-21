import axios from "axios";
import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { ShowData } from "../../store/shows/shows.action";
import Comments from '../../components/comments/comments';
import Rating from '../../components/boo-scale/rating.component';

type ShowProp = {
  show: ShowData
};
const EachShow = ({ show }: ShowProp) => {
  const currentUser = useSelector(selectCurrentUser);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [saveId, setSaveId] = useState("");

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

  const handleSave = () => {
    axios
      .post(`/api/shows/${show.id}/save`, {
        userId: currentUser.id,
        savedId: saveId,
        isSaved: !isSaved,
      })
      .then(({ data }) => {
        setSaveId(data.id);
        setIsSaved(!isSaved);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (show.likedBy) {
      const liked = show.likedBy.find(
        (like) => like.userId === currentUser.id
      );
      if (liked) {
        setIsLiked(true);
        setLikeId(liked.id);
      }
    }
    if (show.savedBy) {
      const saved = show.savedBy.find(
        (save) => save.userId === currentUser.id
      );
      if (saved) {
        setIsSaved(true);
        setSaveId(saved.id);
      }
    }
  }, [show, currentUser.id]);

  return (
    <div className="col-md-3 col-sm-6">
      <div className="card">
        <img src={show.images} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{show.title}</h5>
          <p className="card-text">
            <small className="text-muted">{show.genres}</small>
          </p>
          <p className="card-text">{show.description}</p>
          <button className="btn btn-secondary" onClick={handleLike}>
            {isLiked ? "Unlike" : "Like"}
          </button>
          <button className="btn btn-secondary" onClick={handleSave}>
            {isSaved ? "Unsave" : "Save"}
          </button>
          <Rating id={show.id} type={'cinema'} />
          <Comments category={show} type={'cinema'} />
        </div>
      </div>
    </div>
  );
  
};

export default EachShow;
