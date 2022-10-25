import React, { ReactHTMLElement, useEffect, useState } from 'react';

const Voice = (props:{lang?:string, text:string}) => {
    const [supported, setSupported] = useState(true);
    const [lang, setLang] = useState(props.lang || 'en-US');
    const [text, setText] = useState(props.text);
    const [autoplay, setAutoPlay] = useState(false);
    const [isSpeeking, setSpeeking] = useState(false);
    const [speech, setSpeech] = useState(new SpeechSynthesisUtterance());
    speech.onend = () => setSpeeking(false);
    const [voices, setVoices] = useState(window.speechSynthesis.getVoices());
    speech.voice = voices[0];
    speech.pitch = 0;

    useEffect(() => {
        if("speechSynthesis" in window) {
            
        } else {
            setSupported(false);
        }
    }, []);

    // HANDLERS FOR BUTTONS
    const play = () => {
        speech.text = text;
        speech.lang = lang;
        setSpeeking(true);
        window.speechSynthesis.speak(speech);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
    };

    const select = (e:React.ChangeEvent<HTMLSelectElement>) => {
        for(const voice of voices) {
            if(e.target.value === voice.name) {
                speech.voice = voice;
            }
        }
    }

    return (
        <div id="Voice_Component" style={{display: 'inline-block'}}>
            { supported &&
                <>
                    <button className="btn btn-outline-secondary" disabled={isSpeeking} onClick={play} style={{background: !isSpeeking ? 'black' : 'gray', color: 'red', borderColor: '#6c757d', borderWidth: '1px', borderTopLeftRadius: '45%', borderBottomLeftRadius: '45%', borderTopRightRadius: '0%', borderBottomRightRadius: '0%', minWidth: 43}}>Play</button>
                    <button className="btn btn-outline-secondary" disabled={!isSpeeking} onClick={stop} style={{background: isSpeeking ? 'black' : 'gray', color: 'red', borderColor: '#6c757d', borderWidth: '1px', borderTopRightRadius: '45%', borderBottomRightRadius: '45%', borderTopLeftRadius: '0%', borderBottomLeftRadius: '0%', minWidth: 45}}>Stop</button>
                    <select onChange={select} style={{display: 'table-cell', verticalAlign: 'middle', marginLeft: 5, marginRight: 5, background: 'black', minHeight: '1.5em', borderWidth: 1, borderColor: '#6c757d'}}>
                        {voices.map(((voice:any, index:number) => {
                           return <option value={voice.name} key={index}>{voice.name}</option>
                        }))}
                    </select>
                </>
            }
        </div>
    )
}

export default Voice;