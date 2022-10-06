import React from 'react';

const StoryDisplay = () => {
    const HauntedHouse = require('../../../../assets/haunted-house.jpg').default;

    return (
        <div className='row' style={{background: 'rgb(220, 53, 69)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h5 style={{display: 'flex', justifyContent: 'center'}}><b><u>individual story title</u></b></h5>
            <div className='col-6'>by: insert author name here</div>
            <div className='col-6' style={{display: 'flex', justifyContent: 'right'}}>published: insert date here</div>
            <img src={HauntedHouse} style={{maxWidth: 450, maxHeight: 450}}></img>
            <div style={{display: 'flex', justifyContent: 'left'}}>Story text goes here...</div>
            <button style={{maxWidth: 150, borderRadius: 50, background: 'black', color: 'lime'}}>Favorite</button>
        </div>
    )
}

export default StoryDisplay;