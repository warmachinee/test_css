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
  Public: ['PUBLIC','สาธารณะ'],
  Running: ['Running','กำลังเล่น'],
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
          <a>
            <img className="icon" src={ic_noti_side} />
            <div className="text">
              <button onClick={props.notiClick}>{menu.Notifications[i]}</button>
            </div>
          </a>
        </li>
        <li>
          <a>
            <img className="icon" src={ic_profile_side} />
            <div className="text">
              <button>{menu.Profile[i]}</button>
            </div>
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <a>
            <img className="icon" src={ic_dashboard} />
            <div className="text">
              <button onClick={props.dashboardPageClick}>{menu.Dashboard[i]}</button>
            </div>
          </a>
        </li>
        <li>
          <a>
            <img className="icon" src={ic_dashboard} />
            <div className="text">
              <button onClick={props.publicPageClick}>{menu.Public[i]}</button>
            </div>
          </a>
        </li>
        <li>
          <a>
            <img className="icon" src={ic_dashboard} />
            <div className="text">
              <button onClick={props.runningPageClick}>{menu.Running[i]}</button>
            </div>
          </a>
        </li>
        <li>
          <a>
            <img className="icon" src={ic_history} />
            <div className="text">
              <button onClick={props.historyPageClick}>{menu.History[i]}</button>
            </div>
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
