import React from 'react';
//import data
import { selection1 }from './example-data.json';
import { mens_selection } from './mens-costumes.json';
//import subcomponents
import CostumeCard from './CostumeCard';

const CostumesList = () => {

    return (
        <div>
            <h1>Costumes</h1>
            <div className="row">
                {mens_selection.map((costume:any, index:number) => {
                    return <CostumeCard name={costume.name} url={costume.url} costumeImg={costume.costumeImg} costumeImg_url={costume.costumeImg_url} key={index} />
                })}
            </div>
        </div>
    )
}

export default CostumesList;

// <p onClick={() => location.href = costume.url}>{costume.name}</p>