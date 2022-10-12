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
                    <button disabled={isSpeeking} onClick={play} style={{borderTopLeftRadius: '45%', borderBottomLeftRadius: '45%', minWidth: 43}}>Play</button>
                    <button disabled={!isSpeeking} onClick={stop} style={{borderTopRightRadius: '45%', borderBottomRightRadius: '45%', minWidth: 45}}>Stop</button>
                    <select onChange={select} style={{marginLeft: 5, marginRight: 5}}>
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