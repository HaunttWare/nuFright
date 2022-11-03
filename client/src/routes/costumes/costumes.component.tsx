import React from 'react';
import CostumesList from '../../components/Costumes-components/CostumesList';

const Costumes = () => (
    <div className="container">
        <h3 style={{fontSize: '2.5em', color: 'white', fontFamily: 'Montserrat', display: 'flex', justifyContent: "center", alignContent: 'center'}}>Costumes</h3>
        <CostumesList />
    </div>
)

export default Costumes