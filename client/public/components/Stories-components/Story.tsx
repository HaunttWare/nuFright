import React from 'react';

const Story = () => {
    const HauntedHouse = require('../../../../assets/haunted-house.jpg').default;

    return (
        <div className="row" style={{background: 'rgb(220, 53, 69)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h5 style={{display: 'flex', justifyContent: 'center', cursor: 'pointer'}}><b><u>Story Title</u></b></h5>
            <img src={HauntedHouse} style={{maxHeight: 450, maxWidth: 450, overflow: 'hidden'}}></img>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                Description goes here
            </div>
            <button style={{maxWidth: 250, borderRadius: '45%', background: 'black', color: 'lime'}}>Read More</button>
        </div>
    )
}

export default Story;