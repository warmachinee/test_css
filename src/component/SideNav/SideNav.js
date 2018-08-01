import React from 'react'
import './SideNav.css'

import logo from '../img/logo.svg'
import ic_profile from '../img/baseline-account_circle-24px.svg'
import ic_profile_side from '../img/baseline-account_circle-24px-white.svg'
import ic_noti from '../img/baseline-notifications-24px.svg'
import ic_noti_side from '../img/baseline-notifications-24px-white.svg'
import ic_dashboard from '../img/baseline-dashboard-24px-white.svg'
import ic_history from '../img/baseline-history-24px-white.svg'

const sideNav = props =>{
  let drawerClasses = 'sidenav';
  if(props.show){
    drawerClasses = 'sidenav open';
  }
  return (
    <nav className={drawerClasses}>
      <img className="sideimg" src={logo}></img>
      <div className="space"></div>
      <ul className="fromtopnav">
        <li>
          <a href="/">
            <img className="icon" src={ic_noti_side} />
            <div className="text">Notifications</div>
          </a>
        </li>
        <li>
          <a href="/">
            <img className="icon" src={ic_profile_side} />
            <div className="text">Profile</div>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="/">
            <img className="icon" src={ic_dashboard} />
            <div className="text">DASHBOARD</div>
          </a>
        </li>
        <li>
          <a href="/">
            <img className="icon" src={ic_history} />
            <div className="text">HISTORY</div>
          </a>
        </li>
        <form action={props.click}>
          <li style={{position: 'fixed',bottom: '3rem',left: '10rem'}}>
            <button className="sidenav-btn" style={{position: 'fixed',left: '3rem'}}>Log Out
            </button>
          </li>
        </form>
      </ul>
    </nav>
  );
};

export default sideNav;
