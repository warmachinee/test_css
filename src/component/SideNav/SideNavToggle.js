import React from 'react'
import './SideNavToggle.css'

import ic_menu from '../img/baseline-menu-24px.svg'
const sideNavToggle = props =>(
  <button className="toggle-btn" onClick={props.click}>
    <img src={ic_menu}></img>
  </button>
);
export default sideNavToggle;
