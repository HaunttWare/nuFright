import React, { useState } from "react";
import { useRecorderPermission } from "./RecordRTC";
import { invokeSaveAsDialog } from "recordrtc";
import RecorderTimer from "./RecorderTimer";
import { Dropdown } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios'
import { setCurrentUser } from "../../store/user/user.action";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

export const AudioRecorder = () => {
const [currentBlob, setCurrentBlob] = useState({});
const [allBlobs, setAllBlobs] = useState([]);
const currentUser = useSelector(selectCurrentUser);


  const recorder = useRecorderPermission("audio");
  const startRecording = async () => {
    recorder.startRecording();
  };
  const stopRecording = async () => {
    await recorder.stopRecording();
    let blob = await recorder.getBlob();
    setCurrentBlob(blob);
    console.log(currentBlob);
    let randomName = prompt('name this sound')
    invokeSaveAsDialog(blob, `${randomName}.webm`);
  };

  const saveBlobsToDb = () => {
    axios.post('/api/blobs', {
      userId: currentUser.id,
      songs: allBlobs
    })
    .then(() => {
      
    })
    .catch((err) => {
      console.error(err)
    }) 
  }
  return (
    <div>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            <ReactAudioPlayer
              src=""
              autoPlay
              controls
            /> <br></br>
      <button onClick={startRecording}> Start recording</button>
      <button onClick={stopRecording}> Stop recording</button>
    </div>
  );
};