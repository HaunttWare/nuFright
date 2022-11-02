import React, {useState} from 'react';

type CommentFormProps = {
  newComment: (message: string) => void;
}

const CommentForm = ({newComment}: CommentFormProps) => {

  const [message, setMessage] = useState<string>()

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;
      setMessage(value);
  }


  return (
      <div className='new-comment'>
        <textarea 
          className='form-control form-control-sm'
          placeholder='comment here...'
          aria-label='.form-control-sm example'
          name='message'
          onChange={e => handleChange(e)}
          onKeyDown={e => e.key === 'Enter' && message? newComment(message): null}
        ></textarea>
        <button
        className="btn btn-outline-secondary"
          type='button'
          onClick={() => message? newComment(message) : null}
        >Post</button>
      </div>
  )
}

export default CommentForm;