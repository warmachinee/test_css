import React from 'react'
import './ModalEditTeam.css'

import ModalBackDrop from './ModalBackDrop'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'

class ModalEditTeam extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      matchPlayer:''
    }
  }
  setTeamName=(data)=>{
    this.props.setTeamName(data)
  }
  render(){
    if(this.props.modalState){
      return(
        <div className="modal-editteamname">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal-editteamname__grid">
            <div className="spacer"></div>
            <div className="modal-editteamname__card">
              <div className="editteamname__item">
                <label>Team name</label>
              </div>
              <div className="editteamname__item">
                <EditTextImg type="text" placeholder="Team name" editTextValue={this.setTeamName} formType="username"/>
              </div>
              <div className="editteamname__item">
                <button onClick = {this.props.modalClick}>Close</button>
                <button onClick = {this.props.updateTNDN}>Edit</button>
              </div>
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
export default ModalEditTeam;
