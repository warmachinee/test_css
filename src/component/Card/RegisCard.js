import React from 'react'
import './RegisCard.css'
import ProfileLogin from '../img/baseline-account_circle-24px-login.svg'

import Switch from '../Switch/Switch'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'

class RegisCard extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        <div className="form__card dis">
          <div className="form__card__switch">
            {/*<Switch />*/}
          </div>
          <div className="form__card__profilelogo">
            <div className="spacer"></div>
            <img src={ProfileLogin}></img>
            <div className="spacer"></div>
          </div>
          <div className="form__card__items">
            <EditTextImg type="text" placeholder="Enter Email" formType="username"
              editTextValue={this.props.inputUsernameRegis}/>
          </div>
          <div className="form__card__items">
            <EditTextImg type="password" placeholder="Password" formType="password"
              editTextValue={this.props.inputPasswordRegis}/>
          </div>
          <div className="form__card__items">
            <EditTextImg type="text" placeholder="Fullname" formType="username"
              editTextValue={this.props.inputFullnameRegis}/>
          </div>
          <div className="form__card__items">
            <EditTextImg type="text" placeholder="Lastname" formType="username"
              editTextValue={this.props.inputLastnameRegis}/>
          </div>
          <div className="form__card__items">
            <EditTextImg type="text" placeholder="Phone number" formType="phone"
              editTextValue={this.props.inputPhoneRegis}/>
          </div>
          <div className="form__card__items">
            <Button btnLabel="Sign up" btnOnClick={this.props.submitRegis} type="button"/>
          </div>
        </div>

        <div className="form__card regisinlogin">
          <div className="form__card__switch">
            {/*<Switch />*/}
          </div>
          <div className="form__card__profilelogo">
            <div className="spacer"></div>
            <img src={ProfileLogin}></img>
            <div className="spacer"></div>
          </div>
          <div className="form__card__items">
            <EditTextImg type="text" placeholder="Enter Email" formType="username"
              editTextValue={this.props.inputUsernameRegis}/>
          </div>
          <div className="form__card__items">
            <EditTextImg type="password" placeholder="Password" formType="password"
              editTextValue={this.props.inputPasswordRegis}/>
          </div>
          <div className="form__card__items">
            <EditTextImg type="text" placeholder="Fullname" formType="username"
              editTextValue={this.props.inputFullnameRegis}/>
          </div>
          <div className="form__card__items">
            <EditTextImg type="text" placeholder="Lastname" formType="username"
              editTextValue={this.props.inputLastnameRegis}/>
          </div>
          <div className="form__card__items">
            <EditTextImg type="text" placeholder="Phone number" formType="phone"
              editTextValue={this.props.inputPhoneRegis}/>
          </div>
          <div className="form__card__items">
            <Button btnLabel="Sign up" btnOnClick={this.props.submitRegis} type="button"/>
          </div>
        </div>
      </div>
    );
  }
}
export default RegisCard;
