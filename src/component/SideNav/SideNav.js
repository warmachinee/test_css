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
  Dashboard: ['My Match','แมทช์'],
  Public: ['PUBLIC ','แมทช์สาธารณะ'],
  Running: ['Running Match','แมทช์ที่กำลังเล่น'],
  History: ['History','ประวัติ'],
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
      <div className="sidelogo">
        <div className="space"></div>
        <div className="sideimg">
          <img src={logo}></img>
        </div>
        <div className="space"></div>
      </div>
      <div className="fromtopnav">
        <div className="sidenav__item">
          <img className="icon" src={ic_noti_side} />
          <div className="text">
            <button onClick={props.notiClick}>{menu.Notifications[i]}</button>
          </div>
        </div>
        <div className="sidenav__item">
          <img className="icon" src={ic_profile_side} />
          <div className="text">
            <button>{menu.Profile[i]}</button>
          </div>
        </div>
      </div>
      <div>
        <div className="sidenav__item">
          <img className="icon" src={ic_dashboard} />
          <div className="text">
            <button onClick={props.dashboardPageClick}>{menu.Dashboard[i]}</button>
          </div>
        </div>
        <div className="sidenav__item">
          <img className="icon" src={ic_dashboard} />
          <div className="text">
            <button onClick={props.publicPageClick}>{menu.Public[i]}</button>
          </div>
        </div>
        <div className="sidenav__item">
          <img className="icon" src={ic_dashboard} />
          <div className="text">
            <button onClick={props.runningPageClick}>{menu.Running[i]}</button>
          </div>
        </div>
        <div className="sidenav__item">
          <img className="icon" src={ic_history} />
          <div className="text">
            <button onClick={props.historyPageClick}>{menu.History[i]}</button>
          </div>
        </div>
      </div>
      <div className="space"></div>
      <div className="sidenav__logout">
        <div className="space"></div>
        <button
          className={menu.LogOutBtnClass[i]}
          onClick={props.logOut}>{menu.Logout[i]}
        </button>
        <div className="space"></div>
      </div>
    </nav>
  );
};

export default sideNav;
