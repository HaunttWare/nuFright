import axios from "axios";
import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { ShowData } from "../../store/shows/shows.action";
import Comments from '../../components/comments/comments';
import Rating from '../../components/boo-scale/rating.component';
import { selectCurrentShows } from "../../store/shows/shows.selector";

type ShowProp = {
  show: ShowData;
};
const EachShow = ({ show }: ShowProp) => {
  const currentUser = useSelector(selectCurrentUser);
  const currentShows = useSelector(selectCurrentShows);
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

  // const handleSave = () => {
  //   axios
  //     .post(`/api/shows/${show.id}/save`, {
  //       userId: currentUser.id,
  //       savedId: saveId,
  //       isSaved: !isSaved,
  //     })
  //     .then(({ data }) => {
  //       setSaveId(data.id);
  //       setIsSaved(!isSaved);
  //     })
  //     .catch((err) => console.log(err));
  // };
  const isLikedRender = () => {
    return isLiked ?
    (
     <i className='fa-solid fa-heart' onClick={() => { handleLike() }}></i>
   )
   :
   (
     <i className='fa-solid fa-heart' style={{color: 'purple'}} onClick={() => { handleLike() }}></i>
   )
  }

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
    <div className='movie_card' id='bright'>
    <div className='info_section'>
      <div className='movie_header'>
        <img className='locandina' src={show.images} />
        <h1>{show.title}</h1>
        {/* <h4>add director and year here</h4> */}
        {/* <span className='minutes'>add show length here</span> */}
        <p className='type'>{show.genres}</p>
      </div>
      <div className='movie_desc'>
        <p className='text'>{show.description}</p>
      </div>
      <div className='movie_social'>
        <ul>
          <li>
            {/* <i className='fa-solid fa-share-nodes'></i> */}
          </li>
          <li>
            { isLikedRender() }
            {/* <i className='fa-solid fa-heart'></i> */}
          </li>
          <li>
            {/* <i className='fa-solid fa-message'></i> */}
          </li>
        </ul>
        <Comments category={show} type={'cinema'} />
        <Rating id={show.id} type={'cinema'} />
      </div>
    </div>
    <div className='blur_back bright_back'></div>
  </div>
)
};
    
export default EachShow;
    // <div className="col-md-3 col-sm-6">
    //   <div className="card">
    //     <img src={show.images} className="card-img-top" alt="..." />
    //     <div className="card-body">
    //       <h5 className="card-title">{show.title}</h5>
    //       <p className="card-text">
    //         <small className="text-muted">{show.genres}</small>
    //       </p>
    //       <p className="card-text">{show.description}</p>
    //       <button className="btn btn-secondary" onClick={handleLike}>
    //         {isLiked ? "Unlike" : "Like"}
    //       </button>
    //       <button className="btn btn-secondary" onClick={handleSave}>
    //         {isSaved ? "Unsave" : "Save"}
    //       </button>
    //       <Rating id={show.id} type={'cinema'} />
    //       <Comments category={show} type={'cinema'} />
    //     </div>
    //   </div>
    // </div>
  
  

