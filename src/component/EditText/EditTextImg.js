import React from 'react'
import './EditTextImg.css'

import ic_person from '../img/baseline-person_outline-24px.svg'
import ic_lock from '../img/outline-lock-24px.svg'
import ic_email from '../img/outline-email-24px.svg'
import ic_phone from '../img/outline-phone-24px.svg'
import ic_department from '../img/outline-account_balance-24px.svg'
import ic_racket from '../img/golf-bag-equipment-with-sticks-set.svg'

const EditTextImg = props => {
  switch (props.formType) {
    case 'username':
      return(
        <div className="edittextimg__grid">
          <img src={ic_person}></img>
          <input type={props.type} placeholder={props.placeholder}/>
        </div>
      );
      break;
    case 'password':
      return(
        <div className="edittextimg__grid">
          <img src={ic_lock}></img>
          <input type={props.type} placeholder={props.placeholder}/>
        </div>
      );
      break;
    case 'email':
      return(
        <div className="edittextimg__grid">
          <img src={ic_email}></img>
          <input type={props.type} placeholder={props.placeholder}/>
        </div>
      );
      break;
    case 'phone':
      return(
        <div className="edittextimg__grid">
          <img src={ic_phone}></img>
          <input type={props.type} placeholder={props.placeholder}/>
        </div>
      );
      break;
    case 'department':
      return(
        <div className="edittextimg__grid">
          <img src={ic_department}></img>
          <input type={props.type} placeholder={props.placeholder}/>
        </div>
      );
      break;
    case 'racket':
      return(
        <div className="edittextimg__grid">
          <img src={ic_racket}></img>
          <input type={props.type} placeholder={props.placeholder}/>
        </div>
      );
      break;
    default:

  }

};

export default EditTextImg
