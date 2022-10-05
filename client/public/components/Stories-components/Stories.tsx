import React, { useState } from 'react';
//subcomponents
import Story from './Story';

const StoriesPage = () => {
    const [view, setView] = useState('storyList');

    return (
        <div id="stories_page">
            {view === 'storyList' && <Story test={setView} />}
            {view === 'story' && <div>individual story</div>}
        </div>
    );
}

export default StoriesPage;