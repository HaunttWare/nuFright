import React from 'react';
import { textSpanContainsPosition } from 'typescript';
import "./story.styles.css";

const Story = (props:{ test:any, story:{createdAt:String, id:String, images:any, title:String, story:String, description?: String, author: {name: string}, likedBy: any, Comment: any}, key:any }) => {
    const HauntedHouse = require('../../../../assets/haunted-house.jpg').default;

    return (
    <div className="card single_post">
        <div className="top">
            <h3 style={{marginTop: 5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><b onClick={() => props.test('story', props.story)} style={{cursor: 'pointer',}}><u>{props.story.title}</u></b></h3>
        </div>
        <div className="body">
            <div className="img-post">
                <img className="d-block img-fluid" onClick={() => props.test('story', props.story)} style={{cursor: 'pointer'}} src={props.story.images ? props.story.images : HauntedHouse}  alt="First slide"/>
            </div>
            <p> {props.story.description ? props.story.description : props.story.story.slice(0, 100) + '...'}</p>
        </div>
        <div className="footer">
            <div className="actions">
                <span onClick={() => props.test('story', props.story)} className="btn btn-outline-secondary">Continue Reading</span>
            </div>
            <ul className="stats">
                <li><a href="#" className="fa fa-heart">{props.story.likedBy.length}</a></li>
                <li><a href="#" className="fa fa-comment">{props.story.Comment.length}</a></li>
            </ul>
        </div>
    </div>
    )
}

export default Story;