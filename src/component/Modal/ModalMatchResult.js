import React from 'react'
import './ModalMatchResult.css'

import ModalBackDrop from './ModalBackDrop'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'

class ModalMatchResult extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      teamTemp:'',
      teamNameTemp:''
    }
  }
  showData = ()=>{
    console.log("resultMatchFromLoad ",this.props.resultMatchFromLoad);
    console.log("resultMatchFromLoadUser ",this.props.resultMatchFromLoadUser);
    console.log("resultMatchFromLoadHoleScore ",this.props.resultMatchFromLoadHoleScore);
    console.log("setTeamData ",this.props.setTeamData);
  }
  setTeamTemp = (data,i)=>{
    this.state.teamTemp = i;
    this.state.teamNameTemp = data
  }
  render(){
    if(this.props.modalState){
      console.log(this.props.resultMatchFromLoadUser);
      return(
        <div className="modal-matchresult">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal-matchresult__grid">
            <div className="spacer"></div>
            <div className="modal-matchresult__card">
              <label>Match Result</label>
              <div className="match__result__box">
                <div className="match__result__box__teamname">Team name</div>
                <div className="match__result__box__in">IN</div>
                <div className="match__result__box__out">OUT</div>
                <div className="match__result__box__gross">GROSS</div>
                <div className="match__result__box__sf">SF</div>
                <div className="match__result__box__net">NET</div>
              </div>

              {this.props.setTeamData.map((data,i)=>
                <div>
                  <p>{data.teamname}</p>
                  <div className="detail__teambox">
                    {this.setTeamTemp(data,i)}
                    {this.props.resultMatchFromLoadUser.filter(
                        (item)=>{
                          return this.state.teamTemp + 1 === item.teamno;
                        }
                      ).map((data)=>
                      <div className="match__result__box">
                        <div className="match__result__box__teamname">{this.state.teamNameTemp.teamname}</div>
                        <div className="match__result__box__in">{data.in}</div>
                        <div className="match__result__box__out">{data.out}</div>
                        <div className="match__result__box__gross">{data.gross}</div>
                        <div className="match__result__box__sf">{data.sf}</div>
                        <div className="match__result__box__net">{data.net}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="spacer"></div>
              <Button btnLabel="Close" btnOnClick = {this.props.modalClick}></Button>
              <Button btnLabel="Edit" btnOnClick = {this.showData}></Button>
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
export default ModalMatchResult;
