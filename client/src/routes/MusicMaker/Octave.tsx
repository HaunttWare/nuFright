import React from "react";
import './octave.styles.css';
import * as Tone from 'tone'



const keyBoardPress = (note: string) => {
  // const vibrato = new Tone.Vibrato();
  const synth = new Tone.PolySynth().toDestination();
 
  synth.set({ detune: -1200 });

  const notes = ['C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'];
  for (let i = 0; i <= notes.length; i++) {
    if (note === notes[i]) {
      synth.triggerAttackRelease([notes[i], notes[i + 4], notes[i + 9]], '8n');
    }
  }
}



const Octave: React.FC = () => {
  return (
    <header>
    
   
    <div id="casing">
    <h2>kreepy Keys</h2>
        <div className="row mt-5">
          <div className="col-md-6">
          </div>

          <div className="col-md-6 d-flex justify-content-center flex-wrap">
            <div id="piano-keyboard">
              <div className="key key-natural" onClick={() => keyBoardPress('C3')}></div>
              <div className="key key-sharp" onClick={() => keyBoardPress('C#3')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('D3')}></div>
              <div className="key key-sharp" onClick={() => keyBoardPress('D#3')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('E3')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('F3')}></div>
              <div className="key key-sharp" onClick={() => keyBoardPress('F#3')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('G3')}></div>
              <div className="key key-sharp" onClick={() => keyBoardPress('G#3')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('A3')}></div>
              <div className="key key-sharp" onClick={() => keyBoardPress('A#3')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('B3')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('C4')}></div>
              <div className="key key-sharp" onClick={() => keyBoardPress('C#4')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('D4')}></div>
              <div className="key key-sharp" onClick={() => keyBoardPress('D#4')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('E4')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('F4')}></div>
              <div className="key key-sharp" onClick={() => keyBoardPress('F#4')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('G4')}></div>
              <div className="key key-sharp" onClick={() => keyBoardPress('G#4')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('A4')}></div>
              <div className="key key-sharp" onClick={() => keyBoardPress('A#4')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('B4')}></div>
              <div className="key key-natural" onClick={() => keyBoardPress('C5')}></div>
            </div>
          </div>
        </div>

    </div>
    </header>
   
  )
}

export default Octave;