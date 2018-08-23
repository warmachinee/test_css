import React from 'react'
import './EditTextImg.css'

import ic_person from '../img/baseline-person_outline-24px.svg'
import ic_lock from '../img/outline-lock-24px.svg'
import ic_email from '../img/outline-email-24px.svg'
import ic_phone from '../img/outline-phone-24px.svg'
import ic_department from '../img/outline-account_balance-24px.svg'
import ic_racket from '../img/golf-bag-equipment-with-sticks-set.svg'
import ic_date from '../img/outline-date_range-24px.svg'
import ic_matchname from '../img/outline-golf_course-24px.svg'
import ic_team from '../img/outline-group-24px.svg'
import ic_search from '../img/baseline-search-24px.svg'

class EditTextImg extends React.Component{
  constructor(props){
    super(props)

  }
  editTextValue=(val)=>{
    this.props.editTextValue(val);
  }
  render(){
    switch (this.props.formType) {
      case 'username':
        return(
          <div className="edittextimg__grid">
            <img src={ic_person}></img>
            <input type={this.props.type} placeholder={this.props.placeholder}
              onKeyPress = {this.props.onKeyPress}
              onChange={(e)=>this.editTextValue(e.target.value)}/>
          </div>
        );
        break;
      case 'password':
        return(
          <div className="edittextimg__grid">
            <img src={ic_lock}></img>
            <input type={this.props.type} placeholder={this.props.placeholder}
              onKeyPress = {this.props.onKeyPress}
              onChange={(e)=>this.editTextValue(e.target.value)}/>
          </div>
        );
        break;
      case 'search':
        return(
          <div className="edittextimg__grid">
            <img src={ic_search}></img>
            <input type={this.props.type} placeholder={this.props.placeholder}
              onKeyPress = {this.props.onKeyPress}
              onChange={(e)=>this.editTextValue(e.target.value)}/>
          </div>
        );
        break;
      case 'email':
        return(
          <div className="edittextimg__grid">
            <img src={ic_email}></img>
            <input type={this.props.type} placeholder={this.props.placeholder}
              onKeyPress = {this.props.onKeyPress}
              onChange={(e)=>this.editTextValue(e.target.value)}/>
          </div>
        );
        break;
      case 'phone':
        return(
          <div className="edittextimg__grid">
            <img src={ic_phone}></img>
            <input type={this.props.type} placeholder={this.props.placeholder}
              onKeyPress = {this.props.onKeyPress}
              onChange={(e)=>this.editTextValue(e.target.value)}/>
          </div>
        );
        break;
      case 'department':
        return(
          <div className="edittextimg__grid">
            <img src={ic_department}></img>
            <input type={this.props.type} placeholder={this.props.placeholder}
              onKeyPress = {this.props.onKeyPress}
              onChange={(e)=>this.editTextValue(e.target.value)}/>
          </div>
        );
        break;
      case 'date':
        return(
          <div className="edittextimg__grid">
            <img src={ic_date}></img>
            <input type={this.props.type} placeholder={this.props.placeholder}
              onKeyPress = {this.props.onKeyPress}
              onChange={(e)=>this.editTextValue(e.target.value)}/>
          </div>
        );
        break;
      case 'team':
        return(
          <div className="edittextimg__grid">
            <img src={ic_team}></img>
            <input type={this.props.type} placeholder={this.props.placeholder}
              onKeyPress = {this.props.onKeyPress}
              onChange={(e)=>this.editTextValue(e.target.value)}/>
          </div>
        );
        break;
      case 'matchname':
        return(
          <div className="edittextimg__grid">
            <img src={ic_matchname}></img>
            <input type={this.props.type} placeholder={this.props.placeholder}
              onKeyPress = {this.props.onKeyPress}
              onChange={(e)=>this.editTextValue(e.target.value)}/>
          </div>
        );
        break;
      case 'racket':
        return(
          <div className="edittextimg__grid">
            <img src={ic_racket}></img>
            <input type={this.props.type} placeholder={this.props.placeholder}
              onKeyPress = {this.props.onKeyPress}
              onChange={(e)=>this.editTextValue(e.target.value)}/>
          </div>
        );
        break;
      default:
        return(
          <div className="edittextimg__grid">
            <img src={ic_person}></img>
            <input type="text" placeholder="EditTextImg"
              onKeyPress = {this.props.onKeyPress}
              onChange={(e)=>this.editTextValue(e.target.value)}/>
          </div>
        );
      }
  }
}

export default EditTextImg;
