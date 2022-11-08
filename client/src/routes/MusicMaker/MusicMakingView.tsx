import React from 'react';
import { isDotDotDotToken } from 'typescript';
import Octave from './Octave';
import RecordingApp from '../../components/record-playback/RecordingApp';
import './octave.styles.css';
const MusicMakingView = () => {
  return (
    <>
    <h2 style={{ display: "flex", justifyContent: "center", alignContent: "center", fontFamily: 'Montserrat', fontSize: "2.5em" }}>Spooky tunes</h2>
    <RecordingApp />
    <div style={{ display: 'flex'}}>
    <Octave />
    </div>
    </>
  )
};

export default MusicMakingView;