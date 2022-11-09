import React, { useEffect, useState } from "react";
import { useRecorderPermission } from "./RecordRTC";
import { invokeSaveAsDialog } from "recordrtc";
import { Dropdown } from "react-bootstrap";
import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import "./recorder.styles.css";
import Swal from "sweetalert2";

type Song = {
  fileName: string;
  fileURL: string;
  id: string;
  userId: string;
};

export const AudioRecorder = () => {
  const [currentSongURL, setCurrentSongURL] = useState("");
  const [allBlobs, setAllBlobs] = useState<Song[] | []>([]);
  const [areBlobsThere, setAreBlobsThere] = useState(false);
  const [recordingHasStarted, setRecordingHasStarted] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  const getBlobs = () => {
    axios
      .get("/api/songs/getsongs")
      .then(({ data }) => {
        setAllBlobs(data);
        setAreBlobsThere(true);
        console.log("data →", allBlobs);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const recorder = useRecorderPermission("audio");
  const startRecording = async () => {
    setRecordingHasStarted(true);
    recorder.startRecording();
  };

  const stopRecording = async () => {
    setRecordingHasStarted(false);
    await recorder.stopRecording();
    let blob = await recorder.getBlob();
    console.log("blob", blob);
    //setCurrentBlob(blob);
    const randomName  = await Swal.fire({
      title: "name this song!",
      input: "text",
      inputPlaceholder: "go ahead...",
      background: "#181a1b",
      color: "#fff",
      showCancelButton: true,
      allowOutsideClick: false,
    });

    let savedFile = new File([blob], `${randomName.value}.webm`, {
      type: "audio/webm",
    });

    console.log("randomName", randomName.value);

    invokeSaveAsDialog(blob, `${randomName.value}.webm`);

    const savedBlob = {
      userId: currentUser.id,
      song: savedFile,
      name: `${randomName.value}.webm`,
    };

    axios
      .post("/api/songs/savesong", savedBlob, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((data) => {
        console.log("post data", data);
        getBlobs();
      })
      .catch((err) => {
        console.error("error inside songsave post request in frontend", err);
      });
  };

  const selectBlob = (song: Song) => {
    setCurrentSongURL(song.fileURL);
  };

  const recordOrStopRender = () => {
    return !recordingHasStarted ? (
      <i
        className="fas fa-circle"
        id="recordButton"
        onClick={startRecording}
      ></i>
    ) : (
      <i
        className="fas fa-stop-circle"
        id="stopRecordButton"
        onClick={stopRecording}
      ></i>
    );
  };

  useEffect(() => {
    getBlobs();
    console.log("allblobs→", allBlobs);
  }, [areBlobsThere]);

  return (
    <div className="audio-recording-area">
      <select
        className="form-select"
        size={8}
        aria-label="size 3 select example"
      >
        <option className="select-title" selected>
          Pick a song
        </option>
        {allBlobs.map((song) => {
          return (
            <option
              className="each-song"
              onClick={() => {
                selectBlob(song);
              }}
              key={song.id}
            >
              {song.fileName.slice(0, song.fileName.indexOf("."))}
            </option>
          );
        })}
      </select>
      {recordOrStopRender()}
      <ReactAudioPlayer
        className="player"
        src={currentSongURL}
        autoPlay
        controls
      />
    </div>
  );
};
