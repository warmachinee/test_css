import React from 'react'
import './ModalFillScore.css'

import FillScore from '../Card/FillScore'
import ModalBackDrop from './ModalBackDrop'


class ModalFillScore extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    if(this.props.modalState){
      return(
        <div className="modal__fillscore">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal__fillscore__grid">
            <div onClick = {this.props.modalClick} className="spacer"></div>
            <div className="modal__fillscore__card">
              <FillScore />
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

export default ModalFillScore;
