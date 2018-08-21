import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './TopNavLogin.css'

import EditText from '../EditText/EditText'
import logo from '../img/logo.svg'
import LoginForm from '../Form/LoginForm'

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
  handleKeyPress = (target) => {
    if(target.charCode === 13){
      console.log("Key press");
      this.props.submitLogin()
    }
  }
  render(){
    return(
      <Router>
        <div>
          <header className="topnavlogin">
            <nav className="topnavlogin__nav">
              <div className="topnavlogin__logo">
                <a href="/"><img src={logo}></img></a>
              </div>
              <div className="spacer"></div>
              <div className="topnavlogin__edittext">
                <EditText type="text" placeholder="Enter Email"
                  onKeyPress = {this.handleKeyPress}
                  editTextValue={this.inputUsername}/>
                <EditText type="password" placeholder="Password"
                  onKeyPress = {this.handleKeyPress}
                  editTextValue={this.inputPassword}/>
              </div>
              <div className="topnavlogin__signin">
                <button onClick={this.props.submitLogin}>Sign in</button>
              </div>
              <div className="topnavlogin__signup">
                <Link to='/register' component={this.props.regisCard}
                  className="signupbtn">Sign up</Link>
              </div>
            </nav>
          </header>
          <Route path='/register' component={this.props.regisCard} />
        </div>
      </Router>
    );
  }
}

export default TopNavLogin;
