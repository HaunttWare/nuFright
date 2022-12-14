import React, { useState } from "react";
import './costumes.styles.scss'
const CostumeCard = (props: {
  name: string;
  url: string;
  costumeImg: string;
  costumeImg_url: string;
}) => {
  const replacementImg =
    require("../../../../assets/Hauntware-logo-prototype.png").default;
  const replacementImg2 = require("../../../../assets/face.png").default;


  return (
      <div className="card text-white" id="bright" style={{cursor: "pointer", margin: 5, marginBottom: '1em', minWidth: '13rem', maxWidth: '13rem', backgroundColor: 'black'}}>
        <div className="image-container">
          <div className="first">
            <div className="d-flex justify-content-between align-items-center">
              {/*<span className="wishlist">
                <i className="fa fa-heart-o"></i>
              </span>*/}
            </div>
          </div>

          <img
            src={!props.costumeImg.includes('https://spirit.scene7.com/is/image/Spirit/') ? Math.floor(Math.random() * 1000) + 1 !== 1 ? replacementImg : replacementImg2 : props.costumeImg}
            className="img-fluid rounded thumbnail-image"
            onClick={() => window.open(props.url, "_blank")}
          />
        </div>

        <div className="product-detail-container p-2">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="dress-name" onClick={() => window.open(props.url, "_blank")} >{props.name}</h5>
          </div>

          <div className="d-flex justify-content-between align-items-center pt-1">


            <div className="d-flex " onClick={() => window.open(props.url, "_blank")}>
              <span className="item-size mr-2 btn">S</span>
              <span className="item-size mr-2 btn">M</span>
              <span className="item-size btn">L</span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center pt-1">

            <span className="buy" onClick={() => window.open(props.url, "_blank")}>BUY <i className="fa-solid fa-cart-plus"></i></span>
          </div>
        </div>
      </div>
  );
};

export default CostumeCard;
