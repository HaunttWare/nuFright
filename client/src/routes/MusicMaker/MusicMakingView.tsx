import React from 'react';
import Octave from './Octave';
import './octave.styles.css';
import { AudioRecorder } from '../../components/record-playback/AudioRecorder';

const MusicMakingView = () => {
  return (
    <section className='entire'>
    <h2 className='spooky-title' >Spooky tunes</h2>
    <AudioRecorder />
    <div>
    <Octave />
    </div>
    </section>
  )
};

export default MusicMakingView;