import React from 'react'
import './LoginForm.css'
import EditTextImg from '../EditText/EditTextImg'

const LoginForm = props =>(
  <div className="form__grid">
    <div className="spacer"></div>
    <div className="form__card">
      <div className="form__card__items">
        <EditTextImg type="text" placeholder="Enter Email" formType="username"/>
      </div>
      <div className="form__card__items">
        <EditTextImg type="password" placeholder="Password" formType="password"/>
      </div>
      <div className="form__card__items">
        <EditTextImg type="email" placeholder="Email" formType="email"/>
      </div>
      <div className="form__card__items">
        <EditTextImg type="text" placeholder="Phone number" formType="phone"/>
      </div>
      <div className="form__card__items">
        <EditTextImg type="text" placeholder="Department" formType="department"/>
      </div>
    </div>
    <div className="spacer"></div>
  </div>
);

export default LoginForm
