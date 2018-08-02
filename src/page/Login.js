import React, { Component } from 'react'
import '../css/App.css'

import TopNavLogin from '../component/TopNav/TopNavLogin'
import LoginForm from '../component/Form/LoginForm'


class Login extends Component{
  constructor(props){
    super(props);
    this.pageClick = props.pageLoginClick
  }
  state = {
    pageRegisCard: false
  }
  goToRegisCard=()=>{
    this.setState((prevState)=>{
      return {pageRegisCard: !prevState.pageRegisCard};
    });
  };
  render(){
    return(
      <div>
        <TopNavLogin
          regisPageClick = {this.goToRegisCard}
          regisCardState = {this.state.pageRegisCard}/>
        <div className="maincontentlogin">
          <LoginForm
            loginClick = {this.pageClick}
            afterRegis = {this.props.pageRegisCard}/>
        </div>
      </div>
    );
  }
}

export default Login;
