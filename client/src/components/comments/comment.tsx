import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {IconBtn} from './iconbtn';
import {FaHeart, FaReply, FaEdit, FaTrash} from 'react-icons/fa';

type CommentProps = {
  comment: any;
};

type Users = {
  id: string;
  name: string;
}[];

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const Comment = ({ comment }: CommentProps) => {
  const [users, setUsers] = useState<Users>([]);

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
    <div className='comment'>
      <div className='header'>
        <span className='name'>{user?.name}</span>
        <span className='date'>
          {dateFormatter.format(Date.parse(comment.createdAt))}
        </span>
        <div className='message'>{comment.message}</div>
        <div className='footer'>
          {/* <IconBtn Icon={FaHeart} aria-label='Like'>2</IconBtn>
          <IconBtn Icon={FaReply} aria-label='Reply' />
          <IconBtn Icon={FaEdit} aria-label='Edit' />
        <IconBtn Icon={FaTrash} aria-label='Delete' color='red' /> */}
        </div>
      </div>
    </div>
  </>
);
}

export default Comment;
