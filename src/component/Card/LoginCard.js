import React from 'react'
import './LoginCard.css'
import ProfileLogin from '../img/baseline-account_circle-24px-login.svg'

import Switch from '../Switch/Switch'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'

class LoginCard extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="form__card">
          <div className="form__card__switch">
            <Switch />
          </div>
          <div className="form__card__profilelogo">
            <div className="spacer"></div>
            <img src={ProfileLogin}></img>
            <div className="spacer"></div>
          </div>
          <div className="form__card__items">
            <EditTextImg type="text" placeholder="Enter Username" formType="username"
              editTextValue={this.props.inputUsername}/>
          </div>
          <div className="form__card__items">
            <EditTextImg type="password" placeholder="Password" formType="password"
              editTextValue={this.props.inputPassword}/>
          </div>
          <div className="form__card__items">
            <form>
              <Button btnLabel="Sign in" btnOnClick={this.props.submitLogin} type="button"/>
            </form>
          </div>
        </div>
    );
  }
}
export default LoginCard;
