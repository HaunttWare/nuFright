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

type CommentsProps = {
  category: any;
  type: string;
};

const Comments = ({ category, type }: CommentsProps) => {
  const [comments, setComments] = useState<string[]>([]);
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

  const getComments = () => {
    axios
      .get(`/api/comments/`)
      .then(({ data }) => {
        if (data.length) {
          data.map((comment: any) => {
            if (comment[`${type}Id`] === category.id) {
              setComments((prevMessage) => [...prevMessage, comment.message]);
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

  return comments.length ? (
    <div
      className='row text-light py-2'
      onClick={() => setShowComments(!showComments)}
    >
      <div className='col-12 text-center'>
        {viewCommentsString}
        {showComments &&
          comments.map((comment: string, i: number) => {
            return (
              <div className='card card-body' key={i}>
                <div className='card-text' key={i}>
                  {comment}
                </div>
              </div>
            );
          })}
        <CommentForm newComment={newComment} />
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
