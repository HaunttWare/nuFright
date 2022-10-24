import React from "react";
import { useNavigate } from "react-router-dom";
import "./landingpage.styles.scss";

const LandingPage = () => {
  const navigate = useNavigate();
  var audio = new Audio(
    "http://soundbible.com/mp3/Female_Scream_Horror-NeoPhyTe-138499973.mp3"
  );

  const boo = () => {
    navigate("/home");
    audio.play();
  };

  return (
    <div className="landingpage">
      <div id="wrapper">
        <h1 className="glitch" data-text="nuFright">
          nuFright
        </h1>
        <span className="sub">Enter at your own risk</span>
      </div>
      <span onClick={boo} className="arrow-container">
        <div className="arrow">
          <div className="arrow">
            <div className="arrow"></div>
          </div>
        </div>
      </span>
    </div>
  );
};

export default LandingPage;
