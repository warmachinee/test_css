import React from 'react'
import './LoginForm.css'
import ProfileLogin from '../img/baseline-account_circle-24px-login.svg'

import Switch from '../Switch/Switch'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'


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
  inputSexRegis=(val)=>{
    this.props.inputSexRegis(val)
  }
  inputFullnameRegis=(val)=>{
    this.props.inputFullnameRegis(val)
  }
  inputLastnameRegis=(val)=>{
    this.props.inputLastnameRegis(val)
  }
  inputNicknameRegis=(val)=>{
    this.props.inputNicknameRegis(val)
  }
  inputDepartmentRegis=(val)=>{
    this.props.inputDepartmentRegis(val)
  }
  inputRacketRegis=(val)=>{
    this.props.inputRacketRegis(val)
  }
  inputPasswordRegis=(val)=>{
    this.props.inputPasswordRegis(val)
  }
  inputConfirmPasswordRegis=(val)=>{
    this.props.inputConfirmPasswordRegis(val)
  }

  render(){
    return(
      <div className="form__grid">
        <div className="spacer"></div>
        <div className="form__middle__card">
          <div className="spacer"></div>
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
                  editTextValue={this.inputUsername}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="password" placeholder="Password" formType="password"
                  editTextValue={this.inputPassword}/>
              </div>
              <div className="form__card__items">
                <form>
                  <Button btnLabel="Sign in" btnOnClick={this.props.submitLogin} type="button"/>
                </form>
              </div>
            </div>
            <div className="form__card dis">
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
                  editTextValue={this.inputUsernameRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="password" placeholder="Password" formType="password"
                  editTextValue={this.inputPasswordRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="password" placeholder="Confirm Password" formType="password"
                  editTextValue={this.inputConfirmPasswordRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Sex" formType="username"
                  editTextValue={this.inputSexRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Fullname" formType="username"
                  editTextValue={this.inputFullnameRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Lastname" formType="username"
                  editTextValue={this.inputLastnameRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Nickname" formType="username"
                  editTextValue={this.inputNicknameRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Phone number" formType="phone"
                  editTextValue={this.inputPhoneRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Department" formType="department"
                  editTextValue={this.inputDepartmentRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Your racket" formType="racket"
                  editTextValue={this.inputRacketRegis}/>
              </div>
              <div className="form__card__items">
                <Button btnLabel="Sign up" btnOnClick={this.props.submitRegis} type="button"/>
              </div>
            </div>
            <div className="form__card regisinlogin">
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
                  editTextValue={this.inputUsernameRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="password" placeholder="Password" formType="password"
                  editTextValue={this.inputPasswordRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="password" placeholder="Confirm Password" formType="password"
                  editTextValue={this.inputConfirmPasswordRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Sex" formType="username"
                  editTextValue={this.inputSexRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Fullname" formType="username"
                  editTextValue={this.inputFullnameRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Lastname" formType="username"
                  editTextValue={this.inputLastnameRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Nickname" formType="username"
                  editTextValue={this.inputNicknameRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Phone number" formType="phone"
                  editTextValue={this.inputPhoneRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Department" formType="department"
                  editTextValue={this.inputDepartmentRegis}/>
              </div>
              <div className="form__card__items">
                <EditTextImg type="text" placeholder="Your racket" formType="racket"
                  editTextValue={this.inputRacketRegis}/>
              </div>
              <div className="form__card__items">
                <Button btnLabel="Sign up" btnOnClick={this.props.submitRegis} type="button"/>
              </div>
            </div>
          <div className="spacer"></div>
        </div>

        <div className="spacer"></div>
      </div>
    );
  }

}


export default LoginForm
