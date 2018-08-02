import React, { Component } from 'react';

import './Switch.css';
import ic_lang from '../img/baseline-language-24px.svg'

const Switch = props => {
  let i = 0
  let lang = ['En','Th']
  if(props.switchLang){
    i = 1
  }
  return(
    <div>
      <label className="switch">
        <input type="checkbox" onClick={props.switchClick}/>
        <div className="slider round">
          <div className="switch__text">{lang[i]}</div>
          <img className="switch__img "src={ic_lang}></img>
        </div>
      </label>
    </div>
  );
}


export default Switch;
