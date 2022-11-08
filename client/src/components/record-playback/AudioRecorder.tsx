import React, { useEffect, useState } from "react";
import { useRecorderPermission } from "./RecordRTC";
import { invokeSaveAsDialog } from "recordrtc";
import RecorderTimer from "./RecorderTimer";
import { Dropdown } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios'
import { setCurrentUser } from "../../store/user/user.action";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import './recorder.styles.css';


type Song = {
  fileName: string,
  fileURL: string,
  id: string,
  userId: string
}
export const AudioRecorder = () => {
const [currentSongURL, setCurrentSongURL] = useState('');
const [allBlobs, setAllBlobs] = useState<Song[] | []>([]);
const [areBlobsThere, setAreBlobsThere] = useState(false);
const currentUser = useSelector(selectCurrentUser);

const getBlobs = () => {
  axios.get('/api/songs/getsongs') 
    .then(({ data }) => {
      setAllBlobs(data);
      setAreBlobsThere(true);
      console.log('data →', allBlobs);
    })
    .catch((err) => {
      console.error(err);
    });
}
 
  const recorder = useRecorderPermission("audio");
  const startRecording = async () => {
    recorder.startRecording();
  };
  
  const stopRecording = async () => {
    await recorder.stopRecording();
    let blob = await recorder.getBlob();
    console.log('blob', blob);
    //setCurrentBlob(blob);
    let randomName = prompt('name this sound');
    let savedFile = new File([blob], `${randomName}.webm`, { type: 'audio/webm' });

    console.log('file', savedFile);

    invokeSaveAsDialog(blob, `${randomName}.webm`);


    const savedBlob = {
      userId: currentUser.id,
      song: savedFile,
      name: `${randomName}.webm`,
    }


    axios.post('/api/songs/savesong', savedBlob, { headers: { "Content-Type": 'multipart/form-data' } })
      .then((data) => {
      console.log('post data', data);
      getBlobs();
      })
      .catch((err) => {
        console.error('error inside songsave post request in frontend', err)
      });

      
  };

  const selectBlob = (song: Song) => {
    setCurrentSongURL(song.fileURL);
  }

 useEffect(() => {
      getBlobs()
        console.log('allblobs→', allBlobs);
 }, [areBlobsThere])


  return (
    <div>
      <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        Pick a song to play
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {allBlobs.map((song) => {
          return (
            <Dropdown.Item
             onClick={() => selectBlob(song)} 
             key={song.id}>{song.fileName.slice(0, song.fileName.indexOf('.'))}
             </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
            <ReactAudioPlayer
              src={currentSongURL}
              autoPlay
              controls
            /> <br></br>
            <button type="button" className="btn btn-outline-danger" onClick={startRecording}>RECORD</button>
            <button type="button" className="btn btn-outline-primary" onClick={stopRecording}>STOP</button>
    
    </div>
  );
};