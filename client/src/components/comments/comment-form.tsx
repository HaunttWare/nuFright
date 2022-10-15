import React, {useState, ChangeEventHandler} from 'react';

const CommentForm = () => {

  const [message, setMessage] = useState<string>()

  const handleSubmit: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setMessage(e.target.value)
  }

  return (
    <form >
      <div className='comment-form-row'>
        <input 
          name='message'
          onChange={e => setMessage(e.target.value)}
        />
      </div>
    </form>
  )
}

export default CommentForm;