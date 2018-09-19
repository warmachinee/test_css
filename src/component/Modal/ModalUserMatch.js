import React from 'react'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import './ModalUserMatch.css'

import ModalBackDrop from './ModalBackDrop'

import ic_close from '../img/baseline-clear-24px.svg'
import ic_person from '../img/baseline-account_circle-24px-login.svg'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew-Bold.ttf',
    italics: 'THSarabunNew-Italic.ttf',
    bolditalics: 'THSarabunNew-BoldItalic.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

class ModalUserMatch extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      checkFirst: true,
      expandClassState: [],
      expandClassDrawer: [],
      expandClassIndex: '',
      tempHoleLabel:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
      firstFieldScore:[],
      lastFieldScore:[],
      firstScore:[],
      lastScore:[],
      matchRoundState: 0,
      checkDepartno: '',
      checkUserid: ''
    }
  }
  checkUserid = (userid) =>{
    this.state.checkUserid = userid
  }
  checkDepart = (departno) =>{
    this.state.checkDepartno = departno
  }
  showData = () =>{
    if(this.state.checkFirst){
      this.state.checkFirst = false
      for(var i = 0;i < this.props.tempHole.length;i++){
        this.state.expandClassState[i] = false
        this.state.expandClassDrawer[i] = 'usermatch__leaderboard__item__detail'
      }
    }
  }
  printDocument = () => {
    /*
    console.log(this.props.detailUserFromLoad);
    console.log(this.props.detailUserFromLoad.length);
    console.log(this.props.detailUserFromLoad[0].fullname);
    console.log(this.props.detailUserFromLoad[1].fullname);*/
    let player = []
    for(var i = 0;i < this.props.detailUserFromLoad.length;i++){
      let textHoleScoreFirst = ''
      let textHoleScoreLast = ''
      for(var j = 0;j < 9;j++){
        textHoleScoreFirst += this.props.detailUserFromLoad[i].holescore[j] + " "
      }
      for(var j = 9;j < 18;j++){
        textHoleScoreLast += this.props.detailUserFromLoad[i].holescore[j] + " "
      }
      let text = (
        this.props.detailUserFromLoad[i].fullname + " " +
        this.props.detailUserFromLoad[i].lastname + "\t\t" + " HoleScore : " +
        textHoleScoreFirst + " OUT : " +
        this.props.detailUserFromLoad[i].in + "\t" + "  " +
        textHoleScoreLast + " IN : " +
        this.props.detailUserFromLoad[i].out + "\t" + " GROSS : " +
        this.props.detailUserFromLoad[i].gross + "\t" + " TOTAL : " +
        this.props.detailUserFromLoad[i].par
      )
      player.push(
        {
          text: text,
          fontSize: 20
        });
    }
    var doc = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        player
      ],
      defaultStyle:{
        font: 'THSarabunNew'
      }
    };
    pdfMake.createPdf(doc).open()
  }
  render(){
    let tempTable = []
    for(var i = 0;i < 35;i++){
      tempTable.push(i)
    }
    if(this.props.modalState){
      if(this.props.modalType === '1User'){
        return(
          <div className="modal__usermatch">
            <ModalBackDrop click = {this.props.modalClick}/>
            <div className="spacer"></div>
            <div className="modal__usermatch__grid">
              <div onClick = {this.props.modalClick} className="spacer top"></div>
                <div className="modal__usermatch__card">
                    <div className="modal__usermatch__label">
                      <div className="modal__usermatch__label__text">Match detail</div>
                      <div className="spacer"></div>
                      <div className="modal__usermatch__label__close">
                        <img onClick = {this.props.modalClick} src={ic_close}></img>
                      </div>
                    </div>
                    {this.props.userProfileData.map((d)=>
                      <div className="modal__usermatch__name">{d.fullname} {d.lastname}({d.nickname})</div>
                    )}
                    {this.props.userProfileData.map((d)=>
                      <div className="modal__usermatch__depart">Department : {d.depart}</div>
                    )}
                    <div className="modal__usermatch__score__grid">
                      <div className="modal__usermatch__score__label">
                        <div className="usermatch__score__label__score hole">
                          <div className="spacer"></div>
                          <div>{"HOLE"}</div>
                          <div className="spacer"></div>
                        </div>
                        {this.state.tempHoleLabel.filter(
                          (item)=>{
                            return item < 9
                          }
                        ).map((d)=>
                          <div className="usermatch__score__label__score">
                            <div className="spacer"></div>
                            <div>{d+1}</div>
                            <div className="spacer"></div>
                          </div>
                        )}
                      </div>
                      <div className="modal__usermatch__score__par">
                        <div className="usermatch__score__par__score par">
                          <div className="spacer"></div>
                          <div>{"PAR"}</div>
                          <div className="spacer"></div>
                        </div>
                        {this.props.detailFieldFromLoad.filter((item)=>{
                          return item.i < 9
                        }).map((d)=>
                          <div className="usermatch__score__par__score">
                            <div className="spacer"></div>
                            <div>{d.fieldscore}</div>
                            <div className="spacer"></div>
                          </div>
                        )}
                        <div className="usermatch__score__par__score__in">
                          <div className="spacer"></div>
                          <div>OUT</div>
                          <div className="spacer"></div>
                        </div>
                      </div>
                      <div className="modal__usermatch__score__score">
                        <div className="usermatch__score__score score">
                          <div className="spacer"></div>
                          <div>{"SCORE"}</div>
                          <div className="spacer"></div>
                        </div>
                        {this.props.oneUserTempHole.filter(
                          (item) => {
                            return item.i < 9
                          }).map((d)=>
                          <div className="usermatch__score__score">
                            <div className="spacer"></div>
                            <div>{d.holescore}</div>
                            <div className="spacer"></div>
                          </div>
                        )}
                        {this.props.loadUserMatchData.filter(
                          (item)=>{
                            return this.props.matchidUserLoadMatch === item.matchid
                          }
                        ).map((d)=>
                          <div className="usermatch__score__score in">
                            <div className="spacer"></div>
                            <div>{d.in}</div>
                            <div className="spacer"></div>
                          </div>
                        )}
                      </div>
                    </div>


                    <div className="modal__usermatch__score__grid">
                      <div className="modal__usermatch__score__label">
                        <div className="usermatch__score__label__score hole">
                          <div className="spacer"></div>
                          <div>{"HOLE"}</div>
                          <div className="spacer"></div>
                        </div>
                        {this.state.tempHoleLabel.filter(
                          (item)=>{
                            return item >= 9
                          }
                        ).map((d)=>
                          <div className="usermatch__score__label__score">
                            <div className="spacer"></div>
                            <div>{d+1}</div>
                            <div className="spacer"></div>
                          </div>
                        )}
                      </div>
                      <div className="modal__usermatch__score__par">
                        <div className="usermatch__score__par__score par">
                          <div className="spacer"></div>
                          <div>{"PAR"}</div>
                          <div className="spacer"></div>
                        </div>
                        {this.props.detailFieldFromLoad.filter((item)=>{
                          return item.i >= 9
                        }).map((d)=>
                          <div className="usermatch__score__par__score">
                            <div className="spacer"></div>
                            <div>{d.fieldscore}</div>
                            <div className="spacer"></div>
                          </div>
                        )}
                        <div className="usermatch__score__par__score__in">
                          <div className="spacer"></div>
                          <div>IN</div>
                          <div className="spacer"></div>
                        </div>
                      </div>
                      <div className="modal__usermatch__score__score">
                        <div className="usermatch__score__score score">
                          <div className="spacer"></div>
                          <div>{"SCORE"}</div>
                          <div className="spacer"></div>
                        </div>
                        {this.props.oneUserTempHole.filter(
                          (item) => {
                            return item.i >= 9
                          }).map((d)=>
                          <div className="usermatch__score__score">
                            <div className="spacer"></div>
                            <div>{d.holescore}</div>
                            <div className="spacer"></div>
                          </div>
                        )}
                        {this.props.loadUserMatchData.filter(
                          (item)=>{
                            return this.props.matchidUserLoadMatch === item.matchid
                          }
                        ).map((d)=>
                          <div className="usermatch__score__score in">
                            <div className="spacer"></div>
                            <div>{d.out}</div>
                            <div className="spacer"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="usermatch__stat__result">
                      <div className="usermatch__stat__result__label">
                        <div className="spacer"></div>
                        <div>{"OUT"}</div>
                        <div className="spacer"></div>
                      </div>
                      <div className="usermatch__stat__result__label">
                        <div className="spacer"></div>
                        <div>{"IN"}</div>
                        <div className="spacer"></div>
                      </div>
                      <div className="usermatch__stat__result__label">
                        <div className="spacer"></div>
                        <div>{"Gross"}</div>
                        <div className="spacer"></div>
                      </div>
                    </div>

                    <div className="usermatch__stat__result">
                      {this.props.loadUserMatchData.filter(
                        (item)=>{
                          return this.props.matchidUserLoadMatch === item.matchid
                        }
                      ).map((d)=>
                        <div className="usermatch__stat__result__score">
                          <div className="spacer"></div>
                          <div>{d.in}</div>
                          <div className="spacer"></div>
                        </div>
                      )}
                      {this.props.loadUserMatchData.filter(
                        (item)=>{
                          return this.props.matchidUserLoadMatch === item.matchid
                        }
                      ).map((d)=>
                        <div className="usermatch__stat__result__score">
                          <div className="spacer"></div>
                          <div>{d.out}</div>
                          <div className="spacer"></div>
                        </div>
                      )}
                      {this.props.loadUserMatchData.filter(
                        (item)=>{
                          return this.props.matchidUserLoadMatch === item.matchid
                        }
                      ).map((d)=>
                        <div className="usermatch__stat__result__score">
                          <div className="spacer"></div>
                          <div>{d.gross}</div>
                          <div className="spacer"></div>
                        </div>
                      )}
                    </div>
                    <div style={{height: '3rem',width: '100%'}}></div>
                  </div>
              <div onClick = {this.props.modalClick} className="spacer"></div>
            </div>
            <div className="spacer"></div>
          </div>
        );
      }else if(this.props.modalType === 'allUser'){
        this.showData()
        if(this.state.matchRoundState){
          return(
            <div className="modal__usermatch__alluser">
              <ModalBackDrop click = {this.props.modalClick}/>
              <div className="spacer"></div>
              <div className="modal__usermatch__grid__alluser">
                <div onClick = {this.props.modalClick} className="spacer"></div>
                <div className="modal__usermatch__card__alluser">
                  <div className="modal__usermatch__label__alluser">
                    <div className="modal__usermatch__label__text__alluser">Match detail All User</div>
                    <div className="spacer"></div>
                    <div className="modal__usermatch__label__close__alluser">
                      <img onClick = {this.props.modalClick} src={ic_close}></img>
                    </div>
                  </div>
                  <div className="usermatch__leaderboard__label">
                    <div className="leaderboard__label__rank">
                      <div className="spacer"></div>
                      RANK
                      <div className="spacer"></div>
                    </div>
                    <div className="leaderboard__label__player">
                      <div className="spacer"></div>
                      PLAYER
                      <div className="spacer"></div>
                    </div>
                    <div className="leaderboard__label__overall">
                      <div className="spacer"></div>
                      OVERALL
                      <div className="spacer"></div>
                    </div>

                    <div className="leaderboard__label__round">
                      <div className="spacer"></div>
                      R1
                      <div className="spacer"></div>
                    </div>
                    <div className="leaderboard__label__round">
                      <div className="spacer"></div>
                      R2
                      <div className="spacer"></div>
                    </div>
                    <div className="leaderboard__label__round">
                      <div className="spacer"></div>
                      R3
                      <div className="spacer"></div>
                    </div>
                    <div className="leaderboard__label__round">
                      <div className="spacer"></div>
                      R4
                      <div className="spacer"></div>
                    </div>

                    <div className="leaderboard__label__stroke">
                      <div className="spacer"></div>
                      STROKE
                      <div className="spacer"></div>
                    </div>
                  </div>
                  <div className="usermatch__leaderboard">
                    {tempTable.map((d)=>
                      <a className="usermatch__leaderboard__item">
                        <div className="leaderboard__item__rank">
                          <div className="spacer"></div>
                          {d+1}
                          <div className="spacer"></div>
                        </div>
                        <div className="leaderboard__item__player">
                          <div className="spacer"></div>
                          PLAYER {d+1}
                          <div className="spacer"></div>
                        </div>
                        <div className="leaderboard__item__overall">
                          <div className="spacer"></div>
                          {d-5}
                          <div className="spacer"></div>
                        </div>

                        <div className="leaderboard__item__round">
                          <div className="spacer"></div>
                          {d+50}
                          <div className="spacer"></div>
                        </div>
                        <div className="leaderboard__item__round">
                          <div className="spacer"></div>
                          {d+50}
                          <div className="spacer"></div>
                        </div>
                        <div className="leaderboard__item__round">
                          <div className="spacer"></div>
                          {d+50}
                          <div className="spacer"></div>
                        </div>
                        <div className="leaderboard__item__round">
                          <div className="spacer"></div>
                          {d+50}
                          <div className="spacer"></div>
                        </div>

                        <div className="leaderboard__item__stroke">
                          <div className="spacer"></div>
                          {(d+50)*4}
                          <div className="spacer"></div>
                        </div>
                      </a>
                    )}

                  </div>
                </div>
                <div onClick = {this.props.modalClick} className="spacer"></div>
              </div>
              <div className="spacer"></div>
            </div>
          );
        }else{
          return(
            <div className="modal__usermatch__alluser">
              <ModalBackDrop click = {this.props.modalClick}/>
              <div className="spacer"></div>
              <div className="modal__usermatch__grid__alluser">
                <div onClick = {this.props.modalClick} className="spacer"></div>
                <div className="modal__usermatch__card__alluser">
                  <div className="modal__usermatch__label__alluser">
                    <div className="modal__usermatch__label__text__alluser">
                      Match detail All User
                      <button onClick={this.printDocument}>Print</button>
                    </div>
                    <div className="spacer"></div>
                    <div className="modal__usermatch__label__close__alluser">
                      <img onClick = {this.props.modalClick} src={ic_close}></img>
                    </div>
                  </div>
                  <div className="usermatch__leaderboard__label">
                    <div className="leaderboard__label__rank">
                      <div className="spacer"></div>
                      RANK
                      <div className="spacer"></div>
                    </div>
                    <div className="leaderboard__label__player">
                      <div className="spacer"></div>
                      PLAYER
                      <div className="spacer"></div>
                    </div>
                    <div className="leaderboard__label__overall">
                      <div className="spacer"></div>
                      OVERALL
                      <div className="spacer"></div>
                    </div>
                    <div className="leaderboard__label__stroke">
                      <div className="spacer"></div>
                      STROKE
                      <div className="spacer"></div>
                    </div>
                  </div>
                  <div className="usermatch__leaderboard">
                    {/*tempTable.map((d,i)=>
                      <div className="usermatch__leaderboard__item__grid">
                        <a className="usermatch__leaderboard__item"
                          onClick={()=>{
                            this.state.expandClassIndex = i
                            this.state.expandClassState[i] = !this.state.expandClassState[i]
                            if(this.state.expandClassState[i]){
                              this.state.expandClassDrawer[i] = 'usermatch__leaderboard__item__detail expand'
                            }else{
                              this.state.expandClassDrawer[i] = 'usermatch__leaderboard__item__detail'
                            }
                            this.setState(this.state)
                          }}>
                          <div className="leaderboard__item__rank">
                            <div className="spacer"></div>
                            {i+1}
                            <div className="spacer"></div>
                          </div>
                          <div className="leaderboard__item__player">
                            <div className="spacer"></div>
                            Player {d+1}
                            <div className="spacer"></div>
                          </div>
                          <div className="leaderboard__item__overall">
                            <div className="spacer"></div>
                            {d}
                            <div className="spacer"></div>
                          </div>
                          <div className="leaderboard__item__stroke">
                            <div className="spacer"></div>
                            {d}
                            <div className="spacer"></div>
                          </div>
                        </a>
                        <div className={this.state.expandClassDrawer[i]}>
                          <div className="leaderboard__item__detail">
                            <div className="leaderboard__item__detail__pic">
                              <img src={ic_person}></img>
                            </div>
                            <div className="leaderboard__item__detail__detail__left">
                              <div className="leaderboard__item__detail__detail__name">{d.fullname} {d.lastname}</div>
                              {this.checkDepart(d.departno)}
                              {this.props.setDepartData.filter((item)=>{
                                return item.departno === this.state.checkDepartno
                              }).map((d)=>
                                <div className="leaderboard__item__detail__detail__depart">
                                  {d}
                                </div>
                              )}
                              <div className="leaderboard__item__detail__detail__racket">Racket</div>
                            </div>
                            <div className="leaderboard__item__detail__detail__right">

                            </div>
                          </div>
                          <div className="leaderboard__item__score">

                            <div className="leaderboard__item__score__hole">
                              <div className="leaderboard__item__score__hole__label">
                                <div className="spacer"></div>
                                HOLE
                                <div className="spacer"></div>
                              </div>
                              {this.state.tempHoleLabel.filter(
                                (item)=>{ return item < 9 }
                              ).map((d)=>
                                <div className="leaderboard__item__score__hole__value">
                                  <div className="spacer"></div>
                                  {d+1}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              <div className="leaderboard__item__score__hole__value__label">
                                <div className="spacer"></div>
                                OUT
                                <div className="spacer"></div>
                              </div>
                              {this.state.tempHoleLabel.filter(
                                (item)=>{ return item >= 9 }
                              ).map((d)=>
                                <div className="leaderboard__item__score__hole__value">
                                  <div className="spacer"></div>
                                  {d+1}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              <div className="leaderboard__item__score__hole__value__label">
                                <div className="spacer"></div>
                                IN
                                <div className="spacer"></div>
                              </div>
                              <div className="leaderboard__item__score__hole__value__label__tot">
                                <div className="spacer"></div>
                                TOT
                                <div className="spacer"></div>
                              </div>
                            </div>

                            <div className="leaderboard__item__score__par">
                              <div className="leaderboard__item__score__par__label">
                                <div className="spacer"></div>
                                PAR
                                <div className="spacer"></div>
                              </div>
                              {this.props.detailFieldFromLoad.filter(
                                (item)=>{ return item.i < 9 }
                              ).map((d)=>
                                <div className="leaderboard__item__score__par__value">
                                  <div className="spacer"></div>
                                  {d.fieldscore}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              {this.props.FieldFromLoadDetail.map((d)=>
                                <div className="leaderboard__item__score__par__value__label">
                                  <div className="spacer"></div>
                                  {d.in}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              {this.props.detailFieldFromLoad.filter(
                                (item)=>{ return item.i >= 9 }
                              ).map((d)=>
                                <div className="leaderboard__item__score__par__value">
                                  <div className="spacer"></div>
                                  {d.fieldscore}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              {this.props.FieldFromLoadDetail.map((d)=>
                                <div className="leaderboard__item__score__par__value__label">
                                  <div className="spacer"></div>
                                  {d.out}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              {this.props.FieldFromLoadDetail.map((d)=>
                                <div className="leaderboard__item__score__par__value__label__tot">
                                  <div className="spacer"></div>
                                  {d.gross}
                                  <div className="spacer"></div>
                                </div>
                              )}
                            </div>

                            <div className="leaderboard__item__score__score">
                              <div className="leaderboard__item__score__score__label">
                                <div className="spacer"></div>
                                SCORE
                                <div className="spacer"></div>
                              </div>
                              {this.checkUserid(d.userid)}
                              {this.props.tempHole.filter(
                                (item)=>{ return (this.state.checkUserid === item.userid) }
                              ).map((d)=>
                                d.holescore.filter((item)=>{
                                  return item.i < 9
                                }).map((d)=>
                                  <div className="leaderboard__item__score__score__value">
                                    <div className="spacer"></div>
                                    {d.holescore}
                                    <div className="spacer"></div>
                                  </div>
                                )
                              )}
                              <div className="leaderboard__item__score__score__value__label">
                                <div className="spacer"></div>
                                {d.in}
                                <div className="spacer"></div>
                              </div>
                              {this.props.tempHole.filter(
                                (item)=>{ return (this.state.checkUserid === item.userid) }
                              ).map((d)=>
                                d.holescore.filter((item)=>{
                                  return item.i >= 9
                                }).map((d)=>
                                  <div className="leaderboard__item__score__score__value">
                                    <div className="spacer"></div>
                                    {d.holescore}
                                    <div className="spacer"></div>
                                  </div>
                                )
                              )}
                              <div className="leaderboard__item__score__score__value__label">
                                <div className="spacer"></div>
                                {d.out}
                                <div className="spacer"></div>
                              </div>
                              <div className="leaderboard__item__score__score__value__label__tot">
                                <div className="spacer"></div>
                                {d.gross}
                                <div className="spacer"></div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    )*/}
                    {this.props.detailUserFromLoad.map((d,i)=>
                      <div className="usermatch__leaderboard__item__grid">
                        <a className="usermatch__leaderboard__item"
                          onClick={()=>{
                            this.state.expandClassIndex = i
                            this.state.expandClassState[i] = !this.state.expandClassState[i]
                            if(this.state.expandClassState[i]){
                              this.state.expandClassDrawer[i] = 'usermatch__leaderboard__item__detail expand'
                            }else{
                              this.state.expandClassDrawer[i] = 'usermatch__leaderboard__item__detail'
                            }
                            this.setState(this.state)
                          }}>
                          <div className="leaderboard__item__rank">
                            <div className="spacer"></div>
                            {i+1}
                            <div className="spacer"></div>
                          </div>
                          <div className="leaderboard__item__player">
                            <div className="spacer"></div>
                            {d.fullname} {d.lastname}
                            <div className="spacer"></div>
                          </div>
                          <div className="leaderboard__item__overall">
                            <div className="spacer"></div>
                            {d.par}
                            <div className="spacer"></div>
                          </div>
                          <div className="leaderboard__item__stroke">
                            <div className="spacer"></div>
                            {d.gross}
                            <div className="spacer"></div>
                          </div>
                        </a>
                        <div className={this.state.expandClassDrawer[i]}>
                          <div className="leaderboard__item__detail">
                            <div className="leaderboard__item__detail__pic">
                              <img src={ic_person}></img>
                            </div>
                            <div className="leaderboard__item__detail__detail__left">
                              <div className="leaderboard__item__detail__detail__name">{d.fullname} {d.lastname}</div>
                              {this.checkDepart(d.departno)}
                              {this.props.setDepartData.filter((item)=>{
                                return item.departno === this.state.checkDepartno
                              }).map((d)=>
                                <div className="leaderboard__item__detail__detail__depart">
                                  {d.departname}
                                </div>
                              )}
                              <div className="leaderboard__item__detail__detail__racket">Racket</div>
                            </div>
                            <div className="leaderboard__item__detail__detail__right">

                            </div>
                          </div>
                          <div className="leaderboard__item__score">

                            <div className="leaderboard__item__score__hole">
                              <div className="leaderboard__item__score__hole__label">
                                <div className="spacer"></div>
                                HOLE
                                <div className="spacer"></div>
                              </div>
                              {this.state.tempHoleLabel.filter(
                                (item)=>{ return item < 9 }
                              ).map((d)=>
                                <div className="leaderboard__item__score__hole__value">
                                  <div className="spacer"></div>
                                  {d+1}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              <div className="leaderboard__item__score__hole__value__label">
                                <div className="spacer"></div>
                                OUT
                                <div className="spacer"></div>
                              </div>
                              {this.state.tempHoleLabel.filter(
                                (item)=>{ return item >= 9 }
                              ).map((d)=>
                                <div className="leaderboard__item__score__hole__value">
                                  <div className="spacer"></div>
                                  {d+1}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              <div className="leaderboard__item__score__hole__value__label">
                                <div className="spacer"></div>
                                IN
                                <div className="spacer"></div>
                              </div>
                              <div className="leaderboard__item__score__hole__value__label__tot">
                                <div className="spacer"></div>
                                TOT
                                <div className="spacer"></div>
                              </div>
                            </div>

                            <div className="leaderboard__item__score__par">
                              <div className="leaderboard__item__score__par__label">
                                <div className="spacer"></div>
                                PAR
                                <div className="spacer"></div>
                              </div>
                              {this.props.detailFieldFromLoad.filter(
                                (item)=>{ return item.i < 9 }
                              ).map((d)=>
                                <div className="leaderboard__item__score__par__value">
                                  <div className="spacer"></div>
                                  {d.fieldscore}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              {this.props.FieldFromLoadDetail.map((d)=>
                                <div className="leaderboard__item__score__par__value__label">
                                  <div className="spacer"></div>
                                  {d.in}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              {this.props.detailFieldFromLoad.filter(
                                (item)=>{ return item.i >= 9 }
                              ).map((d)=>
                                <div className="leaderboard__item__score__par__value">
                                  <div className="spacer"></div>
                                  {d.fieldscore}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              {this.props.FieldFromLoadDetail.map((d)=>
                                <div className="leaderboard__item__score__par__value__label">
                                  <div className="spacer"></div>
                                  {d.out}
                                  <div className="spacer"></div>
                                </div>
                              )}
                              {this.props.FieldFromLoadDetail.map((d)=>
                                <div className="leaderboard__item__score__par__value__label__tot">
                                  <div className="spacer"></div>
                                  {d.gross}
                                  <div className="spacer"></div>
                                </div>
                              )}
                            </div>

                            <div className="leaderboard__item__score__score">
                              <div className="leaderboard__item__score__score__label">
                                <div className="spacer"></div>
                                SCORE
                                <div className="spacer"></div>
                              </div>
                              {this.checkUserid(d.userid)}
                              {this.props.tempHole.filter(
                                (item)=>{ return (this.state.checkUserid === item.userid) }
                              ).map((d)=>
                                d.holescore.filter((item)=>{
                                  return item.i < 9
                                }).map((d)=>
                                  <div className="leaderboard__item__score__score__value">
                                    <div className="spacer"></div>
                                    {d.holescore}
                                    <div className="spacer"></div>
                                  </div>
                                )
                              )}
                              <div className="leaderboard__item__score__score__value__label">
                                <div className="spacer"></div>
                                {d.in}
                                <div className="spacer"></div>
                              </div>
                              {this.props.tempHole.filter(
                                (item)=>{ return (this.state.checkUserid === item.userid) }
                              ).map((d)=>
                                d.holescore.filter((item)=>{
                                  return item.i >= 9
                                }).map((d)=>
                                  <div className="leaderboard__item__score__score__value">
                                    <div className="spacer"></div>
                                    {d.holescore}
                                    <div className="spacer"></div>
                                  </div>
                                )
                              )}
                              <div className="leaderboard__item__score__score__value__label">
                                <div className="spacer"></div>
                                {d.out}
                                <div className="spacer"></div>
                              </div>
                              <div className="leaderboard__item__score__score__value__label__tot">
                                <div className="spacer"></div>
                                {d.gross}
                                <div className="spacer"></div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
                <div onClick = {this.props.modalClick} className="spacer"></div>
              </div>
              <div className="spacer"></div>
            </div>
          );
        }
      }else if(this.props.modalType === 'clientHistory'){
        return (
          <div className="modal__usermatch__alluser">
            <ModalBackDrop click = {this.props.modalClick}/>
            <div className="spacer"></div>
            <div className="modal__usermatch__grid__alluser">
              <div onClick = {this.props.modalClick} className="spacer"></div>
              <div className="modal__usermatch__card__alluser">
                <div className="modal__usermatch__label__alluser">
                  <div className="modal__usermatch__label__text__alluser">Client History</div>
                  <div className="spacer"></div>
                  <div className="modal__usermatch__label__close__alluser">
                    <img onClick = {this.props.modalClick} src={ic_close}></img>
                  </div>
                </div>
                <div className="cli__label">
                  <div className="block">Userid</div>
                  <div className="block">Name</div>
                  <div className="block">Matchid</div>
                  <div className="block__round">R1</div>
                  <div className="block__round">R2</div>
                  <div className="block__round">R3</div>
                  <div className="block__round">R4</div>
                </div>
                {this.props.clientHistory.map((d)=>
                  <div className="cli__label">
                    <div className="block">{d.userid}</div>
                    <div className="block">{d.fullname} {d.lastname}</div>
                    <div className="block">{d.matchid}</div>
                    <div className="block__round"></div>
                    <div className="block__round"></div>
                    <div className="block__round"></div>
                    <div className="block__round"></div>
                  </div>
                )}
                <div onClick = {this.props.modalClick} className="spacer"></div>
              </div>
              <div onClick = {this.props.modalClick} className="spacer"></div>
            </div>
            <div className="spacer"></div>
          </div>
        );
      }else if(this.props.modalType === 'showTempAccount'){
        console.log("showTempAccount",this.props.tempAccountData);
        return (
          <div className="modal__usermatch__alluser">
            <ModalBackDrop click = {this.props.modalClick}/>
            <div className="spacer"></div>
            <div className="modal__usermatch__grid__alluser">
              <div onClick = {this.props.modalClick} className="spacer"></div>
              <div className="modal__usermatch__card__alluser">
                <div className="modal__usermatch__label__alluser">
                  <div className="modal__usermatch__label__text__alluser">Temporary account</div>
                  <div className="spacer"></div>
                  <div className="modal__usermatch__label__close__alluser">
                    <img onClick = {this.props.modalClick} src={ic_close}></img>
                  </div>
                </div>
                {this.props.tempAccountData.map((d)=>
                  <div>
                    <div>Username : {d.username}</div>
                    <div>Password : {d.password}</div>
                    <div>Team : {d.teamno}</div>
                  </div>
                )}
              </div>
              <div onClick = {this.props.modalClick} className="spacer"></div>
            </div>
            <div className="spacer"></div>
          </div>
        );
      }
    }
    return null;
  }
}

export default ModalUserMatch;
