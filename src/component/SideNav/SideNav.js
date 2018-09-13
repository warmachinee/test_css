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
import ic_public from '../img/outline-public-24px.svg'
import ic_process from '../img/outline-sync-24px.svg'

import Switch from '../Switch/Switch'

const menu ={
  Notifications: ['Notifications','การแจ้งเตือน'],
  Profile: ['Profile','โปรไฟล์'],
  MyMatch: ['My Match','แมทช์'],
  Dashboard: ['Dashboard','แดชบอร์ด'],
  Public: ['PUBLIC ','แมทช์สาธารณะ'],
  History: ['History','ประวัติ'],
  Logout: ['Log out','ออกจากระบบ'],
  LogOutBtnClass: ['sidenav-btn','sidenav-btn thailang']
}

const sideNav = props =>{
  let i = 1;
  if(props.lang){
    i = 0
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
        <p style={{color:'white'}}>User id : {props.dashUserID}</p>
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
            <button onClick={()=>{
                alert('Not available')
              }}>{menu.Profile[i]}</button>
          </div>
        </div>
      </div>
      <div>
        <div className="sidenav__item">
          <img className="icon" src={ic_dashboard} />
          <div className="text">
            <button onClick={props.userDashboardPageClick}>{menu.Dashboard[i]}</button>
          </div>
        </div>
        <div className="sidenav__item">
          <img className="icon" src={ic_dashboard} />
          <div className="text">
            <button onClick={props.dashboardPageClick}>{menu.MyMatch[i]}</button>
          </div>
        </div>
        <div className="sidenav__item">
          <img className="icon" src={ic_public} />
          <div className="text">
            <button onClick={props.publicPageClick}>{menu.Public[i]}</button>
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
