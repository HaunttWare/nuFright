import React, { useEffect, useState } from 'react';

const Voice = (props:{lang?:string, text:string}) => {
    const [supported, setSupported] = useState(true);
    const [lang, setLang] = useState(props.lang || 'en-US');
    const [text, setText] = useState(props.text);
    const [autoplay, setAutoPlay] = useState(false);
    const [isSpeeking, setSpeeking] = useState(false);
    const [speech, setSpeech] = useState(new SpeechSynthesisUtterance());
    speech.onend = () => setSpeeking(false);

    useEffect(() => {
        if("speechSynthesis" in window) {

        } else {
            setSupported(false);
        }
    }, []);

    const play = () => {
        speech.text = text;
        speech.lang = lang;
        setSpeeking(true);
        window.speechSynthesis.speak(speech);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
    };

    return (
        <div id="Voice_Component" style={{display: 'inline-block'}}>
            <button disabled={isSpeeking} onClick={play} style={{borderTopLeftRadius: '45%', borderBottomLeftRadius: '45%', minWidth: 43}}>Play</button>
            <button disabled={!isSpeeking} onClick={stop} style={{borderTopRightRadius: '45%', borderBottomRightRadius: '45%', minWidth: 45}}>Stop</button>
        </div>
    )
}

export default Voice;