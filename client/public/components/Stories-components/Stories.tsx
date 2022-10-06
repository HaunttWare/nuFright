import React, { useState } from 'react';
//subcomponents
import Story from './Story';
import StoryDisplay from './StoryDisplay';
import WriteStory from './WriteStory';

const StoriesPage = () => {
    const [view, setView] = useState('storyList');

    return (
        <div id="stories_page">
            {view === 'storyList' && <button onClick={() => setView('write')} style={{maxWidth: 200, background: 'black', color: 'lime', borderRadius: '45%'}}>Write a Story</button>}
            {view === 'storyList' && <Story test={setView} />}
            {view === 'story' && <StoryDisplay backHandler={setView}/>}
            {view === 'write' && <WriteStory/>}
        </div>
    );
}

export default StoriesPage;