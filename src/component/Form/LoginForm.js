import React from 'react'
import './LoginForm.css'

import EditTextImg from '../EditText/EditTextImg'
import ProfileLogin from '../img/baseline-account_circle-24px-login.svg'

import Button from '../Button/Button'

const LoginForm = props =>(
  <div className="form__grid">
    <div className="spacer"></div>
    <div className="form__card">
      <div className="form__card__profilelogo">
        <div className="spacer"></div>
        <img src={ProfileLogin}></img>
        <div className="spacer"></div>
      </div>
      <div className="form__card__items">
        <EditTextImg type="text" placeholder="Enter Email" formType="username"/>
      </div>
      <div className="form__card__items">
        <EditTextImg type="password" placeholder="Password" formType="password"/>
      </div>
      <div className="form__card__items">
        <Button btnLabel="Sign in" btnOnClick={props.loginClick}/>
      </div>
    </div>
    <div className="spacer"></div>
  </div>
);

export default LoginForm
