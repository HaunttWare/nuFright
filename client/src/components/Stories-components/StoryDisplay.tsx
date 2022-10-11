import React, { useState } from 'react';
import axios from 'axios';

const StoryDisplay = (props:{story:{authorId:String, createdAt:String, id:String, images:any, title:String, story:String}, backHandler:Function}) => {
    const HauntedHouse = require('../../../../assets/haunted-house.jpg').default;
    const [username, setUsername] = useState('');
    const [isLoading,setIsLoading] = useState(true);

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

    return (
        <div className='row' style={{background: 'rgb(220, 53, 69)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <button onClick={() => {props.backHandler('storyList')}} style={{maxWidth: 100, display: 'inline-flex', justifyContent: 'center', background: 'black', color: 'lime', borderRadius: '45%'}}>Back</button>
            <h5 style={{display: 'flex', justifyContent: 'center'}}><b><u>{props.story.title}</u></b></h5>
            <div className='col-6'>by: {username}</div>
            <div className='col-6' style={{display: 'flex', justifyContent: 'right'}}>published: {props.story.createdAt.slice(0, props.story.createdAt.indexOf('T'))}</div>
            <img src={HauntedHouse} style={{maxWidth: 450, maxHeight: 450}}></img>
            <div style={{display: 'flex', justifyContent: 'left'}}>{props.story.story}</div>
            <button onClick={() => console.log('Not Yet Implemented')} style={{maxWidth: 150, borderRadius: 50, background: 'black', color: 'lime'}}>Favorite</button>
        </div>
    )
}

export default StoryDisplay;