import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
//import text-to-speech component
import Voice from '../TextToSpeech-components/Voice.component';

const StoryDisplay = (props:{story:{authorId:String, createdAt:String, id:String, images:any, title:String, story:String, description?: String}, backHandler:Function}) => {
    const currentUser = useSelector(selectCurrentUser);
    const HauntedHouse = require('../../../../assets/haunted-house.jpg').default;
    const [username, setUsername] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(props.story.title);
    const [description, setDescription] = useState(props.story.description);
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
            axios.patch('/api/story/editStory', {id: props.story.id, newStory: story, newDescription: description})
            .then(result => {
                props.story.story = story;
                props.story.description = description;
                setIsEditing(!isEditing); 
            })
            .catch(err => {
                console.error(err);
            });
        }
    };

    const editDescriptionInputHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const editStoryInputHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setStory(e.target.value);
    }

    const backToDisplayHandler = () => {
        setIsEditing(!isEditing);
        setStory(props.story.story);
        setDescription(props.story.description);
    }

    return (
        <div className='row' style={{background: 'rgb(220, 53, 69)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="text-left" style={{display: 'inline-block', width: isEditing ? '100%' : '50%'}}>
                <button onClick={() => {!isEditing ? props.backHandler('storyList') : backToDisplayHandler()}} style={{ minWidth: 100, display: 'inline-block', background: 'black', color: 'lime', borderRadius: '45%', float: 'left' }}>Back</button>
            </div>
            {(currentUser ? currentUser.id : false) === props.story.authorId && !isEditing && <div className="text-right" style={{display: 'inline-block', width: '50%'}}><button style={{minWidth: 100, background: 'black', color: 'lime', borderRadius: '45%', float: 'right'}} onClick={() => setIsEditing(!isEditing)}>edit</button></div>}
            {!isEditing && <>
                <h5 style={{display: 'flex', justifyContent: 'center'}}><b><u>{title}</u></b></h5>
                <div className='col-6'>by: {username}</div>
                <div className='col-6' style={{display: 'flex', justifyContent: 'right'}}>published: {props.story.createdAt.slice(0, props.story.createdAt.indexOf('T'))}</div>
                <Voice text={story.toString()}></Voice>
                <img src={HauntedHouse} style={{maxWidth: 450, maxHeight: 450}}></img>
                <div className="row" style={{display: 'flex', justifyContent: 'left'}}>{story.split('\n').map((paragraph:string, index:number) => { return <p className="col-12" key={index}>{paragraph}</p> })}</div>
                <button onClick={() => console.log('Not Yet Implemented')} style={{maxWidth: 150, borderRadius: 50, background: 'black', color: 'lime'}}>Favorite</button>
            </>}
            {isEditing && <>
                <h5><b><u>{title}</u></b></h5>
                <textarea placeholder='description text' rows={3} value={description?.toString()} onChange={editDescriptionInputHandler}></textarea>
                <textarea placeholder="story text" rows={5} value={story.toString()} onChange={editStoryInputHandler}></textarea>
                <button onClick={editButtonHandler} style={{ maxWidth: 120, borderRadius: '45%', background: 'black', color: 'lime' }}>Save Changes</button>
            </>}
        </div>
    )
}

export default StoryDisplay;