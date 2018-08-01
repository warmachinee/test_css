import React, { Component } from 'react'
import '../css/App.css'

import TopNavLogin from '../component/TopNav/TopNavLogin'
import LoginForm from '../component/Form/LoginForm'

const Login = props =>{
  return(
    <div>
      <TopNavLogin logoClick={props.pageLoginClick}/>
      <div className="maincontentlogin">
        <LoginForm />
        <button onClick={props.pageLoginClick}>Click</button>
      </div>
    </div>
  );
};
export default Login;
