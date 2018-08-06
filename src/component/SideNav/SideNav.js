import React from 'react'
import './SideNav.css'

import logo from '../img/logo.svg'
import ic_profile from '../img/baseline-account_circle-24px.svg'
import ic_profile_side from '../img/baseline-account_circle-24px-white.svg'
import ic_noti from '../img/baseline-notifications-24px.svg'
import ic_noti_side from '../img/baseline-notifications-24px-white.svg'
import ic_dashboard from '../img/baseline-dashboard-24px-white.svg'
import ic_history from '../img/baseline-history-24px-white.svg'
import ic_language from '../img/baseline-language-24px.svg'

import Switch from '../Switch/Switch'

const menu ={
  Notifications: ['Notifications','การแจ้งเตือน'],
  Profile: ['Profile','โปรไฟล์'],
  Dashboard: ['DASHBOARD','แดชบอร์ด'],
  History: ['HISTORY','ประวัติ'],
  Logout: ['Log out','ออกจากระบบ'],
  LogOutBtnClass: ['sidenav-btn','sidenav-btn thailang']
}

const sideNav = props =>{
  let i = 0;
  if(props.lang){
    i = 1
  }
  let drawerClasses = 'sidenav';
  if(props.show){
    drawerClasses = 'sidenav open';
  }
  return (
    <nav className={drawerClasses}>
      <div className="change__lang">
        <Switch
          switchClick={props.langClick}
          switchLang={props.lang}/>
      </div>
      <div className="sideimg">
        <img src={logo}></img>
      </div>
      <div className="space"></div>
      <ul className="fromtopnav">
        <li>
          <a href="/">
            <img className="icon" src={ic_noti_side} />
            <div className="text">{menu.Notifications[i]}</div>
          </a>
        </li>
        <li>
          <a href="/">
            <img className="icon" src={ic_profile_side} />
            <div className="text">{menu.Profile[i]}</div>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="/">
            <img className="icon" src={ic_dashboard} />
            <div className="text">{menu.Dashboard[i]}</div>
          </a>
        </li>
        <li>
          <a href="/">
            <img className="icon" src={ic_history} />
            <div className="text">{menu.History[i]}</div>
          </a>
        </li>
        <form>
          <li style={{position: 'fixed',bottom: '3rem',left: '10rem'}}>
            <button
              className={menu.LogOutBtnClass[i]}
              style={{position: 'fixed',left: '3rem'}}
              onClick={props.logOut}>{menu.Logout[i]}
            </button>
          </li>
        </form>
      </ul>
    </nav>
  );
};

export default sideNav;
