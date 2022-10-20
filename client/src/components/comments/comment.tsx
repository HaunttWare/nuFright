import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faReply, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
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

  useEffect(() => {
    axios.get('/api/comments/users')
    .then(({data}) => {
      data.map((user: any) => setUsers(prevUsers => [...prevUsers, user]))
    })
    .catch(err => console.log(err));
  }, [])

  const user = users.find(user => user.id === comment.userId)

  const handleEdit = (e:any) => {
    console.log(e.currentTarget)
  }

  return (
    <>
    <div>
      <div className='header'>
        <span className='name'>{user?.name}</span>
        <span className='date'>
          {dateFormatter.format(Date.parse(comment.createdAt))}
        </span>
        <div className='message'>{comment.message}</div>
        <div className='footer'>
        <FontAwesomeIcon 
        icon={faReply}
        aria-label={reply? 'Cancel Reply' : 'Reply'}
        onClick={() => setReply(prev => !prev)}
       
        />
        <FontAwesomeIcon
        icon={faEdit}
        values={comment.message}
        aria-label={edit? 'cancel edit' : 'edit'}
        onClick={(e) => handleEdit(e)}
        />
        <FontAwesomeIcon 
        icon={faTrash}
        id={comment.id}
        onClick={e => deleteComment(e)}
        />
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
