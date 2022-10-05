import React, { useState } from 'react';
//subcomponents
import Story from './Story';
import StoryDisplay from './StoryDisplay';

const StoriesPage = () => {
    const [view, setView] = useState('storyList');

    return (
        <div id="stories_page">
            {view === 'storyList' && <Story test={setView} />}
            {view === 'story' && <StoryDisplay/>}
        </div>
    );
}

export default StoriesPage;