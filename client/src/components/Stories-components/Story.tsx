import React from 'react';
import { textSpanContainsPosition } from 'typescript';
import "./stories.styles.css";

const Story = (props:{ test:any, story:{createdAt:String, id:String, images:any, title:String, story:String, description?: String}, key:any }) => {
    const HauntedHouse = require('../../../../assets/haunted-house.jpg').default;

    return (
        <div className="card single_post">
        <div className="body">
            <div className="img-post">
                <img className="d-block img-fluid" src={props.story.images ? props.story.images : HauntedHouse}  alt="First slide"/>
            </div>
            <h3><a href="blog-details.html">{props.story.title}</a></h3>
            <p> {props.story.description ? props.story.description : props.story.story.slice(0, 100) + '...'}</p>
        </div>
        <div className="footer">
            <div className="actions">
                <span onClick={() => props.test('story', props.story)} className="btn btn-outline-secondary">Continue Reading</span>
            </div>
            <ul className="stats">
                <li><a href="#" className="fa fa-heart">5</a></li>
                <li><a href="#" className="fa fa-comment">10</a></li>
            </ul>
        </div>
    </div>

    )
}

export default Story;