import React, {useMemo, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import CommentForm from './comment-form';


const Comments = (props:any) => {
 
  const [comments, setComments] = useState<string[]>([])

  // get all the comments with the same type from props
  const options = Object.keys(props);
  // console.log(options)
  const getComments = () => {
    
  }
  

  // create a new comment
  const newComment = () => {

  }
  

  // check if there are any comments
  if (!comments.length) {
    return (
    <>
      <CommentForm />
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