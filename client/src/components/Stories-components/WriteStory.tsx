import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import axios from 'axios';

const WriteStory = (props:{backHandler: Function}) => {
    const currentUser = useSelector(selectCurrentUser);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [text, setText] = useState('');
    const [formFilled, setFormFilled] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState('');

    //handlers for title and text
    const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const descriptionHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(event.target.value);
    }

    const textHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(e.target.value);
    }

    //publish handler
    const postHandler = () => {
        //can't reach 3810
        //can reach 2678, 2846, 2416
        if(title && text && currentUser) {
            if(text.length <= 10000 && desc.length <= 300) {
                setIsLoading(true);
                setFormFilled('Posting...');
                axios.post('/api/story/addStory', {userId: currentUser.id, title: title, text: text, description: desc, image: image})
                .then((result:any) => {
                    props.backHandler('storyList')
                    setIsLoading(false);
                })
                .catch((err:Error) => {
                    console.error(err)
                    setIsLoading(false);
                    setFormFilled('Error posting story. Please try again.');
                });
            } else if(text.length > 10000) {
                setFormFilled('Story length cannot exceed 10000 characters!');
            } else if(desc.length > 300) {
                setFormFilled('Description cannot exceed 300 characters!');
            }
        } else {
            setFormFilled('Write in all fields in order to post your story!');
        }
    }

    return (
        <div id='write_story'>
            <button className="btn btn-outline-secondary" onClick={() => props.backHandler('storyList')} style={{marginBottom: 5}}>Back</button>
            <br style={{margin: 5}}></br>
            <input placeholder='Write your title here...' onChange={titleHandler} value={title} style={{width: '100%', display: 'block', marginBottom: 5, borderColor: title.length > 3000 ? 'red' : ''}}></input>
            <p>{title.length > 3000 ? `You are ${title.length - 3000} characters over the limit!` : ''}</p>
            <textarea rows={3} placeholder="Write your description here..." onChange={descriptionHandler} value={desc} style={{width: '100%', display: 'block', marginBottom: 5, borderColor: desc.length > 300 ? 'red' : ''}}></textarea>
            <p>{desc.length > 300 ? `You are ${desc.length - 300} characters over the limit!` : ''}</p>
            <textarea rows={5} placeholder='Write your story here...' onChange={textHandler} value={text} style={{width: '100%', display: 'block', marginBottom: 5, borderColor: text.length > 10000 ? 'red' : ''}}></textarea>
            <p>{text.length > 10000 ? `You are ${text.length - 10000} characters over the limit!` : ''}</p>
            <input placeholder='Put image link here...' onChange={imageHandler} value={image} style={{width: '100%', display: 'block', marginBottom: 5}}></input>
            {image ? <img src={image} style={{maxWidth: '100px', maxHeight: '100px'}}></img> : <div></div>}
            <p><b>{formFilled}</b></p>
            <button className="btn btn-outline-secondary" disabled={isLoading} onClick={postHandler} style={{minWidth: 50}}>Post</button>
        </div>
    )
}

export default WriteStory;