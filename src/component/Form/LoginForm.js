import React from 'react'
import './LoginForm.css'
import ProfileLogin from '../img/baseline-account_circle-24px-login.svg'

import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'
import LoginCard from './LoginCard'
import RegisCard from './RegisCard'


class LoginForm extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="form__grid" >
        <div className="spacer"></div>
          <div className="form__card">
            <div className="form__card__profilelogo">
              <div className="spacer"></div>
              <img src={ProfileLogin}></img>
              <div className="spacer"></div>
            </div>
            <div className="form__card__items">
              <EditTextImg type="text" placeholder="Enter Username" formType="username"/>
            </div>
            <div className="form__card__items">
              <EditTextImg type="password" placeholder="Password" formType="password"/>
            </div>
            <div className="form__card__items">
              <Button btnLabel="Sign in" btnOnClick={this.props.loginClick}/>
            </div>
          </div>

          <div className="form__card dis">
            <div className="form__card__profilelogo">
              <div className="spacer"></div>
              <img src={ProfileLogin}></img>
              <div className="spacer"></div>
            </div>
            <div className="form__card__items">
              <EditTextImg type="text" placeholder="Enter Username" formType="username"/>
            </div>
            <div className="form__card__items">
              <EditTextImg type="password" placeholder="Password" formType="password"/>
            </div>
            <div className="form__card__items">
              <EditTextImg type="password" placeholder="Confirm Password" formType="password"/>
            </div>
            <div className="form__card__items">
              <EditTextImg type="text" placeholder="Phone number" formType="phone"/>
            </div>
            <div className="form__card__items">
              <EditTextImg type="text" placeholder="Department" formType="department"/>
            </div>
            <div className="form__card__items">
              <EditTextImg type="text" placeholder="Your racket" formType="racket"/>
            </div>
            <div className="form__card__items">
              <Button btnLabel="Sign up" btnOnClick={this.props.loginClick}/>
            </div>
          </div>
        <div className="spacer"></div>
      </div>
    );
  }

}


export default LoginForm
