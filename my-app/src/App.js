// import logo from './logo.svg';

import Carousels from './Project/Carousels';
import React from 'react';
import DropDown from './Project/DropDown';
import FooterCurve from './Project/FooterCurve';
import ImageScroll from './Project/ImageScroll';
import BasicExample from './Project/Navbar';
import ScrollCounding from './Project/ScrollCounding';
import TapSelection from './Project/TapSelection';
import App1 from './Project/Toggle';



function App() {
  return (
    <div className="App">
      <BasicExample/>
<App1/>
     <Carousels/>   
     <TapSelection/>
   <ImageScroll/>
     <DropDown/>
     <ScrollCounding/>
     <FooterCurve/>
    </div>
  );
}

export default App;
