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
              <div className="addpeople__card__playername">Player name</div>
              <div className="addpeople__card__input">
                <EditTextImg type="text" placeholder="Player name" editTextValue={this.addPeople} formType="username"/>
              </div>
              <div className="addpeople__card__button">
                <button className="addpeople__card__close" onClick = {this.props.modalClick}>Close</button>
                <button className="addpeople__card__add" onClick = {this.props.addRequestPlayer}>Add</button>
              </div>
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
