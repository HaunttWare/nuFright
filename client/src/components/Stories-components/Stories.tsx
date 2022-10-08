import React, { useState } from 'react';
import axios from 'axios';
//subcomponents
import Story from './Story';
import StoryDisplay from './StoryDisplay';
import WriteStory from './WriteStory';

const StoriesPage = () => {
    const [view, setView] = useState('storyList');
    const [allStories, setAllStories] = useState([]);
    const [selectedStory, setSelected] = useState({authorId: '', createdAt: '', id: '', images: '', title: '', story: ''});
    const [isLoading, setIsLoading] = useState(true);

    //on initializing, get all stories from database
    if(isLoading) {
        axios.get('/story/allStories')
        .then(result => {
            setAllStories(result.data);
        })
        .catch((err:Error) => console.error(err));
        setIsLoading(false);
    }

    //view handler handles changing views
    const viewHandler = (view:any, props:any) => {
        setView(view);
        if(props) {
            setSelected(props);
        }
    }

    return (
        <div id="stories_page">
            {view === 'storyList' && <button onClick={() => setView('write')} style={{maxWidth: 200, background: 'black', color: 'lime', borderRadius: '45%'}}>Write a Story</button>}
            <>
            {view === 'storyList' && allStories.map(((story:{authorId:String, createdAt:String, id:String, images:any, title:String, story:String}, index:any) => {
                return <Story test={viewHandler} story={story} key={index} />
            }))}
            </>
            {view === 'story' && <StoryDisplay story={selectedStory} backHandler={viewHandler}/>}
            {view === 'write' && <WriteStory backHandler={viewHandler}/>}
        </div>
    );
}

export default StoriesPage;