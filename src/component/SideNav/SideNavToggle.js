import React from 'react'
import './SideNavToggle.css'
const sideNavToggle = props =>(
  <button className="toggle-btn" onClick={props.click}>
    <div className="toggle-btn__line"/>
    <div className="toggle-btn__line"/>
    <div className="toggle-btn__line"/>
  </button>
);
export default sideNavToggle;
