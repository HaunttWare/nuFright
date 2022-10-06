import React, { useState } from 'react';

const WriteStory = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    //handlers for title and text
    const titleHandler = (event: any) => {
        setTitle(event.target.value);
    }

    const textHandler = (event: any) => {
        setText(event.target.value);
    }

    return (
        <div id='write_story'>
            <input placeholder='Write your title here...' onChange={titleHandler} value={title}></input>
            <br style={{margin: 5}}></br>
            <textarea rows={5} placeholder='Write your story here...' onChange={textHandler} value={text}></textarea>
        </div>
    )
}

export default WriteStory;