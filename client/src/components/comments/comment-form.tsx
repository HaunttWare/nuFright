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
      <div className='new-comment'>
        <input 
          className='form-control form-control-sm'
          type='text'
          placeholder='comment here'
          aria-label='.form-control-sm example'
          name='message'
          onChange={e => handleChange(e)}
          onKeyDown={e => e.key === 'Enter' && message? newComment(message): null}
        ></input>
        <button
          type='button'
          onClick={() => message? newComment(message) : null}
        >Post</button>
      </div>
  )
}

export default CommentForm;