import React, { Component } from 'react'
import '../css/App.css'

import TopNavLogin from '../component/TopNav/TopNavLogin'
import LoginForm from '../component/Form/LoginForm'


class Login extends Component{
  constructor(props){
    super(props);
    this.pageClick = props.pageLoginClick
  }
  render(){
    return(
      <div>
        <TopNavLogin logoClick={this.pageClick}/>
        <div className="maincontentlogin">
          <LoginForm loginClick={this.pageClick}/>
        </div>
      </div>
    );
  }
}

export default Login;
