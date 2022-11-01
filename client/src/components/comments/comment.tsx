import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentForm from './comment-form';


type CommentProps = {
  comment: any;
  deleteComment: any;
};

type Users = {
  id: string;
  name: string;
}[];

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const Comment = ({ comment, deleteComment }: CommentProps) => {
  const [users, setUsers] = useState<Users>([]);
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [message, setMessage] = useState<string>()

  // useEffect(() => {
  //   axios.get('/api/comments/users')
  //   .then(({data}) => {
  //     data.map((user: any) => setUsers(prevUsers => [...prevUsers, user]))
  //   })
  //   .catch(err => console.log(err));
  // }, [])

  const user = users.find(user => user.id === comment.userId)


  return (
    <>
    <div>
      <div className='header'>
        <span className='row'>{user?.name}</span>
        <span className='col'>
          {dateFormatter.format(Date.parse(comment.createdAt))}
        </span>
        <div className='message'>{comment.message}</div>
        <div className='footer'>
        <i className="fa-solid fa-trash" id={comment.id} onClick={e => deleteComment(e)}></i>
        </div>
      </div>
      {/* {reply && (
        <CommentForm newComment={message}/>
      )} */}
    </div>
  </>
);
}

export default Comment;
