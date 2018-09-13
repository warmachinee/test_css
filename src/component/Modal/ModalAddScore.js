import React from 'react'
import $ from 'jquery'
import './ModalAddScore.css'

import ModalBackDrop from './ModalBackDrop'
import EditText from '../EditText/EditText'
import Button from '../Button/Button'

class ModalAddScore extends React.Component{
  constructor(props){
    super(props)
    this.state={
      scoreSet:[],
      holeInput:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    }
  }
  getScore=(score,hole)=>{
    this.state.scoreSet[hole*2]=hole+1
    this.state.scoreSet[hole*2+1]=score
  }
  calScore=()=>{
    this.props.calculateScore(this.state.scoreSet)
  }
  render(){
    if(this.props.modalState){
      return(
        <div className="modal-addscore">
          {/*<ModalBackDrop click = {this.props.modalClick}/>*/}
          <div className="addscore__backdrop" onClick={this.props.modalClick} />
          <div className="spacer"></div>
          <div className="modal-addscore__grid">
            <div onClick = {this.props.modalClick} className="spacer"></div>
            <div className="modal-addscore__card">
              <div className="addscore__card__text">กรอกคะแนน</div>
              <div className="holefill">
                <div className="holefill__hole">
                  <div className="holefill__hole__label">
                    <div className="holefill__hole__label__hole">
                      <div className="spacer"></div>
                      <div className="hole__label__hole">HOLE</div>
                      <div className="spacer"></div>
                    </div>
                  </div>
                  {this.state.holeInput.filter((item)=>{
                    return item < 9
                  }).map((d)=>
                    <div className="label__hole__hole">
                      <div className="spacer"></div>
                      <div className="hole__hole">{d+1}</div>
                      <div className="spacer"></div>
                    </div>
                  )}
                </div>
                <div className="holefill__label">
                  <div className="input__holefill">
                    <div className="holefill__table__label__par">
                      <div className="spacer"></div>
                      <div className="holefill__par__label">PAR</div>
                      <div className="spacer"></div>
                    </div>
                  </div>
                  {this.props.firstFieldScore.map((d)=>
                    <div className="label__holefill">
                      <div className="spacer"></div>
                      <div className="label__holefill__score">{d}</div>
                      <div className="spacer"></div>
                    </div>
                  )}
                </div>
                <div className="holefill__input">
                  <div className="input__holefill">
                    <div className="holefill__table__label__score">
                      <div className="spacer"></div>
                      <div className="holefill__par__score">SCORE</div>
                      <div className="spacer"></div>
                    </div>
                  </div>
                  {this.state.holeInput.filter((item)=>{
                    return item < 9
                  }).map((d)=>
                    <div className="input__holefill">
                      <input type="number" min="0" placeholder={0}
                        onChange={(e)=>this.getScore(e.target.value,d)} />
                    </div>
                  )}
                </div>
              </div>
              <div className="holefill">
                <div className="holefill__hole">
                  <div className="holefill__hole__label">
                    <div className="holefill__hole__label__hole">
                      <div className="spacer"></div>
                      <div className="hole__label__hole">HOLE</div>
                      <div className="spacer"></div>
                    </div>
                  </div>
                  {this.state.holeInput.filter((item)=>{
                    return item >= 9
                  }).map((d)=>
                    <div className="label__hole__hole">
                      <div className="spacer"></div>
                      <div className="hole__hole">{d+1}</div>
                      <div className="spacer"></div>
                    </div>
                  )}
                </div>
                <div className="holefill__label">
                  <div className="input__holefill">
                    <div className="holefill__table__label__par">
                      <div className="spacer"></div>
                      <div className="holefill__par__label">PAR</div>
                      <div className="spacer"></div>
                    </div>
                  </div>
                  {this.props.lastFieldScore.map((d)=>
                    <div className="label__holefill">
                      <div className="spacer"></div>
                      <div className="label__holefill__score">{d}</div>
                      <div className="spacer"></div>
                    </div>
                  )}
                </div>
                <div className="holefill__input">
                  <div className="input__holefill">
                    <div className="holefill__table__label__score">
                      <div className="spacer"></div>
                      <div className="holefill__par__score">SCORE</div>
                      <div className="spacer"></div>
                    </div>
                  </div>
                  {this.state.holeInput.filter((item)=>{
                    return item >= 9
                  }).map((d)=>
                    <div className="input__holefill">
                      <input type="number" min="0" placeholder={0}
                        onChange={(e)=>this.getScore(e.target.value,d)} />
                    </div>
                  )}
                </div>
              </div>
              <div className="addscore__card__button">
                <button className="addscore__card__close" onClick = {this.props.modalClick}>Close</button>
                <button className="addscore__card__save" onClick = {this.calScore}>Save</button>
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
export default ModalAddScore;
