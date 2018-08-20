import React from 'react'
import './ModalAddPeople.css'

import ModalBackDrop from './ModalBackDrop'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'

class ModalAddPeople extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      matchPlayer:''
    }
  }
  addPeople = (val) =>{
    this.props.addPeople(val);
  }
  render(){
    if(this.props.modalState){
      return(
        <div className="modal-addpeople">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal-addpeople__grid">
            <div onClick = {this.props.modalClick} className="spacer"></div>
            <div className="modal-addpeople__card">
              <label>Player name</label>
              <EditTextImg type="text" placeholder="Player name" editTextValue={this.addPeople}/>
              <p>{this.props.matchTeamNumber}</p>
              <Button btnLabel="Close" btnOnClick = {this.props.modalClick}></Button>
              <Button btnLabel="Add" btnOnClick={this.props.addRequestPlayer}></Button>
            </div>
            <div onClick = {this.props.modalClick} className="spacer"></div>
          </div>
          <div className="spacer"></div>
        </div>
      );
    }
    return null;
  }
}
export default ModalAddPeople;
