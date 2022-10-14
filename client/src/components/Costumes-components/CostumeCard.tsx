import React from 'react';

const CostumeCard = (props:{name:string, url:string, costumeImg:string, costumeImg_url:string}) => {
    return (
        <div className="col-sm-3">
            <div className="card" style={{width: '17rem', background: 'rgb(220, 53, 69)', margin: 5}}>
                <img className="card-img-top" src={props.costumeImg} alt="Card image cap"></img>
                <div className="card-body">
                    <a className="card-title" href={props.url} target='_blank' rel="noreferrer" style={{textDecoration: 'none', color: 'white'}}>{props.name}</a>
                </div>
            </div>
        </div>
    )
}

export default CostumeCard