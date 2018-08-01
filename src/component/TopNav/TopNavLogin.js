import React from 'react'
import './TopNavLogin.css'

import EditText from '../EditText/EditText'
import logo from '../img/logo.svg'

const Topnav = props =>(
  <header className="topnavlogin">
    <nav className="topnavlogin__nav">
      <div className="topnavlogin__logo">
        <a href="/"><img src={logo}></img></a>
      </div>
      <div className="spacer"></div>
      <div className="topnavlogin__edittext">
        <EditText type="text" placeholder="Enter Email" />
        <EditText type="password" placeholder="Password" />
      </div>
      <div className="topnavlogin__signin">
        <form>
          <button>Sign in</button>
        </form>
      </div>
      <div className="topnavlogin__signup"><a href="/">Sign up</a></div>
    </nav>
  </header>
);

export default Topnav;
