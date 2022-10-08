import React, { useState } from 'react';

const WriteStory = (props:{backHandler: Function}) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    //handlers for title and text
    const titleHandler = (event: any) => {
        setTitle(event.target.value);
    }

    const textHandler = (event: any) => {
        setText(event.target.value);
    }

    //publish handler
    const postHandler = () => {
        console.log(title, text);
    }

    return (
        <div id='write_story'>
            <button onClick={() => props.backHandler('storyList')}>Back</button>
            <br style={{margin: 5}}></br>
            <input placeholder='Write your title here...' onChange={titleHandler} value={title}></input>
            <br style={{margin: 5}}></br>
            <textarea rows={5} placeholder='Write your story here...' onChange={textHandler} value={text}></textarea>
            <br style={{margin: 5}}></br>
            <button onClick={postHandler}>Post</button>
        </div>
    )
}

export default WriteStory;