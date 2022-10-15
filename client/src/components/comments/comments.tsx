import React, {useMemo, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectCurrentUser} from '../../store/user/user.selector';
import axios from 'axios';
import CommentForm from './comment-form';

interface CommentObj {
  data: {
    message: string;
    userId: string;
  }
}

const Comments = (props:any) => {
 
  const [comments, setComments] = useState<string[]>([])
  const {id, name, email, googleId} = useSelector(selectCurrentUser);
  console.log({id, name})
  // get all the comments with the same type from props
  const options = Object.keys(props);
  // console.log(options)
  

  // create a new comment
  
  const newComment = (message: string) => {
    if (id) {
      axios.post('/api/comments', {
        
      })
    }
    setComments(prevComment => [...prevComment, ...message]);
  }
  

  // check if there are any comments
  if (!comments.length) {
    return (
    <>
      <CommentForm newComment={newComment} />
    </>)
  } else {
    return (
      <>
        Comments
      </>
    )
  }
}

export default Comments;