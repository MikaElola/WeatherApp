import React, { Component } from 'react';
import './App.css';
import Saa from './components/Saa';
import HeaderLogo from './HeaderLogo';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <HeaderLogo></HeaderLogo>
        <Saa></Saa>
      </div>
    );
  }
}

export default App;
