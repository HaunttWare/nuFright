import React from "react";
import "./octave.styles.css";
import * as Tone from "tone";

const notes = [
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
  "C5",
  "C#5",
  "D5",
  "D#5",
  "E5",
  "F5",
  "F#5",
  "G5",
  "G#5",
  "A5",
  "A#5",
  "B5",
  "C6",
];

const keyBoardPress = (note: string) => {
  // const vibrato = new Tone.Vibrato();
  const synth = new Tone.PolySynth().toDestination();

  synth.set({ detune: -1200 });

  for (let i = 0; i <= notes.length; i++) {
    if (note === notes[i]) {
      synth.triggerAttackRelease([notes[i], notes[i + 4], notes[i + 9]], "8n");
    }
  }
};

const Octave: React.FC = () => {
  return (
    <div id="casing">
      <h2 className="keyboard-logo">Kreepy Keys</h2>
      <div className="row mt-5">
        <div className="col-md-6"></div>

        <div className="col-md-6 d-flex justify-content-center flex-wrap">
          <div id="piano-keyboard">
            {notes.slice(0, notes.indexOf("C#5")).map((note) => {
              if (!note.includes("#")) {
                return (
                  <div
                    className="key key-natural"
                    onClick={() => keyBoardPress(note)}
                  ></div>
                );
              } else {
                return (
                  <div
                    className="key key-sharp"
                    onClick={() => keyBoardPress(note)}
                  ></div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Octave;
