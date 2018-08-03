import React from 'react'
import './ModalCreateMatch.css'

import ModalBackDrop from './ModalBackDrop'
import EditText from '../EditText/EditText'
import Button from '../Button/Button'

class ModalCreateMatch extends React.Component{
  constructor(props){
    super(props)
    this.state={
      MatchID:"",
      MatchName:"",
      MatchLocation:"",
      MatchDate:""
    }
  }

  setMatchName=(val)=>{
    this.props.setMatchName(val);
  }

  setMatchLocation=(val)=>{
    this.props.setMatchLocation(val);
  }

  setMatchDate=(val)=>{
    this.props.setMatchDate(val);
  }

  addMatch=()=>{
    this.props.addMatch();
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
              <EditText type="text" placeholder="Match name" editTextValue={this.setMatchName}/>
              <label>Team</label>
              <EditText type="text" placeholder="How many team?"/>
              <label>Location</label>
              <EditText type="text" placeholder="Location" editTextValue={this.setMatchLocation}/>
              <label>Date</label>
              <EditText type="date" placeholder="Date" editTextValue={this.setMatchDate}/>
              <Button btnLabel="Close" btnOnClick = {this.props.modalClick}></Button>
              <Button btnLabel="Create" btnOnClick={this.addMatch} ></Button>
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
