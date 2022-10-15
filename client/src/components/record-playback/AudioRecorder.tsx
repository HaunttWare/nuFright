import React, { useState } from "react";
import { useRecorderPermission } from "./RecordRTC";
import { invokeSaveAsDialog } from "recordrtc";
import RecorderTimer from "./RecorderTimer";
import { Dropdown } from "react-bootstrap";
import ReactAudioPlayer from 'react-audio-player';

export const AudioRecorder = () => {
const [currentBlobs, setCurrentBlobs] = useState([]);


  const recorder = useRecorderPermission("audio");
  const startRecording = async () => {
    recorder.startRecording();
  };
  const stopRecording = async () => {
    await recorder.stopRecording();
    let blob = await recorder.getBlob();
    setCurrentBlobs(blob);
    console.log(currentBlobs);
    invokeSaveAsDialog(blob, `random_name.webm`);
  };
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