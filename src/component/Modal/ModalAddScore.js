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
      holeSet:[]
    }
  }
  getScore=(score,hole)=>{
    this.state.scoreSet[hole]=score
    this.state.holeSet[hole]=hole
  }
  calScore=()=>{
    this.state.scoreSet.splice(0,1)
    this.state.holeSet.splice(0,1)
    this.state.holeSet.push(...this.state.scoreSet)
    //console.log(this.state.scoreSet);
    //console.log(this.state.holeSet);
    //this.state.scoreSet.splice(10,1)
    //this.state.scoreSet.splice(0,1)
    //console.log("score ::",this.state.scoreSet)
    this.props.calculateScore(this.state.holeSet)
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
              <label>Court</label>
              <select>
                <option value="Court 1">Court 1</option>
                <option value="Court 2">Court 2</option>
              </select>
              <div className="holefill">
                <input type="text" placeholder="Hole1" onChange={(e)=>this.getScore(e.target.value,1)}></input>
                <input type="text" placeholder="Hole2" onChange={(e)=>this.getScore(e.target.value,2)}></input>
                <input type="text" placeholder="Hole3" onChange={(e)=>this.getScore(e.target.value,3)}></input>
                <input type="text" placeholder="Hole4" onChange={(e)=>this.getScore(e.target.value,4)}></input>
                <input type="text" placeholder="Hole5" onChange={(e)=>this.getScore(e.target.value,5)}></input>
                <input type="text" placeholder="Hole6" onChange={(e)=>this.getScore(e.target.value,6)}></input>
                <input type="text" placeholder="Hole7" onChange={(e)=>this.getScore(e.target.value,7)}></input>
                <input type="text" placeholder="Hole8" onChange={(e)=>this.getScore(e.target.value,8)}></input>
                <input type="text" placeholder="Hole9" onChange={(e)=>this.getScore(e.target.value,9)}></input>

                  <input type="text" placeholder="Hole1" onChange={(e)=>this.getScore(e.target.value,10)}></input>
                  <input type="text" placeholder="Hole2" onChange={(e)=>this.getScore(e.target.value,11)}></input>
                  <input type="text" placeholder="Hole3" onChange={(e)=>this.getScore(e.target.value,12)}></input>
                  <input type="text" placeholder="Hole4" onChange={(e)=>this.getScore(e.target.value,13)}></input>
                  <input type="text" placeholder="Hole5" onChange={(e)=>this.getScore(e.target.value,14)}></input>
                  <input type="text" placeholder="Hole6" onChange={(e)=>this.getScore(e.target.value,15)}></input>
                  <input type="text" placeholder="Hole7" onChange={(e)=>this.getScore(e.target.value,16)}></input>
                  <input type="text" placeholder="Hole8" onChange={(e)=>this.getScore(e.target.value,17)}></input>
                  <input type="text" placeholder="Hole9" onChange={(e)=>this.getScore(e.target.value,18)}></input>
              </div>
              <Button btnLabel="Close" btnOnClick = {this.props.closeAddScoreModal}></Button>
              <Button btnLabel="Save" btnOnClick={this.calScore}></Button>
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
