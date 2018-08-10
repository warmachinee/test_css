import React, { Component } from 'react';

import './SwitchToggle.css';
import ic_lang from '../img/baseline-language-24px.svg'

class SwitchToggle extends React.Component{
  constructor(props){
    super(props)
  }
  switchToggleState=(state)=>{
    this.props.switchToggleState(state)
  }
  render(){
    return(
      <div>
        <label className="switch-toggle">
          <input type="checkbox" onChange={(e)=>this.switchToggleState(e.target.checked)}/>
          <span className="slider-toggle round-toggle"></span>
        </label>
      </div>
    );
  }
}

export default SwitchToggle;
