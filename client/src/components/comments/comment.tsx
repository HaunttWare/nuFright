import React, {useState, useEffect} from 'react';
import axios from 'axios';
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
    <div className='comment container'>
      <div className='row mb-5'>
        <span className='col'><b>{user?.name}</b></span>
        <span className='col'>
          {dateFormatter.format(Date.parse(comment.createdAt))}
        </span>
        <p className='message'>{comment.message}</p>
        <div className='footer'>
        {(currentUser ? currentUser.id === comment.userId : false) && <i className="fa-solid fa-trash" id={comment.id} onClick={e => { if(currentUser) { if(currentUser.id === comment.userId) {deleteComment(e)}}}}></i>}
        </div>
      </div>
    </div>
  </>
);
}

export default Comment;
