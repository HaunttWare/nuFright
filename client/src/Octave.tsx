import React from "react";
import * as Tone from 'tone'

const cnatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('C4', '8n');
}
const csharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('C#4', '8n');
}
const dnatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('D4', '8n');
}
const dsharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('D#4', '8n');
}
const enatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('E4', '8n');
}
const fnatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('F4', '8n');
}
const fsharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('F#4', '8n');
}
const gnatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('G4', '8n');
}
const gsharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('G#4', '8n');
}
const anatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('A4', '8n');
}
const asharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('A#4', '8n');
}
const bnatural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('B4', '8n');
}
const c2natrual = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('C5', '8n');
}
const c2sharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('C#5', '8n');
}
const d2natural = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('D5', '8n');
}
const d2sharp = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('D#5', '8n');
}
const e2natrual = () => {
  const synth = new Tone.Synth();
  synth.toDestination();
  synth.triggerAttackRelease('E5', '8n');
}
const Octave: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <button className="major" onClick={cnatural}>C</button>
      <div>
      <button className="minor" onClick={csharp}>C#/Db</button>
      </div>
      <button className="major" onClick={dnatural}>D</button>
      <div>
      <button className="minor" onClick={dsharp}>D#/Eb</button>
      </div>
      <button className="major" onClick={enatural}>E</button>
      <button className="major" onClick={fnatural}>F</button>
      <div>
      <button className="minor" onClick={fsharp}>F#/Gb</button>
      </div>
      <button className="major" onClick={gnatural}>G</button>
      <div>
      <button className="minor" onClick={gsharp}>G#/Ab</button>
      </div>
      <button className="major" onClick={anatural}>A</button>
      <div>
      <button className="minor" onClick={asharp}>A#/Bb</button>
      </div>
      <button className="major" onClick={bnatural}>B</button>
      <button className="major" onClick={c2natrual}>C</button>
      <div>
      <button className="minor" onClick={c2sharp}>C#/Db</button>
      </div>
      <button className="major" onClick={d2natural}>D</button>
      <div>
      <button className="minor" onClick={d2sharp}>D#/Eb</button>
      </div>
      <button className="major" onClick={e2natrual}>E</button>
    </div>
  )
}

export default Octave;