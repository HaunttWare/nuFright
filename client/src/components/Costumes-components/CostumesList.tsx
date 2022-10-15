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

    return (
        <div>
            <h1>Costumes</h1>
            <button onClick={() => setSelect(!select)} style={{minWidth: 150, borderRadius: '45%', background: 'black', color: 'lime'}}>{select ? "men's costumes" : "women's costumes"}</button>
            <div className="row">
                {(select ? mens_selection : womens_selection).slice(index, listLength).map((costume:any, index:number) => {
                    return <CostumeCard name={costume.name} url={costume.url} costumeImg={costume.costumeImg} costumeImg_url={costume.costumeImg_url} key={index} />
                })}
            </div>
        </div>
    )
}

export default CostumesList;

// <p onClick={() => location.href = costume.url}>{costume.name}</p>