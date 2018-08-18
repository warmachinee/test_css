import React from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './LoginForm.css'
import ProfileLogin from '../img/baseline-account_circle-24px-login.svg'

import Switch from '../Switch/Switch'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'
import LoginCard from '../Card/LoginCard'
import RegisCard from '../Card/RegisCard'

class LoginForm extends React.Component{
  constructor(props){
    super(props);
  }
  inputUsername=(val)=>{
    this.props.inputUsername(val);
  }
  inputPassword=(val)=>{
    this.props.inputPassword(val);
  }
  inputUsernameRegis=(val)=>{
    this.props.inputUsernameRegis(val)
  }
  inputPhoneRegis=(val)=>{
    this.props.inputPhoneRegis(val)
  }
  inputFullnameRegis=(val)=>{
    this.props.inputFullnameRegis(val)
  }
  inputLastnameRegis=(val)=>{
    this.props.inputLastnameRegis(val)
  }
  inputPasswordRegis=(val)=>{
    this.props.inputPasswordRegis(val)
  }
  regisCard =()=>{
    return(
      <RegisCard
        inputUsernameRegis={this.inputUsernameRegis}
        inputPasswordRegis={this.inputPasswordRegis}
        inputFullnameRegis={this.inputFullnameRegis}
        inputLastnameRegis={this.inputLastnameRegis}
        inputPhoneRegis={this.inputPhoneRegis}
        submitRegis={this.props.submitRegis}/>
    );
  }
  render(){
    return(
      <Router>
        <div className="form__grid">
          <div className="spacer"></div>
          <div className="form__middle__card">
            <div className="spacer"></div>

          <Route
              path="/login"
              render={()=>
                <LoginCard
                  inputUsername={this.inputUsername}
                  inputPassword={this.inputPassword}
                  submitLogin={this.props.submitLogin}/>
              }/>
          <Route
            path="/register"
            render={this.regisCard}/>
            <div className="spacer"></div>
          </div>
          <div className="spacer"></div>
        </div>
      </Router>
    );
  }

}


export default LoginForm
