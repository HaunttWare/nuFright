import React from 'react';

const Story = () => {

    return (
        <div className="row" style={{background: 'rgb(220, 53, 69)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h5 style={{display: 'flex', justifyContent: 'center'}}><b><u>Story Title</u></b></h5>
            <img src='https://www.psychologicalscience.org/redesign/wp-content/uploads/2022/01/How-Haunted-Houses-Measure-Fear-Web-1600x842.jpg' style={{maxHeight: 450, maxWidth: 450, overflow: 'hidden'}}></img>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                Description goes here
            </div>
            <button style={{maxWidth: 250}}>Read More</button>
        </div>
    )
}

export default Story;