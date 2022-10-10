import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import axios from 'axios';

const WriteStory = (props:{backHandler: Function}) => {
    const currentUser = useSelector(selectCurrentUser);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [formFilled, setFormFilled] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            setFormFilled('Posting...');
            axios.post('/api/story/addStory', {userId: currentUser.id, title: title, text: text})
            .then((result:any) => {
                props.backHandler('storyList')
                setIsLoading(false);
            })
            .catch((err:Error) => {
                console.error(err)
                setIsLoading(false);
                setFormFilled('Error posting story. Please try again.');
            });
        } else {
            setFormFilled('Write in all fields in order to post your story!');
        }
    }

    return (
        <div id='write_story'>
            <button onClick={() => props.backHandler('storyList')} style={{background: 'black', color: 'lime', borderRadius: '45%', minWidth: 50}}>Back</button>
            <br style={{margin: 5}}></br>
            <input placeholder='Write your title here...' onChange={titleHandler} value={title} style={{width: '100%', display: 'block', marginBottom: 5}}></input>
            <textarea rows={5} placeholder='Write your story here...' onChange={textHandler} value={text} style={{width: '100%', display: 'block', marginBottom: 5}}></textarea>
            <p><b>{formFilled}</b></p>
            <button disabled={isLoading} onClick={postHandler} style={{background: 'black', color: 'lime', borderRadius: '45%', minWidth: 50}}>Post</button>
        </div>
    )
}

export default WriteStory;