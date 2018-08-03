import React from 'react'
import './ModalAddScore.css'

import ModalBackDrop from './ModalBackDrop'
import EditText from '../EditText/EditText'
import Button from '../Button/Button'

class ModalAddScore extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    if(this.props.modalState){
      return(
        <div className="modal-addscore">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal-addscore__grid">
            <div className="spacer"></div>
            <div className="modal-addscore__card">
              <label>Player</label>
              <select>
                <option value="No team">Select player</option>
                <option value="Player 1">Player 1</option>
                <option value="Player 2">Player 2</option>
                <option value="Player 3">Player 3</option>
                <option value="Player 4">Player 4</option>
              </select>
              <label>Court</label>
              <select>
                <option value="Court 1">Court 1</option>
                <option value="Court 2">Court 2</option>
              </select>
              <div className="holefill">
                <input type="text" placeholder="Hole1"></input>
                <input type="text" placeholder="Hole2"></input>
                <input type="text" placeholder="Hole3"></input>
                <input type="text" placeholder="Hole4"></input>
                <input type="text" placeholder="Hole5"></input>
                <input type="text" placeholder="Hole6"></input>
                <input type="text" placeholder="Hole7"></input>
                <input type="text" placeholder="Hole8"></input>
                <input type="text" placeholder="Hole9"></input>
              </div>
              <Button btnLabel="Close" btnOnClick = {this.props.modalClick}></Button>
              <Button btnLabel="Save"></Button>
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
export default ModalAddScore;
