import React, {useMemo, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectCurrentUser} from '../../store/user/user.selector';
import axios from 'axios';
import CommentForm from './comment-form';

type CommentsData = {
  bookId: null;
  cinemaId: null;
  createdAt: string;
  id: string;
  imagesId: null;
  parentId: null;
  storiesId: null;
  updatedAt: string;
  userId: string;
  message: string;
};

const Comments = (props:any) => {
  // const [comments, setComments] = useState<string[]>([])
  const [comments, setComments] = useState<CommentsData[]>([])
  const {id, name, email, googleId} = useSelector(selectCurrentUser);
  const options = Object.keys(props).toString();
  const horrorId = props[options].id;

  useEffect(() => {
    axios.get(`/api/comments`)
      .then(({data}) => {
        if (data.length) {
          data.map((comment:any) => {
            for (const key in comment) {
              if (comment[key] === horrorId) {
                setComments((prevComments) => [...prevComments, comment])
              } 
            }
          })
        }
      })
      .catch(err => console.error(err));
  }, []);

  // create a new comment
  const newComment = (message: string) => {
    if (id) {
      axios.post(`/api/comments/${horrorId}`, {userId: id, message})
      .catch(err => console.error(err));
    }
  }
  console.log(comments)
  return comments.length > 0? (
  <div className='container-fluid'>
  <h3>Comments</h3>
  {comments.map((comment: CommentsData, i:number) => {
    return (
      <div key={i}>{comment.message}</div>
    )
  })}
  <CommentForm newComment={newComment} />
  </div>
  ) : (<p>no comments</p>);
}

export default Comments;