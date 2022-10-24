import { InputSerializationFilterSensitiveLog } from "@aws-sdk/client-s3";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
//import PlayView from './playview';

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  videoId: string;
};

const PlayListMain = () => {
  const [currentSearch, setCurrentSearch] = useState("");
  const [videos, setVideos] = useState([]);
  const [playlist, setPlaylist] = useState<Video[]>([]);
  const currentUser = useSelector(selectCurrentUser);
  const [gotPlaylist, setGotPlaylist] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCurrentSearch(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const { data } = await axios.get(
        `/api/playlists/search/${currentSearch}`
      );
      setVideos(data);
      setCurrentSearch('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveToPlaylist = async (video: Video) => {
    const { data } = await axios.post(`/api/playlists/add/`, {
      video,
      userId: currentUser.id,
    });
    setPlaylist([...playlist, data]);
  };

  const handleDeletePlaylistEntry = (video: Video) => {
    axios.delete(`/api/playlists/delete/${video.id}`)
      .then(() => {
        getUsersPlaylist();
      } )
      .catch(err => console.error(err));
  }
  const getUsersPlaylist = () => {
    axios.get(`/api/playlists/get/${currentUser.id}`)
    .then((playListData: any) => {
     
      setPlaylist(playListData.data);
      setGotPlaylist(true);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  useEffect(() => {
    
    if (!currentUser) {
     
        <div>searching for your playlist....</div>
      
    } else {
    getUsersPlaylist()
    }
  }, [gotPlaylist]);
  
  return (
    <div className="container">
      <div className="row">
       <div className="col">
          <h2>Search for Music (scary) </h2>
          <input
            value={currentSearch}
            onChange={handleSearchChange}
            placeholder="type for songs...."
            />
          {/* <button onClick={handleSubmit}>BOO!</button> */}
          <button className="btn aqua-gradient btn-rounded btn-sm my-0" type="submit" onClick={handleSubmit}>BOO!</button>

          {videos.map((video: Video) => {
            return (
              <div
              key={video.videoId}
              className="card"
              style={{ width: "18rem", backgroundColor: "black" }}
              >
                <iframe className="card-top" src={ `https://www.youtube.com/embed/${video.videoId}` } allowFullScreen></iframe>
                {/* <img className="card-top" src={video.thumbnail} /> */}
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                  <p className="card-text">{video.description}</p>

                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={() => {
                      handleSaveToPlaylist(video);
                    }}
                  >
                    Add to Playlist
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col">
          <h2>Playlist...</h2>
          {playlist.length > 0 ? (
            playlist.map((video) => {
              return (
                <div
                key={video.videoId}
                className="card"
                style={{ width: "18rem", backgroundColor: "black" }}
                >
                  <button style={{backgroundColor: 'red', marginLeft: 'auto', width: '30px'}} onClick={() => {handleDeletePlaylistEntry(video)}}>X</button>
                   <iframe className="card-top" src={ `https://www.youtube.com/embed/${video.videoId}` } allowFullScreen></iframe>
                  {/* <img className="card-top" src={video.thumbnail}  /> */}
                  <div className="card-body">
                    <h5 className="card-title" >{video.title}</h5>
                    <p className="card-text" >{video.description}</p>
                  </div>
                </div>
              );
            })
            ) : (
            <h2>You have no videos in your playlist yet lol</h2>
            )}
        </div>
      </div>
    </div>
  );
};

export default PlayListMain;
// Hey John,  might be useful later
//  useEffect(() => {
//   if(audioCtx.state === 'running') {
//     audioCtx.suspend().then(function() {
//       susresBtn.textContent = 'Resume context';
//     });
//   } else if(audioCtx.state === 'suspended') {
//     audioCtx.resume().then(function() {
//       susresBtn.textContent = 'Suspend context';
//     });
//   }
//  })