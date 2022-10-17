import React, {useState, ChangeEventHandler} from 'react';
import axios from 'axios';

type CommentFormProps = {
  newComment: (message: string) => void;
}

const CommentForm = ({newComment}: CommentFormProps) => {

  const [message, setMessage] = useState<string>()

  interface HandleChange {
    handleChange: (
      selectType: string,
      event: React.ChangeEvent<HTMLInputElement>) => void;
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
      setMessage(value);
  }


  return (
    <form >
      <div className='comment-form-row'>
        <input 
          name='message'
          onChange={e => handleChange(e)}
          onKeyDown={e => e.key === 'Enter' && message? newComment(message): null}
        ></input>
        <button
          type='button'
          onClick={() => message? newComment(message) : null}
        >Add Comment</button>
      </div>
    </form>
  )
}

export default CommentForm;