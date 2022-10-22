import React from 'react';
import {Link} from 'react-router-dom';
import './landingpage.styles.scss'

const LandingPage = () => {
  return (
    <div className='landingpage'>
      <div id='wrapper'>
        <h1 className='glitch' data-text='nuFright'>
          nuFright
        </h1>
        <span className='sub'>nightmare</span>
      </div>
      <Link to='/home' className='arrow-container'>
        <div className='arrow'>
          <div className='arrow'>
            <div className='arrow'></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LandingPage;
