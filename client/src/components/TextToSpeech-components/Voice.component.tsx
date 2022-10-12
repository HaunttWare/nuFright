import React, { useEffect, useState } from 'react';

const Voice = (props:{lang?:string, text:string}) => {
    const [supported, setSupported] = useState(true);
    const [lang, setLang] = useState(props.lang || 'en-US');
    const [text, setText] = useState(props.text);
    const [autoplay, setAutoPlay] = useState(false);
    const [isSpeeking, setSpeeking] = useState(false);
    const [_speech, setSpeech] = useState(new SpeechSynthesisUtterance());

    useEffect(() => {
        if("speechSynthesis" in window) {
            _speech.onend = () => setSpeeking(false);
        } else {
            setSupported(false);
        }
    }, []);

    const play = () => {
        _speech.text = text;
        _speech.lang = lang;
        setSpeeking(true);
        window.speechSynthesis.speak(_speech);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
    };

    return (
        <div id="Voice_Component">
            <button disabled={isSpeeking} onClick={play}>Play</button>
            <button disabled={!isSpeeking} onClick={stop}>Stop</button>
        </div>
    )
}

export default Voice;