import React from 'react'
import ReactDom from 'react-dom'
import './TopNavLogin.css'

import EditText from '../EditText/EditText'
import logo from '../img/logo.svg'

class TopNavLogin extends React.Component{
  constructor(props){
    super(props);
  }

  regisToggle=()=>{
    this.props.reload();
  }

  render(){
    return(
      <div>
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
            <div className="topnavlogin__signup">
              <button className="signupbtn" onClick={this.regisToggle}>Sign up</button>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default TopNavLogin;
