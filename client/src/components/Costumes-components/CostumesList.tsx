import React, { useState } from "react";
//import data
import { selection1 } from "./example-data.json";
import { mens_selection, womens_selection } from "./costumes.json";
//import subcomponents
import CostumeCard from "./CostumeCard";
import "./costumes.styles.scss";

const CostumesList = () => {
  const [select, setSelect] = useState(true); //true = men false = women
  const [index, setIndex] = useState(0);
  const [listLength, setListLength] = useState(36);

  const switchDisplay = () => {
    setSelect(!select);
    setIndex(0);
  };

  const switchPage = (direction: number = 1) => {
    if (direction === 1) {
      setIndex(index + listLength);
    } else if (direction === -1) {
      setIndex(index - listLength);
    }
  };

  return (
    <>
    <div className="" style={{marginLeft: 5, marginRight: 6}}>
      <div className="d-inline-flex justify-content-left" style={{ height: "40px" }}>
        <button className={`btn btn-outline-danger tab ${select && "active"} `} onClick={() => {if(!select){switchDisplay()}}} style={{borderTopRightRadius: '0%', borderBottomRightRadius: '0%'}}>
          Mens
        </button>
        <button className={`btn btn-outline-danger tab ${!select && "active"} `} onClick={() => {if(select){switchDisplay()}}} style={{borderTopLeftRadius: '0%', borderBottomLeftRadius: '0%'}}>
          Womens
        </button>
      </div>
      <div className="d-inline-flex justify-content-right" style={{ height: "40px", float: 'right', }}>
        <button className={`btn btn-outline-danger`} onClick={() => switchPage(-1)} disabled={index === 0} style={{borderTopRightRadius: '0%', borderBottomRightRadius: '0%'}}>
          <i className="fa-solid fa-chevron-left"></i>Prev
        </button>
        <button className={`btn btn-outline-danger `} onClick={() => switchPage(1)} disabled={ index + listLength >= (select ? mens_selection.length : womens_selection.length) } style={{borderTopLeftRadius: '0%', borderBottomLeftRadius: '0%'}}>
          Next <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>

        <div className="card-group">
          {(select ? mens_selection : womens_selection).map(
            (costume: any, indexKey: number) => {
              return (
                index <= indexKey &&
                indexKey < listLength + index && (
                  <CostumeCard
                    name={costume.name}
                    url={costume.url}
                    costumeImg={costume.costumeImg}
                    costumeImg_url={costume.costumeImg_url}
                    key={indexKey}
                  />
                )
              );
            }
          )}
        </div>
    </>
  );
};

export default CostumesList;
