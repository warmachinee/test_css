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
      teamNameTemp:'',
    }

  }
  setTeamTemp = (data,i)=>{
    this.state.teamTemp = parseInt(data.teamno);
    this.state.teamNameTemp = data
  }
  sortResult =(data)=>{
    if(data){
      this.props.getSort(data)
      this.props.modalMatchResultClick()
    }else{
      this.props.getSort(0)
      this.props.modalMatchResultClick()
    }
    this.setState(this.state)
  }
  render(){
    if(this.props.modalState){
      return(
        <div className="modal-matchresult">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal-matchresult__grid">
            <div onClick = {this.props.modalClick} className="spacer"></div>
            <div className="modal-matchresult__card">
              <div className="matchresult__label">
                Match Result
              </div>
              <div className="matchresult__label__typescore">Type score
                {(this.props.typeScore === '0')?
                  ("Stableford"):(
                    (this.props.typeScore === '1')?("36 System"):(
                      (this.props.typeScore === '2')?("PAR"):(null)
                    )
                  )}
                  Sort
                  <select onChange={(e)=>this.sortResult(e.target.value)}>
                    <option value={0}>Death match</option>
                    <option value={1}>By team</option>
                    <option value={2}>By depart</option>
                  </select>
              </div>

                {(this.props.typeScore === '0')?(
                  <div className="match__result__box">
                    <div className="match__result__box__teamname">Team name</div>
                    <div className="match__result__box__in">IN</div>
                    <div className="match__result__box__out">OUT</div>
                    <div className="match__result__box__gross">GROSS</div>
                    <div className="match__result__box__net">NET</div>
                    <div className="match__result__box__sf">SF</div>
                  </div>
                ):(
                  (this.props.typeScore === '1')?
                  (
                    <div className="match__result__box">
                      <div className="match__result__box__teamname">Team name</div>
                      <div className="match__result__box__in">IN</div>
                      <div className="match__result__box__out">OUT</div>
                      <div className="match__result__box__gross">GROSS</div>
                      <div className="match__result__box__net">NET</div>
                      <div className="match__result__box__sf">SF</div>
                    </div>
                  ):(
                    (this.props.typeScore === '2')?(
                      <div className="match__result__box">
                        <div className="match__result__box__teamname">Team name</div>
                        <div className="match__result__box__in">IN</div>
                        <div className="match__result__box__out">OUT</div>
                        <div className="match__result__box__gross">GROSS</div>
                        <div className="match__result__box__par">PAR</div>
                      </div>
                    ):(null)
                  )
                )}

                {/*this.props.setTeamData*/}
                {/*teamTmp.map((d)=>
                  <div>
                    <p>{d.teamname}</p>
                      <div className="detail__teambox">
                        <div className="match__result__box__user">
                          <div className="result__box__userid">userid</div>
                          <div className="result__box__in">in</div>
                          <div className="result__box__out">out</div>
                          <div className="result__box__gross">gross</div>
                          <div className="result__box__par">par</div>
                        </div>
                      </div>
                  </div>
                )*/}

              {this.props.setTeamData.map((data,i)=>
                <div>
                  <p>{data.teamname}</p>
                    {this.setTeamTemp(data,i)}
                        {(this.props.typeScore === '0')?(
                          this.props.resultMatchFromLoadUser.filter(
                            (item)=>{
                              return item.teamno === parseInt(this.state.teamTemp)
                            }
                          ).map((data)=>
                            <div className="detail__teambox">
                              <div className="match__result__box__user">
                                <div className="result__box__userid">{data.fullname} {data.lastname}</div>
                                <div className="result__box__in">{data.in}</div>
                                <div className="result__box__out">{data.out}</div>
                                <div className="result__box__gross">{data.gross}</div>
                                <div className="result__box__net">{data.net}</div>
                                <div className="result__box__sf">{data.sf}</div>
                              </div>
                            </div>
                          )
                        ):(
                          (this.props.typeScore === '1')?
                          (
                            this.props.resultMatchFromLoadUser.filter(
                              (item)=>{
                                return item.teamno === parseInt(this.state.teamTemp)
                              }
                            ).map((data)=>
                              <div className="detail__teambox">
                                <div className="match__result__box__user">
                                  <div className="result__box__userid">{data.fullname} {data.lastname}</div>
                                  <div className="result__box__in">{data.in}</div>
                                  <div className="result__box__out">{data.out}</div>
                                  <div className="result__box__gross">{data.gross}</div>
                                  <div className="result__box__net">{data.net}</div>
                                  <div className="result__box__sf">{data.sf}</div>
                                </div>
                              </div>
                            )
                          ):(
                            (this.props.typeScore === '2')?(
                              this.props.resultMatchFromLoadUser.filter(
                                (item)=>{
                                  return item.teamno === parseInt(this.state.teamTemp)
                                }
                              ).map((data)=>
                                <div className="detail__teambox">
                                  <div className="match__result__box__user">
                                    <div className="result__box__userid">{data.fullname} {data.lastname}</div>
                                    <div className="result__box__in">{data.in}</div>
                                    <div className="result__box__out">{data.out}</div>
                                    <div className="result__box__gross">{data.gross}</div>
                                    <div className="result__box__par">{data.par}</div>
                                  </div>
                                </div>
                              )
                            ):(null)
                          )
                        )}

                </div>
              )}
              {(this.props.typeScore === '0')?(
                this.props.resultMatchFromLoadUser.filter(
                  (item)=>{
                    return item.teamno === 0
                  }
                ).map((data)=>
                  <div className="detail__teambox">
                    <div className="match__result__box">
                      <div className="match__result__box__teamname">{data.fullname} {data.lastname}</div>
                      <div className="match__result__box__in">{data.in}</div>
                      <div className="match__result__box__out">{data.out}</div>
                      <div className="match__result__box__gross">{data.gross}</div>
                      <div className="match__result__box__net">{data.net}</div>
                    </div>
                  </div>
                )
              ):(
                (this.props.typeScore === '1')?
                (
                  this.props.resultMatchFromLoadUser.filter(
                    (item)=>{
                      return item.teamno === 0
                    }
                  ).map((data)=>
                    <div className="detail__teambox">
                      <div className="match__result__box">
                        <div className="match__result__box__teamname">{data.fullname} {data.lastname}</div>
                        <div className="match__result__box__in">{data.in}</div>
                        <div className="match__result__box__out">{data.out}</div>
                        <div className="match__result__box__gross">{data.gross}</div>
                        <div className="match__result__box__net">{data.net}</div>
                        <div className="match__result__box__sf">{data.sf}</div>
                      </div>
                    </div>
                  )
                ):(
                  (this.props.typeScore === '2')?(
                    this.props.resultMatchFromLoadUser.filter(
                      (item)=>{
                        return item.teamno === 0
                      }
                    ).map((data)=>
                      <div className="detail__teambox">
                        <div className="match__result__box">
                          <div className="match__result__box__teamname">{data.fullname} {data.lastname}</div>
                          <div className="match__result__box__in">{data.in}</div>
                          <div className="match__result__box__out">{data.out}</div>
                          <div className="match__result__box__gross">{data.gross}</div>
                          <div className="match__result__box__net">{data.net}</div>
                        </div>
                      </div>
                    )
                  ):(null)
                )
              )}
              <div className="spacer"></div>
              <button className="close__modalresult" onClick={this.props.modalClick}>Close</button>
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
export default ModalMatchResult;
