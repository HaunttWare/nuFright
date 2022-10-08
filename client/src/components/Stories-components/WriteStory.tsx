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
            <button onClick={() => props.backHandler('storyList')} style={{background: 'black', color: 'lime', borderRadius: '45%', minWidth: 50}}>Back</button>
            <br style={{margin: 5}}></br>
            <input placeholder='Write your title here...' onChange={titleHandler} value={title} style={{width: '100%', display: 'block', marginBottom: 5}}></input>
            <textarea rows={5} placeholder='Write your story here...' onChange={textHandler} value={text} style={{width: '100%', display: 'block', marginBottom: 5}}></textarea>
            <button onClick={postHandler} style={{background: 'black', color: 'lime', borderRadius: '45%', minWidth: 50}}>Post</button>
        </div>
    )
}

export default WriteStory;