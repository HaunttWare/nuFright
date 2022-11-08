import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentForm from './comment-form';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";


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
  const [message, setMessage] = useState<string>();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    axios.get('/api/comments/users')
    .then(({data}) => {
      data.map((user: any) => setUsers(prevUsers => [...prevUsers, user]))
    })
    .catch(err => console.log(err));
  }, [])

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
        {(currentUser ? currentUser.id === comment.userId : false) && <i className="fa-solid fa-trash" id={comment.id} onClick={e => { if(currentUser) { if(currentUser.id === comment.userId) {deleteComment(e)}}}}></i>}
        </div>
      </div>
    </div>
  </>
);
}

export default Comment;
