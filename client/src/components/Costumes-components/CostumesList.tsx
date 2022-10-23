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
            <div className='row'>
                <div className='col' style={{display: 'inline-flex', float: 'left'}}>
                    <button onClick={switchDisplay} style={{minWidth: 150, borderTopLeftRadius: '45%', borderBottomLeftRadius: '45%', background: select ? 'black' : '', color: select ? 'lime': '', marginLeft: 5}} disabled={select}>Men's Costumes</button>
                    <button onClick={switchDisplay} style={{minWidth: 150, borderTopRightRadius: '45%', borderBottomRightRadius: '45%', background: select ? '' : 'black', color: select ? '' : 'lime'}} disabled={!select}>Women's Costumes</button>
                </div>
                <div className='col' style={{display: 'inline-flex', justifyContent: 'right', marginRight: 5}}>
                    <button disabled={!(index > 0)} onClick={() => switchPage(-1)} style={{minWidth: 45, borderTopLeftRadius: '45%', borderBottomLeftRadius: '45%', background: !(index > 0) ? '' : 'black', color: !(index > 0) ? '' : 'lime'}}>Back</button>
                    <button disabled={!(index + listLength < (select ? mens_selection.length : womens_selection.length))} onClick={() => switchPage(1)} style={{minWidth: 46, borderTopRightRadius: '45%', borderBottomRightRadius: '45%', background: !(index + listLength < (select ? mens_selection.length : womens_selection.length)) ? '' : 'black', color: !(index + listLength < (select ? mens_selection.length : womens_selection.length)) ? '' : 'lime'}}>Next</button>
                </div>
            </div>
            <div className="card-group">
                {(select ? mens_selection : womens_selection).map((costume:any, indexKey:number) => {
                    return index <= indexKey && indexKey < listLength + index && <CostumeCard name={costume.name} url={costume.url} costumeImg={costume.costumeImg} costumeImg_url={costume.costumeImg_url} key={indexKey} />
                })}
            </div>
        </div>
    )
}

export default CostumesList;

// <p onClick={() => location.href = costume.url}>{costume.name}</p>