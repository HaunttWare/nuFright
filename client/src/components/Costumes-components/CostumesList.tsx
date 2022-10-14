import React from 'react';
import { selection1 }from './example-data.json';
//import subcomponents
import CostumeCard from './CostumeCard';

const CostumesList = () => {

    return (
        <div>
            Costumes Page
            <>
                {selection1.map((costume:any, index:number) => {
                    return <CostumeCard name={costume.name} url={costume.url} costumeImg={costume.costumeImg} costumeImg_url={costume.costumeImg_url} key={index} />
                })}
            </>
        </div>
    )
}

export default CostumesList;

// <p onClick={() => location.href = costume.url}>{costume.name}</p>