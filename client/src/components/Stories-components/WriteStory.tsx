import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import axios from 'axios';

const WriteStory = (props:{backHandler: Function}) => {
    const currentUser = useSelector(selectCurrentUser);
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
        if(title && text && currentUser) {
            axios.post('/story/addStory', {userId: currentUser.id, title: title, text: text})
            .then((result:any) => props.backHandler('storyList'))
            .catch((err:Error) => console.error(err));
        }
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