import React from 'react';
import './TopNav.css'

import SideNavToggle from '../SideNav/SideNavToggle'
import ic_add from '../img/baseline-add-24px.svg'
import ic_profile from '../img/baseline-account_circle-24px.svg'
import ic_noti from '../img/baseline-notifications-24px.svg'

const Topnav = props =>(
  <header className="topnav">
    <nav className="topnav__nav">
      <div>
        <SideNavToggle click={props.drawerClickHandler}/>
      </div>
      <div className="topnav__button">
        <a href="/"><img src={ic_add}></img></a>
      </div>
      <div className="spacer"></div>
      <div className="topnav__items">
        <ul>
          <li><a href="/"><img src={ic_noti}></img></a></li>
          <li><a href="/"><img src={ic_profile}></img></a></li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Topnav;
