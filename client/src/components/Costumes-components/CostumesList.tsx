import React, { useState } from 'react';
//import data
import { selection1 }from './example-data.json';
import { mens_selection, womens_selection } from './costumes.json';
//import subcomponents
import CostumeCard from './CostumeCard';

const CostumesList = () => {
    const [select, setSelect] = useState(true); //true = men false = women
    const [index, setIndex] = useState(0);
    const [listLength, setListLength] = useState(36);

    const switchDisplay = () => {
        setSelect(!select);
        setIndex(0);
    }

    const switchPage = (direction:number = 1) => {
        if(direction === 1) {
            setIndex(index + listLength);
        } else if(direction === -1) {
            setIndex(index - listLength);
        }
    }

    return (
        <div>
            <h1>Costumes</h1>
            <button onClick={switchDisplay} style={{minWidth: 150, borderRadius: '45%', background: 'black', color: 'lime'}}>{select ? "men's costumes" : "women's costumes"}</button>
            <div style={{display: 'inline-flex'}}>
                <button disabled={!(index > 0)} onClick={() => switchPage(-1)}>Back</button>
                <button disabled={!(index <= (select ? mens_selection.length : womens_selection.length))} onClick={() => switchPage(1)}>Next</button>
            </div>
            <div className="row">
                {(select ? mens_selection : womens_selection).map((costume:any, indexKey:number) => {
                    return index <= indexKey && indexKey < listLength + index && <CostumeCard name={costume.name} url={costume.url} costumeImg={costume.costumeImg} costumeImg_url={costume.costumeImg_url} key={indexKey} />
                })}
            </div>
        </div>
    )
}

export default CostumesList;

// <p onClick={() => location.href = costume.url}>{costume.name}</p>