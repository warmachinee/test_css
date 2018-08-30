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
      departTemp:'',
      teamNameTemp:'',
      tempUserid:''
    }

  }
  setTeamTemp = (data,i)=>{
    this.state.teamTemp = parseInt(data.teamno);
    this.state.teamNameTemp = data
  }
  setDepartTemp = (depart) =>{
    this.state.departTemp = depart
  }
  checkScoreFromUserID=(userid)=>{
    this.state.tempUserid = userid
  }
  sortResult =(data)=>{
    if(data){
      this.props.getSort(data)
      this.props.modalMatchResultClick(false)
    }else{
      this.props.getSort(0)
      this.props.modalMatchResultClick(false)
    }
    setTimeout(()=>{
      this.setState(this.state)
    },1000)
  }
  render(){
    const testData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    if(this.props.modalState){
      //console.log("resultMatchFromLoadHoleScore",this.props.resultMatchFromLoadHoleScore);
      //console.log("resultMatchFromLoadUser",this.props.resultMatchFromLoadUser);
      //console.log("tempResultHole",this.props.tempResultHole);
      //console.log("setDepartData",this.props.setDepartData);
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
                  {(this.props.setTeamData.length)?
                    (
                      <select onChange={(e)=>this.sortResult(e.target.value)}>
                        <option value={0}>Death match</option>
                        <option value={1}>By team</option>
                        <option value={2}>By depart</option>
                      </select>
                    ):
                    (
                      <select>
                        <option>Death match</option>
                      </select>
                    )}
              </div>

                {(this.props.typeScore === '0')?(
                  <div className="match__result__box">
                    <div className="match__result__box__teamname">Name</div>
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
                      <div className="match__result__box__teamname">Name</div>
                      <div className="match__result__box__in">IN</div>
                      <div className="match__result__box__out">OUT</div>
                      <div className="match__result__box__gross">GROSS</div>
                      <div className="match__result__box__net">NET</div>
                      <div className="match__result__box__sf">SF</div>
                    </div>
                  ):(
                    (this.props.typeScore === '2')?(
                      <div className="match__result__box">
                        <div className="match__result__box__teamname">Name</div>
                        <div className="match__result__box__in">IN</div>
                        <div className="match__result__box__out">OUT</div>
                        <div className="match__result__box__gross">GROSS</div>
                        <div className="match__result__box__par">PAR</div>
                      </div>
                    ):(null)
                  )
                )}
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
                                <div className="match__result__box__user__label">
                                  {this.setDepartTemp(data.departno)}
                                  <div className="result__box__userid">{data.fullname} {data.lastname}
                                  {this.props.setDepartData.filter(
                                    (item)=>{
                                      return this.state.departTemp === parseInt(item.departno)
                                    }
                                  ).map((d)=>
                                  <p>{d.departname}</p>
                                )}
                                  </div>
                                  <div className="result__box__in">{data.in}</div>
                                  <div className="result__box__out">{data.out}</div>
                                  <div className="result__box__gross">{data.gross}</div>
                                  <div className="result__box__net">{data.net}</div>
                                  <div className="result__box__sf">{data.sf}</div>
                                </div>
                                {this.checkScoreFromUserID(data.userid)}
                                <div className="match__result__box__user__score">
                                  {this.props.tempResultHole.filter(
                                    (item)=>{
                                      return parseInt(item.userid) === parseInt(this.state.tempUserid)
                                    }
                                  ).map((d)=>
                                  <div className="result__box__user__score">
                                    {d.holescore.map((score)=>
                                      <div className="box__user__score">{score}</div>
                                    )}
                                  </div>
                                  )}
                                </div>
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
                                  <div className="match__result__box__user__label">
                                    {this.setDepartTemp(data.departno)}
                                    <div className="result__box__userid">{data.fullname} {data.lastname}
                                    {this.props.setDepartData.filter(
                                      (item)=>{
                                        return this.state.departTemp === parseInt(item.departno)
                                      }
                                    ).map((d)=>
                                    <p>{d.departname}</p>
                                  )}
                                    </div>
                                    <div className="result__box__in">{data.in}</div>
                                    <div className="result__box__out">{data.out}</div>
                                    <div className="result__box__gross">{data.gross}</div>
                                    <div className="result__box__net">{data.net}</div>
                                    <div className="result__box__sf">{data.sf}</div>
                                  </div>
                                  {this.checkScoreFromUserID(data.userid)}
                                  <div className="match__result__box__user__score">
                                    {this.props.tempResultHole.filter(
                                      (item)=>{
                                        return parseInt(item.userid) === parseInt(this.state.tempUserid)
                                      }
                                    ).map((d)=>
                                    <div className="result__box__user__score">
                                      {d.holescore.map((score)=>
                                        <div className="box__user__score">{score}</div>
                                      )}
                                    </div>
                                    )}
                                  </div>
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
                                    <div className="match__result__box__user__label">
                                      {this.setDepartTemp(data.departno)}
                                      <div className="result__box__userid">{data.fullname} {data.lastname}
                                      {this.props.setDepartData.filter(
                                        (item)=>{
                                          return this.state.departTemp === parseInt(item.departno)
                                        }
                                      ).map((d)=>
                                      <p>{d.departname}</p>
                                    )}
                                      </div>
                                      <div className="result__box__in">{data.in}</div>
                                      <div className="result__box__out">{data.out}</div>
                                      <div className="result__box__gross">{data.gross}</div>
                                      <div className="result__box__par">{data.par}</div>
                                    </div>
                                    {this.checkScoreFromUserID(data.userid)}
                                    <div className="match__result__box__user__score">
                                      {this.props.tempResultHole.filter(
                                        (item)=>{
                                          return parseInt(item.userid) === parseInt(this.state.tempUserid)
                                        }
                                      ).map((d)=>
                                      <div className="result__box__user__score">
                                        {d.holescore.map((score)=>
                                          <div className="box__user__score">{score}</div>
                                        )}
                                      </div>
                                      )}
                                    </div>
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
                <div className="match__result__box">
                  <div className="match__result__box__label">
                    {this.setDepartTemp(data.departno)}
                    <div className="match__result__box__teamname">{data.fullname} {data.lastname}
                    {this.props.setDepartData.filter(
                      (item)=>{
                        return this.state.departTemp === parseInt(item.departno)
                      }
                    ).map((d)=>
                    <p>{d.departname}</p>
                    )}
                    </div>
                    <div className="match__result__box__in">{data.in}</div>
                    <div className="match__result__box__out">{data.out}</div>
                    <div className="match__result__box__gross">{data.gross}</div>
                    <div className="match__result__box__net">{data.net}</div>
                    <div className="match__result__box__sf">{data.sf}</div>
                  </div>
                  {this.checkScoreFromUserID(data.userid)}
                  <div className="match__result__box__score">
                    {this.props.tempResultHole.filter(
                      (item)=>{
                        return parseInt(item.userid) === parseInt(this.state.tempUserid)
                      }
                    ).map((d)=>
                    <div className="result__box__score">
                      {d.holescore.map((score)=>
                        <div className="box__score">{score}</div>
                      )}
                    </div>
                    )}
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
                  <div className="match__result__box">
                    <div className="match__result__box__label">
                      {this.setDepartTemp(data.departno)}
                      <div className="match__result__box__teamname">{data.fullname} {data.lastname}
                      {this.props.setDepartData.filter(
                        (item)=>{
                          return this.state.departTemp === parseInt(item.departno)
                        }
                      ).map((d)=>
                      <p>{d.departname}</p>
                      )}
                      </div>
                      <div className="match__result__box__in">{data.in}</div>
                      <div className="match__result__box__out">{data.out}</div>
                      <div className="match__result__box__gross">{data.gross}</div>
                      <div className="match__result__box__net">{data.net}</div>
                      <div className="match__result__box__sf">{data.sf}</div>
                    </div>
                    {this.checkScoreFromUserID(data.userid)}
                    <div className="match__result__box__score">
                      {this.props.tempResultHole.filter(
                        (item)=>{
                          return parseInt(item.userid) === parseInt(this.state.tempUserid)
                        }
                      ).map((d)=>
                      <div className="result__box__score">
                        {d.holescore.map((score)=>
                          <div className="box__score">{score}</div>
                        )}
                      </div>
                      )}
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
                    <div className="match__result__box">
                      <div className="match__result__box__label">
                        {this.setDepartTemp(data.departno)}
                        <div className="match__result__box__teamname">{data.fullname} {data.lastname}
                        {this.props.setDepartData.filter(
                          (item)=>{
                            return this.state.departTemp === parseInt(item.departno)
                          }
                        ).map((d)=>
                        <p>{d.departname}</p>
                        )}
                        </div>
                        <div className="match__result__box__in">{data.in}</div>
                        <div className="match__result__box__out">{data.out}</div>
                        <div className="match__result__box__gross">{data.gross}</div>
                        <div className="match__result__box__net">{data.net}</div>
                      </div>
                      {this.checkScoreFromUserID(data.userid)}
                      <div className="match__result__box__score">
                        {this.props.tempResultHole.filter(
                          (item)=>{
                            return parseInt(item.userid) === parseInt(this.state.tempUserid)
                          }
                        ).map((d)=>
                        <div className="result__box__score">
                          {d.holescore.map((score)=>
                            <div className="box__score">{score}</div>
                          )}
                        </div>
                        )}
                      </div>
                    </div>
                    )
                  ):(null)
                )
              )}
              <div className="spacer"></div>
              <div className="close__modalresult">
                <button className="close__modalresult__button" onClick={this.props.modalClick}>Close</button>
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
export default ModalMatchResult;
