import React from 'react';
import { isDotDotDotToken } from 'typescript';
import Octave from '../../Octave';

const MusicMakingView = () => {
  return (
    <>
    <h2>Make some Spooky tunes!</h2>
    <div style={{ display: 'flex'}}>
    <Octave />
    </div>
    </>
  )
};

export default MusicMakingView;