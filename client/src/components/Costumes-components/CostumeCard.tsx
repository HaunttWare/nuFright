import React from 'react';

const CostumeCard = (props:{name:string, url:string, costumeImg:string, costumeImg_url:string}) => {
    return (
        <div>
            <img src={props.costumeImg}></img>
            <a href={props.url} target='_blank' rel="noreferrer" style={{textDecoration: 'none', color: 'white'}}>{props.name}</a>
        </div>
    )
}

export default CostumeCard