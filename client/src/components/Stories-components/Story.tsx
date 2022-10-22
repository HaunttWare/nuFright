import React from 'react';
import { textSpanContainsPosition } from 'typescript';

const Story = (props:{ test:any, story:{createdAt:String, id:String, images:any, title:String, story:String, description?: String}, key:any }) => {
    const HauntedHouse = require('../../../../assets/haunted-house.jpg').default;

    return (
        <div className="row" style={{background: 'rgb(220, 53, 69)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h5 style={{display: 'inline-flex', justifyContent: 'center'}} ><b onClick={() => props.test('story', props.story)} style={{cursor: 'pointer'}}><u>{props.story.title}</u></b></h5>
            <img src={HauntedHouse} style={{maxHeight: 450, maxWidth: 450, overflow: 'hidden'}}></img>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {props.story.description ? props.story.description : props.story.story.slice(0, 100) + '...'}
            </div>
            <button onClick={() => props.test('story', props.story)} style={{maxWidth: 250, borderRadius: '45%', background: 'black', color: 'lime'}}>Read More</button>
        </div>
    )
}

export default Story;