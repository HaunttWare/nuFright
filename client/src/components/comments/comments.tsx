import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import axios from 'axios';
import CommentForm from './comment-form';
import Comment from './comment';


type CommentsData = {
  bookId?: string | null;
  cinemaId?: string | null;
  createdAt: string;
  id: string;
  imagesId?: string | null;
  parentId?: string | null;
  storiesId?: string | null;
  updatedAt: string;
  userId: string;
  message: string;
  name: string;
}[];

type CommentsProps = {
  category: any;
  type: string;
};

const Comments = ({ category, type }: CommentsProps) => {
  const [comments, setComments] = useState<CommentsData>([]);
  const currentUser = useSelector(selectCurrentUser);
  const [showComments, setShowComments] = useState(false);

  let viewCommentsString;
  if (comments.length > 1) {
    viewCommentsString = `View all ${comments.length} Comments`;
  } else if (comments.length === 1) {
    viewCommentsString = `View 1 Comment`;
  } else {
    viewCommentsString = `No comments`;
  }

  // get all the comments from database
  const getComments = () => {
    axios
      .get(`/api/comments/`)
      .then(({ data }) => {
        if (data.length) {
          data.map((comment: any) => {
            if (comment[`${type}Id`] === category.id) {
              setComments((prevMessage) => [...prevMessage, comment]);
            }
          });
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getComments();
  }, []);

  // create a new comment
  const newComment = (message: string) => {
    if (currentUser) {
      axios
        .post(`/api/comments/${category?.id}`, {
          userId: currentUser.id,
          message,
          categoryId: category?.id,
          type,
        })
        .then(getComments)
        .catch((err) => console.log(err));
    }
  };

  const deleteComment = (e: any) => {
    const {currentTarget: {id}} = e;
    axios.delete(`/api/comments/${id}`)
    .then(getComments)
    .catch(err => console.log('delete error', err))
  }
  
  // const parentComments = useMemo(() => {
  //   const group = {}
  //   comments.forEach((comment: any) => {
  //     group[comment.parentId] || = [];
  //     group[comment.parentId].push(comment)
  //   })
  // }, [comments])

  return comments.length ? (
    <div className='row text-light py-2' onClick={() => setShowComments(true)}>
      <div className='col-12 text-center'>
        <u>{viewCommentsString}</u>
        {showComments &&
          comments.map((comment: any) => (
            <Comment 
            comment={comment} 
            key={`${comment} @ ${comment.id}`} 
            deleteComment={deleteComment}
            />
          ))}
        <div className={`comment ${showComments? 'hide' : ''}`}>
          <CommentForm newComment={newComment} />
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className='row text-light py-2'>
        <div className='col-12 text-center'>
          {viewCommentsString}
          <CommentForm newComment={newComment} />
        </div>
      </div>
    </>
  );
};

export default Comments;
