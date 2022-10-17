import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import axios from 'axios';
import CommentForm from './comment-form';

type CommentsData = {
  bookId: string | null;
  cinemaId: string | null;
  createdAt: string;
  id: string;
  imagesId: string | null;
  parentId: string | null;
  storiesId: string | null;
  updatedAt: string;
  userId: string;
  message: string;
};

const Comments = (props: any) => {
  const [comments, setComments] = useState<string[]>([]);
  // const [comments, setComments] = useState<CommentsData[]>([]);
  const currentUser = useSelector(selectCurrentUser);

  const options = Object.keys(props).toString();
  const propsId = props[options].id;

  const getComments = () => {
    axios
      .get(`/api/comments/${propsId}`)
      .then(({ data }) => {
        if (data.length) {
          data.map((comment: any) => {
            if (
              !comments.includes(comment.message) &&
              comment.cinemaId === propsId
            ) {
              setComments((prevComments) => [...prevComments, comment.message]);
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
        .post(`/api/comments/${propsId}`, {
          userId: currentUser.id,
          message,
          cinemaId: propsId,
          category: 'movie',
        })
        .then(getComments)
        .catch((err) => console.log(err));
    }
  };

  return comments.length > 0 ? (
    <div className='row text-light py-2'>
      <div className='col-12 text-center'>
        <button
          className='btn btn-secondary'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#collapseWidthExample'
          aria-expanded='false'
          aria-controls='collapseWidthExample'
        >
          View Comments
        </button>
        <div className='collapse collapse-horizontal' id='collapseWidthExample'>
          {comments.map((comment: string, i: number) => {
            return (
              <div className='card card-body'>
                <div className='card-text' key={i}>
                  {comment}
                </div>
              </div>
            );
          })}
        </div>

        <CommentForm newComment={newComment} />
      </div>
    </div>
  ) : (
    <>
      <p>no comments</p>
      <CommentForm newComment={newComment} />
    </>
  );
};

export default Comments;
