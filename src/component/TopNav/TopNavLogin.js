import React from 'react'
import ReactDom from 'react-dom'
import './TopNavLogin.css'

import EditText from '../EditText/EditText'
import logo from '../img/logo.svg'

class TopNavLogin extends React.Component{
  constructor(props){
    super(props);
  }
  inputUsername=(val)=>{
    this.props.inputUsername(val);
  }
  inputPassword=(val)=>{
    this.props.inputPassword(val);
  }
  render(){
    let ahref = ""
    if(this.props.regisCardState){
      ahref = "#registerCard"
    }
    return(
      <div>
        <header className="topnavlogin">
          <nav className="topnavlogin__nav">
            <div className="topnavlogin__logo">
              <a href="/"><img src={logo}></img></a>
            </div>
            <div className="spacer"></div>
            <div className="topnavlogin__edittext">
              <EditText type="text" placeholder="Enter Email"
                editTextValue={this.inputUsername}/>
              <EditText type="password" placeholder="Password"
                editTextValue={this.inputPassword}/>
            </div>
            <div className="topnavlogin__signin">
              <form onSubmit={this.props.submitLogin}>
                <button>Sign in</button>
              </form>
            </div>
            <div className="topnavlogin__signup">
              <a href={ahref} className="signupbtn" onClick={this.props.regisPageClick}>Sign up</a>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default TopNavLogin;
