import React from 'react';
import openLogo from './images/openlogo.png'
import './App.css';

const HeaderLogo = () => {

    return(
        <div className='App-header'>
            <img src={openLogo}></img>
        </div>
    )
};
export default HeaderLogo;