import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

const StoryDisplay = (props:{story:{authorId:String, createdAt:String, id:String, images:any, title:String, story:String}, backHandler:Function}) => {
    const currentUser = useSelector(selectCurrentUser);
    const HauntedHouse = require('../../../../assets/haunted-house.jpg').default;
    const [username, setUsername] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(props.story.title);
    const [story, setStory] = useState(props.story.story);

    if(isLoading) {
        axios.get(`/api/story/user/${props.story.authorId}`)
        .then(result => {
            setUsername(result.data);
        })
        .catch(err => {
            console.error(err);
        });
        setIsLoading(false);
    }

    //edit related
    const editButtonHandler = () => {
        if(currentUser.id === props.story.authorId) {
            //
        }
    };

    const editStoryInputHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setStory(e.target.value);
    }

    return (
        <div className='row' style={{background: 'rgb(220, 53, 69)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <button onClick={() => {!isEditing ? props.backHandler('storyList') : setIsEditing(!isEditing)}} style={{maxWidth: 100, display: 'inline-flex', justifyContent: 'center', background: 'black', color: 'lime', borderRadius: '45%'}}>Back</button>
            {(currentUser ? currentUser.id : false) === props.story.authorId && !isEditing && <button onClick={() => setIsEditing(!isEditing)}>edit</button>}
            {!isEditing && <>
                <h5 style={{display: 'flex', justifyContent: 'center'}}><b><u>{title}</u></b></h5>
                <div className='col-6'>by: {username}</div>
                <div className='col-6' style={{display: 'flex', justifyContent: 'right'}}>published: {props.story.createdAt.slice(0, props.story.createdAt.indexOf('T'))}</div>
                <img src={HauntedHouse} style={{maxWidth: 450, maxHeight: 450}}></img>
                <div style={{display: 'flex', justifyContent: 'left'}}>{story}</div>
                <button onClick={() => console.log('Not Yet Implemented')} style={{maxWidth: 150, borderRadius: 50, background: 'black', color: 'lime'}}>Favorite</button>
            </>}
            {isEditing && <>
                <h5><b><u>{title}</u></b></h5>
                <textarea placeholder="story text" value={story.toString()} onChange={editStoryInputHandler}></textarea>
            </>}
        </div>
    )
}

export default StoryDisplay;