import React from 'react'
import './ModalAddScore.css'

import ModalBackDrop from './ModalBackDrop'
import EditText from '../EditText/EditText'
import Button from '../Button/Button'

class ModalAddScore extends React.Component{
  constructor(props){
    super(props)
    this.state={
      scoreSet:[],
      holeInput:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
    }
  }
  getScore=(score,hole)=>{
    this.state.scoreSet[hole*2]=hole+1
    this.state.scoreSet[hole*2+1]=score
    console.log(this.state.scoreSet);
  }
  calScore=()=>{
    this.props.calculateScore(this.state.scoreSet)
  }
  render(){
    if(this.props.modalState){
      return(
        <div className="modal-addscore">
          <ModalBackDrop click = {this.props.closeAddScoreModal}/>
          <div className="spacer"></div>
          <div className="modal-addscore__grid">
            <div onClick = {this.props.closeAddScoreModal} className="spacer"></div>
            <div className="modal-addscore__card">
              <div className="holefill">
                {this.state.holeInput.map((d)=>
                  <input type="number" min="0" placeholder={"hole"+(d+1)}
                    onChange={(e)=>this.getScore(e.target.value,d)} />
                )}
              </div>
              <Button btnLabel="Close" btnOnClick = {this.props.closeAddScoreModal}></Button>
              <Button btnLabel="Save" btnOnClick={this.calScore}></Button>
            </div>
            <div onClick = {this.props.closeAddScoreModal} className="spacer"></div>
          </div>
          <div className="spacer"></div>
        </div>
      );
    }
    return null;
  }
}
export default ModalAddScore;
