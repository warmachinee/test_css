import React from 'react'
import './ModalAddPeople.css'

import ModalBackDrop from './ModalBackDrop'
import EditText from '../EditText/EditText'
import Button from '../Button/Button'

class ModalAddPeople extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    if(this.props.modalState){
      return(
        <div className="modal-addpeople">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal-addpeople__grid">
            <div className="spacer"></div>
            <div className="modal-addpeople__card">
              <label>Player name</label>
              <EditText type="text" placeholder="Player name"/>
              <label>Select team</label>
              <select>
                <option value="No team">No team</option>
                <option value="Team 1">Team 1</option>
                <option value="Team 2">Team 2</option>
                <option value="Team 3">Team 3</option>
                <option value="Team 4">Team 4</option>
              </select>
              <Button btnLabel="Close" btnOnClick = {this.props.modalClick}></Button>
              <Button btnLabel="Add"></Button>
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
export default ModalAddPeople;
