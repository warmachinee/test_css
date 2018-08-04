import React from 'react'
import './ModalCreateMatch.css'

import ModalBackDrop from './ModalBackDrop'
import EditText from '../EditText/EditText'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'

class ModalCreateMatch extends React.Component{
  constructor(props){
    super(props)
    this.state={
      MatchID:"",
      MatchTeamNumber:"",
      MatchName:"",
      MatchLocation:"",
      MatchDate:""
    }
  }

  setMatchName=(val)=>{
    this.props.setMatchName(val);
  }
  setMatchTeamNumber=(val)=>{
    this.props.setMatchTeamNumber(val);
  }
  setMatchLocation=(val)=>{
    this.props.setMatchLocation(val);
  }

  setMatchDate=(val)=>{
    this.props.setMatchDate(val);
  }

  addMatch=()=>{
    this.props.addMatch();
    this.props.modalClick();
  }
  
  render(){
    if(this.props.modalState){
      return(
        <div className="modal-creatematch">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal-creatematch__grid">
            <div className="spacer"></div>
            <div className="modal-creatematch__card">
              <label>Match name</label>
              <EditTextImg type="text" placeholder="Match name" formType="username" editTextValue={this.setMatchName}/>
              <label>Team</label>
              <EditTextImg type="text" formType="username" placeholder="How many team?" editTextValue={this.setMatchTeamNumber}/>
              <label>Location</label>
              <EditTextImg type="text" placeholder="Location" formType="username" editTextValue={this.setMatchLocation}/>
              <label>Date</label>
              <EditTextImg type="date" placeholder="Date" formType="username" editTextValue={this.setMatchDate}/>
              <Button btnLabel="Close" btnOnClick = {this.props.modalClick}></Button>
              <Button btnLabel="Create" btnOnClick = {this.addMatch}></Button>
            </div>
            <div className="spacer"></div>
          </div>
          <div className="spacer"></div>
        </div>
      );
    }
    return null;
  }
}
export default ModalCreateMatch;
