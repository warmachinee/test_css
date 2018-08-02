import React from 'react'
import './ModalCreateMatch.css'

import ModalBackDrop from './ModalBackDrop'
import EditText from '../EditText/EditText'
import Button from '../Button/Button'

class ModalCreateMatch extends React.Component{
  constructor(props){
    super(props)
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
              <EditText type="text" placeholder="Match name"/>
              <label>Team</label>
              <EditText type="text" placeholder="How many team?"/>
              <label>Location</label>
              <EditText type="text" placeholder="Location"/>
              <label>Date</label>
              <EditText type="date" placeholder="Date"/>
              <Button btnLabel="Close" btnOnClick = {this.props.modalClick}></Button>
              <Button btnLabel="Create"></Button>
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
