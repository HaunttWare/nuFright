import React from "react";
import './octave.styles.css';
import * as Tone from 'tone'

const cnatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('C3', '8n');
}
const csharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('C#3', '8n');
}
const dnatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('D3', '8n');
}
const dsharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('D#3', '8n');
}
const enatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('E3', '8n');
}
const fnatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('F3', '8n');
}
const fsharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('F#3', '8n');
}
const gnatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('G3', '8n');
}
const gsharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('G#3', '8n');
}
const anatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('A3', '8n');
}
const asharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('A#3', '8n');
}
const bnatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('B3', '8n');
}
const c2natrual = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('C4', '8n');
}
const c2sharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('C#4', '8n');
}
const d2natural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('D4', '8n');
}
const d2sharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('D#4', '8n');
}
const e2natrual = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('E4', '8n');
}
const f2natural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('F4', '8n');
}
const f2sharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('F#4', '8n');
}
const g2natural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('G4', '8n');
}
const g2sharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('G#4', '8n');
}
const a2natural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('A4', '8n');
}
const a2sharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('A#4', '8n');
}
const b2natural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('B4', '8n');
}
const c3natural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('C5', '8n');
}


const Octave: React.FC = () => {
  return (
    <header>
    
    <h2>kreepy Keys</h2>
        <div className="row mt-5">
          <div className="col-md-6">
          </div>

          <div className="col-md-6 d-flex justify-content-center flex-wrap">
            <div id="piano-keyboard">
              <div className="key key-natural" onClick={cnatural}></div>
              <div className="key key-sharp" onClick={csharp}></div>
              <div className="key key-natural" onClick={dnatural}></div>
              <div className="key key-sharp" onClick={dsharp}></div>
              <div className="key key-natural" onClick={enatural}></div>
              <div className="key key-natural" onClick={fnatural}></div>
              <div className="key key-sharp" onClick={fsharp}></div>
              <div className="key key-natural" onClick={gnatural}></div>
              <div className="key key-sharp" onClick={gsharp}></div>
              <div className="key key-natural" onClick={anatural}></div>
              <div className="key key-sharp" onClick={asharp}></div>
              <div className="key key-natural" onClick={bnatural}></div>
              <div className="key key-natural" onClick={c2natrual}></div>
              <div className="key key-sharp" onClick={c2sharp}></div>
              <div className="key key-natural" onClick={d2natural}></div>
              <div className="key key-sharp" onClick={d2sharp}></div>
              <div className="key key-natural" onClick={e2natrual}></div>
              <div className="key key-natural" onClick={f2natural}></div>
              <div className="key key-sharp" onClick={f2sharp}></div>
              <div className="key key-natural" onClick={g2natural}></div>
              <div className="key key-sharp" onClick={g2sharp}></div>
              <div className="key key-natural" onClick={a2natural}></div>
              <div className="key key-sharp" onClick={a2sharp}></div>
              <div className="key key-natural" onClick={b2natural}></div>
              <div className="key key-natural" onClick={c3natural}></div>
            </div>
          </div>
        </div>
    </header>
   
  )
}

export default Octave;