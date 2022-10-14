import React from 'react';
import { selection1 }from './example-data.json';

const CostumesList = () => {

    return (
        <div>
            Costumes Page
            <>
                {selection1.map((costume:any, index:number) => {
                    return <div key={index}>
                        <img src={costume.costumeImg}></img>
                        <p onClick={() => location.href = costume.url}>{costume.name}</p>
                    </div>
                })}
            </>
        </div>
    )
}

export default CostumesList;