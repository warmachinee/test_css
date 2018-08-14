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
              <label>Team name</label>
              <EditTextImg type="text" placeholder="Team name" editTextValue={this.setTeamName} formType="username"/>
              <Button btnLabel="Close" btnOnClick = {this.props.modalClick}></Button>
              <Button btnLabel="Edit" btnOnClick = {this.props.updateTNDN}></Button>
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
