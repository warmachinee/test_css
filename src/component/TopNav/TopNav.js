import React from 'react';
import './TopNav.css'

import SideNavToggle from '../SideNav/SideNavToggle'
import ic_add from '../img/baseline-add-24px.svg'
import ic_profile from '../img/baseline-account_circle-24px.svg'
import ic_noti from '../img/baseline-notifications-24px.svg'

class TopNav extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    return(
      <header className="topnav">
        <nav className="topnav__nav">
          <div>
            <SideNavToggle click={this.props.drawerClickHandler}/>
          </div>
          <div className="topnav__button">
            <a onClick={this.props.loadField}><img src={ic_add}></img></a>
          </div>
          <div className="spacer"></div>
          <div className="topnav__button" style={{transform: 'translateX(-3rem)'}}>User Id : {this.props.userID}</div>
          <div className="spacer"></div>
          <div className="topnav__items">
            <ul>
              <li><a onClick={this.props.notiClick} href="#"><img src={ic_noti}></img></a></li>
              <li><a href="#" onClick={()=>{alert('Not available')}}><img src={ic_profile}></img></a></li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default TopNav;
