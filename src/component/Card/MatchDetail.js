import React from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import './MatchDetail.css'

import ic_location from '../img/baseline-place-24px.svg'
import ic_edit from '../img/baseline-edit-24px-white.svg'
import ic_result from '../img/outline-insert_drive_file-24px.svg'

import ModalEditTeam from '../Modal/ModalEditTeam'
import ModalMatchResult from '../Modal/ModalMatchResult'

class MatchDetail extends React.Component{
  constructor(props){
    super(props)
    this.matchDetailRefresh = false
    this.state = {
      modalEditTeam: false,
      modalMatchResult: false,
      scoreHideState: true,
      teamTemp:'',
      optionTemp:[],
      teamNumber: 1,
      departNumber: 1,
      tempDepart:'',
      editTeamData:{
        teamname:'',
        teamno:'',
        matchid:''
      },
      typeScore:0,
      resultMatchFromLoad:[],
      resultMatchFromLoadUser:[],
      resultMatchFromLoadHoleScore:[],
      tempResultHole:[],
      tempHole:{
        teamno:'',
        matchid:''
      },
      userMapID:'',
      sortData:0
    }
  }
  getSort = (data) =>{
    this.state.sortData = data
    this.setState(this.state)
  }
  modalMatchResultClick =(data) =>{
    this.state.resultMatchFromLoad = []
    this.state.resultMatchFromLoadUser = []
    this.state.resultMatchFromLoadHoleScore = []
    this.state.tempResultHole = []
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://www.pds.in.th/phpadmin/matchresultscore.php",
     dataType: 'json',
     data: {
       "matchid": this.props.matchDetailID,
       "sort": this.state.sortData
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['cordA']=data.cordA
       localStorage['cordB']=data.cordB
       localStorage['in']=data.in
       localStorage['out']=data.out
       localStorage['gross']=data.gross
       if(parseInt(data.typescore) === 0){
         localStorage['net']=data.net
         localStorage['sf']=data.sf
       }else if(parseInt(data.typescore) === 1){
         localStorage['net']=data.net
         localStorage['sf']=data.sf
       }else if(parseInt(data.typescore) === 2){
         localStorage['par']=data.par
       }
       localStorage['holescore']=data.holescore
       localStorage['userid']=data.userid
       localStorage['typescore']=data.typescore
       localStorage['teamnum']=data.teamnum
       localStorage['teamno']=data.teamno
       localStorage['departnum']=data.departnum
       localStorage['departno']=data.departno
       localStorage['fullname']=data.full
       localStorage['lastname']=data.last
       //console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['userid']){
        var cordA = localStorage['cordA'];
        var cordB = localStorage['cordB'];
        var inn = localStorage['in'];
        var outt = localStorage['out'];
        var gross = localStorage['gross'];

        if(parseInt(localStorage['typescore']) === 0){
          var net = localStorage['net']
          var sf = localStorage['sf']
        }else if(parseInt(localStorage['typescore']) === 1){
          var net = localStorage['net']
          var sf = localStorage['sf']
        }else if(parseInt(localStorage['typescore']) === 2){
          var par = localStorage['par']
        }

        var holescore = localStorage['holescore'];
        var userid = localStorage['userid'];
        var teamnum = localStorage['teamnum'];
        var teamno = localStorage['teamno'];
        var departnum = localStorage['departnum'];
        var departno = localStorage['departno'];
        var typescore = localStorage['typescore'];
        var fullname = localStorage['fullname']
        var lastname = localStorage['lastname']

        cordA = JSON.parse("["+cordA+"]")
        cordB = JSON.parse("["+cordB+"]")
        inn = JSON.parse("["+inn+"]")
        outt = JSON.parse("["+outt+"]")
        gross = JSON.parse("["+gross+"]")

        if(parseInt(typescore) === 0){
          net = JSON.parse("["+net+"]")
          sf = JSON.parse("["+sf+"]")
        }else if(parseInt(typescore) === 1){
          net = JSON.parse("["+net+"]")
          sf = JSON.parse("["+sf+"]")
        }else if(parseInt(typescore) === 2){
          par = JSON.parse("["+par+"]")
        }

        holescore = holescore.split(",",holescore.length)
        userid = userid.split(",",userid.length)
        teamnum = teamnum.split(",",teamnum.length)
        teamno = JSON.parse("["+teamno+"]")
        departnum = departnum.split(",",departnum.length)
        departno = JSON.parse("["+departno+"]")
        typescore = typescore.split(",",typescore.length)
        fullname = fullname.split(",",fullname.length)
        lastname = lastname.split(",",lastname.length)
        var obj = {
          cordA:"",
          cordB:"",
          teamnum:"",
          departnum:"",
          typescore:"",
        }
        obj.cordA = cordA[0]
        obj.cordB = cordB[0]
        obj.teamnum = teamnum[0]
        obj.departnum = departnum[0]
        obj.typescore = typescore[0]
        this.state.typeScore = typescore[0]
        this.state.resultMatchFromLoad.push(obj);
        if(parseInt(typescore) === 0){
          for(var i = 0;i < userid.length;i++){
            var obj = {
              in: inn[i],
              out: outt[i],
              gross: gross[i],
              userid: userid[i],
              net: net[i],
              sf: sf[i],
              teamno: teamno[i],
              departno: departno[i],
              fullname: fullname[i],
              lastname: lastname[i]
            }
            this.state.resultMatchFromLoadUser.push(obj);
          }
        }else if(parseInt(typescore) === 1){
          for(var i = 0;i < userid.length;i++){
            var obj = {
              in: inn[i],
              out: outt[i],
              gross: gross[i],
              userid: userid[i],
              net: net[i],
              sf: sf[i],
              teamno: teamno[i],
              departno: departno[i],
              fullname: fullname[i],
              lastname: lastname[i]
            }
            this.state.resultMatchFromLoadUser.push(obj);
          }
        }else if(parseInt(typescore) === 2){
          for(var i = 0;i < userid.length;i++){
            var obj = {
              in: inn[i],
              out: outt[i],
              gross: gross[i],
              userid: userid[i],
              par: par[i],
              teamno: teamno[i],
              departno: departno[i],
              fullname: fullname[i],
              lastname: lastname[i]
            }
            this.state.resultMatchFromLoadUser.push(obj);
          }
        }

        let holescoreTemp = [];
        for(var i = 0;i < holescore.length;i++){
          holescoreTemp.push(holescore[i])
          if((i+1)%18===0){
            this.state.resultMatchFromLoadHoleScore.push(holescoreTemp);
            holescoreTemp = []
          }
        }
        for(var i =0;i < this.state.resultMatchFromLoadUser.length;i++){
          this.state.tempResultHole.push({
            userid: this.state.resultMatchFromLoadUser[i].userid,
            teamno: this.state.resultMatchFromLoadUser[i].teamno,
            holescore: this.state.resultMatchFromLoadHoleScore[i]
          })
        }
      }
      if(data){
        this.setState((state)=>{
          return {modalMatchResult: !state.modalMatchResult}
        })
        this.setState(this.state)
      }
    },500)
    localStorage.clear()
  }
  modalEditTeamClick = ()=>{
    this.setState((state)=>{
      return {modalEditTeam: !state.modalEditTeam}
    })
  }
  setUserMapID = (data) =>{
    this.state.userMapID = data
  }
  setTeamTemp = (data,i)=>{
    this.state.teamTemp = parseInt(data.teamno);
    this.state.optionTemp = []
    this.state.optionTemp = this.props.setTeamData
  }
  setUpdateTeam = (data)=>{
    this.state.teamNumber = data
  }
  setTeamno = (data)=>{
    this.state.tempHole.teamno = data.teamno
    this.state.tempHole.userid = data.userid
  }
  departNo = (data) =>{
    this.state.departNumber = parseInt(data)
  }
  setDepartno=(data)=>{
    this.state.tempDepart = parseInt(data)
  }
  printData = (data) =>{
  }
  updateDepart =()=>{
    this.HandlerUpdateTDbyUser(this.props.matchDetailID,this.state.teamNumber,this.state.departNumber)
    setTimeout(()=>{
      this.matchDetailRefresh=false;
      this.props.loadMatchDetail(this.props.matchDetailData)
    },500)
    this.setState(this.state)
  }
  updateTeam =()=>{
    this.HandlerUpdateTDbyUser(this.props.matchDetailID,this.state.teamNumber,this.state.departNumber)
    setTimeout(()=>{
      this.matchDetailRefresh=false;
      this.props.loadMatchDetail(this.props.matchDetailData)
    },500)
    this.setState({teamNumber: 1})
  }
  HandlerUpdateTDbyUser=(matchid,teamno,departno)=>{
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://www.pds.in.th/phpadmin/updateTDbyuser.php",
     dataType: 'json',
     data: {
       "matchid": matchid,
       "teamno": teamno,
       "departno": departno,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //localStorage.setItem("response",JSON.stringify(data));
       localStorage['response']=data.status;
       console.log(data);
     }
    });
    localStorage.clear()
  }
  HandlerSudoUpdateTNDN = () =>{
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://www.pds.in.th/phpadmin/sudoupdateTNDN.php",
     dataType: 'json',
     data: {
       "matchid": this.state.editTeamData.matchid,
       "teamNo": this.state.editTeamData.teamno,
       "teamname": this.state.editTeamData.teamname
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['response']=data.status;
       console.log(data);
     }
    });
    setTimeout(()=>{
      this.modalEditTeamClick()
      this.matchDetailRefresh=false;
      this.props.loadMatchDetail(this.props.matchDetailData)
    },500)
    this.setState(this.state)
  }
  editTeamName =(data)=>{
    this.state.editTeamData.matchid = this.props.matchDetailID
    this.state.editTeamData.teamno = data.teamno
    this.modalEditTeamClick()
  }
  clickScore = ()=>{
    this.setState((prevState)=>{
      return {
        scoreHideState: !prevState.scoreHideState,
      };
    });
  }
  setTeamName = (data) =>{
    this.state.editTeamData.teamname = data
  }
  refresh = ()=>{
    this.setState(this.state)
  }
  render(){
    //console.log("detailUser.userid",this.props.userID);
    //console.log("userHostID",this.props.userHostID);this.props.matchDetailID
    /*console.log("userID",this.props.userID);
    console.log("detailUser",this.props.detailUser);*/
    let drawerClassUser = 'detail__griduserhost hide';
    let toggleScoreShow = 'Show score'
    if(this.state.scoreHideState){
      drawerClassUser = 'detail__griduserhost'
      toggleScoreShow = 'Hide score'
    }
    const te = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    const testt = [1,2,3,4,5,6,7,8,9]
    const testtt = [10,11,12,13,14,15,16,17,18]
    return(
      <div className="match__detail">
        <div className="space"></div>
        <div className="detail__grid">
          <div className="detail__topbar">
            <div className="detail__gridtop">
              {/*---------------------------------------------------------------*/}
              {this.props.detail.map((data,i)=>
                <div className="detail__label">
                  <div className="detail__matchname">
                    <div className="detail__matchname__label">{data.matchname}</div>
                  </div>
                  <div className="detail__fieldname">
                    <div className="detail__fieldname__label">
                      <img className="detail__fieldname__icon" src={ic_location} />
                      <div className="detail__fieldname__text">{data.fieldname}</div>
                    </div>
                    <div className="space"></div>
                  </div>
                  <div className="detail__datematch">
                    <div className="detail__datematch__text">Date &#8196; : &#8196; {data.datematch}</div>
                    <div className="space"></div>
                  </div>
                </div>
              )}
              {/*-------*/}
              <div className="detail__controller">
                <div className="space"></div>
                <div className="detail__controller__edit">
                  <div className="space"></div>
                  <a onClick={()=>this.props.updateMatchToggle(this.props.matchDetailID)}>
                    <img className="detail__controller__icon" src={ic_edit}/>
                  </a>
                  <div className="space"></div>
                </div>
                <div className="space"></div>
                <div className="detail__controller__result">
                  <div className="space"></div>
                  <a onClick={()=>this.modalMatchResultClick(true)}>
                    <img className="detail__controller__icon" src={ic_result}/>
                  </a>
                  <div className="space"></div>
                </div>
                <div className="space"></div>
              </div>
            </div>
            {/*---------------------------------------------------------------*/}
            <div className="detail__labelgrid__grid">
              <div className="detail__labelgrid">
                <div className="detail__labelgrid__top">
                  <div className="detail__labelgrid__name">Name</div>
                </div>
                <div className="detail__labelgrid__bottom">
                  <div className="detail__labelgrid__in">{"IN"}</div>
                  <div className="detail__labelgrid__in">{"OUT"}</div>
                  <div className="detail__labelgrid__gross">{"GROSS"}</div>
                </div>
              </div>
              <div className="detail__labelgrid__holescore">
                <div className="detail__holescore__left">
                  <div className="detail__labelgrid__scorelabel">
                    {testt.map((d)=>
                      <p className="detail__labelgrid__score">
                        <div className="space"></div>
                        {d}
                        <div className="space"></div>
                      </p>
                    )}
                  </div>
                  <div className="detail__labelgrid__score__grid">
                    {this.props.detailMatchFromLoadField.filter(
                      (item,i)=>{
                        return (i < 9)
                      }
                    ).map((d)=>
                      <p className="detail__labelgrid__score">
                        <div className="space"></div>
                        {d.fieldscore}
                        <div className="space"></div>
                      </p>
                    )}
                  </div>
                </div>
                <div className="detail__holescore__left">
                  <div className="detail__labelgrid__scorelabel">
                    {testtt.map((d)=>
                      <p className="detail__labelgrid__score">
                        <div className="space"></div>
                        {d}
                        <div className="space"></div>
                      </p>
                    )}
                  </div>
                  <div className="detail__labelgrid__score__grid">
                    {this.props.detailMatchFromLoadField.filter(
                      (item,i)=>{
                        return (i >= 9)
                      }
                    ).map((d)=>
                      <p className="detail__labelgrid__score">
                        <div className="space"></div>
                        {d.fieldscore}
                        <div className="space"></div>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {this.props.detailUserhost.map((data)=>
              <div className={drawerClassUser}>
                {this.setTeamno(data)}
                <div className="detail__userhostname">{data.fullname} id : {data.userid}
                  <button onClick={this.clickScore}>{toggleScoreShow}</button>
                    {(this.props.setDepartData.length)?(
                      <div>
                        <select onChange={(e)=>this.departNo(e.target.value)}>
                        {this.props.setDepartData.map((d)=>
                          <option value={d.departno}>
                            {d.departname}
                          </option>
                        )}
                        </select>
                        <button onClick={this.updateDepart}>set depart</button>
                      </div>
                    ):(null)}
                </div>
                <div className="detail__griduserhost__label">
                  <div className="detail__userhostin">{data.in}</div>
                  <div className="detail__userhostout">{data.out}</div>
                  <div className="detail__userhostgross">{data.gross}</div>
                </div>
                <div className="detail__griduserhost__score">
                  {this.props.holeScoreUserhost[0].map((d)=>
                    <p className="griduserhost__score">
                      <div className="space"></div>
                      {d}
                      <div className="space"></div>
                    </p>
                  )}
                </div>
              </div>
            )}

          </div>
          <div className="detail__card">
            {this.props.setTeamData.map((data,i)=>
              <div>
                <p>{data.teamname}</p>
                {(this.props.userID === this.props.userHostID)?
                  (
                    <button onClick={()=>{
                        this.editTeamName(data)
                      }}>edit</button>
                  ):(null)}
                <div className="detail__teambox">
                  {this.setTeamTemp(data,i)}
                  {this.props.detailUser.filter(
                      (item)=>{
                        return this.state.teamTemp === item.teamno;
                      }
                    ).map((data)=>
                    <div className="detail__userdetailbox">
                      <div className="detail__userdetailbox__label">
                        <div className="detail__username">
                          <div className="detail__username__name">
                            <div className="detail__username__name__text">
                              {data.fullname} id : {data.userid}
                                {this.setTeamno(data)}
                                {this.setUserMapID(data.userid)}
                                {(this.props.setTeamData.length && parseInt(this.state.userMapID) === this.props.userID)?(
                                  <select onChange={(e)=>this.setUpdateTeam(e.target.value)}>
                                    {(parseInt(this.state.userMapID) === this.props.userID)?
                                    (
                                      this.props.setTeamData.map((data,i)=>
                                        <option value={data.teamno}>{data.teamno}</option>
                                      )
                                    ):(null)}
                                  </select>
                                ):(null)}
                                {(this.props.setTeamData.length && parseInt(this.state.userMapID) === this.props.userID)?
                                (
                                  <button onClick={this.updateTeam} className="detail__choose">Choose team</button>
                                ):(null)}
                            </div>
                            <div className="detail__username__name__depart">
                              {this.setDepartno(data.departno)}
                              {this.props.setDepartData.filter(
                                (item)=>{
                                  return (parseInt(item.departno) === this.state.tempDepart)
                                }
                              ).map((d)=>
                              <div>
                                depart :
                                {d.departname}
                              </div>
                            )}
                            </div>
                          </div>
                          <div className="detail__usernamein">{data.in}</div>
                          <div className="detail__usernameout">{data.out}</div>
                          <div className="detail__usernamegross">{data.gross}</div>
                        </div>
                      </div>
                      {this.props.tempHole.filter(
                        (item)=>{
                          return (parseInt(this.state.tempHole.teamno) === parseInt(item.teamno)) && (parseInt(this.state.tempHole.userid) === parseInt(item.userid))
                        }
                        ).map((data)=>
                        <div className="detail__userdetailbox__score">
                          {data.holescore.map((d)=>
                            <p className="griduserhost__score">
                              <div className="space"></div>
                              {d}
                              <div className="space"></div>
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    )}
                </div>
              </div>
            )}
            {this.props.detailUser.filter(
              (item)=>{
                return item.teamno === 0;
              }
            ).map((data,i)=>
            <div className="detail__userdetailbox">
              <div className="detail__userdetailbox__label">
                <div className="detail__username">
                  <div className="detail__username__name">
                    <div className="detail__username__name__text">
                      {data.fullname} id : {data.userid}
                        {this.setTeamno(data)}
                        {this.setUserMapID(data.userid)}
                        {(this.props.setTeamData.length && parseInt(this.state.userMapID) === this.props.userID)?(
                          <select onChange={(e)=>this.setUpdateTeam(e.target.value)}>
                            {(parseInt(this.state.userMapID) === this.props.userID)?
                            (
                              this.props.setTeamData.map((data,i)=>
                                <option value={data.teamno}>{data.teamno}</option>
                              )
                            ):(null)}
                          </select>
                        ):(null)}
                        {(this.props.setTeamData.length && parseInt(this.state.userMapID) === this.props.userID)?
                        (
                          <button onClick={this.updateTeam} className="detail__choose">Choose team</button>
                        ):(null)}
                    </div>
                    <div className="detail__username__name__depart">
                      {this.setDepartno(data.departno)}
                      {this.props.setDepartData.filter(
                        (item)=>{
                          return (parseInt(item.departno) === this.state.tempDepart)
                        }
                      ).map((d)=>
                      <div>
                        depart :
                        {d.departname}
                      </div>
                    )}
                    </div>
                  </div>
                  <div className="detail__usernamein">{data.in}</div>
                  <div className="detail__usernameout">{data.out}</div>
                  <div className="detail__usernamegross">{data.gross}</div>
                </div>
              </div>
              {this.props.tempHole.filter(
                (item)=>{
                  return (parseInt(this.state.tempHole.teamno) === parseInt(item.teamno)) && (parseInt(this.state.tempHole.userid) === parseInt(item.userid))
                }
                ).map((data)=>
                <div className="detail__userdetailbox__score">
                  {data.holescore.map((d)=>
                    <p className="griduserhost__score">
                      <div className="space"></div>
                      {d}
                      <div className="space"></div>
                    </p>
                  )}
                </div>
              )}
            </div>
            )}
          </div>
        </div>
        <div className="space"></div>
        <ModalEditTeam
          updateTNDN = {this.HandlerSudoUpdateTNDN}
          setTeamName = {this.setTeamName}
          modalClick = {this.modalEditTeamClick}
          modalState = {this.state.modalEditTeam}/>
        <ModalMatchResult
          setDepartData = {this.props.setDepartData}
          setTeamData = {this.props.setTeamData}
          typeScore = {this.state.typeScore}
          tempResultHole = {this.state.tempResultHole}
          matchDetailID = {this.props.matchDetailID}
          resultMatchFromLoad = {this.state.resultMatchFromLoad}
          resultMatchFromLoadUser = {this.state.resultMatchFromLoadUser}
          resultMatchFromLoadHoleScore = {this.state.resultMatchFromLoadHoleScore}
          modalMatchResultClick = {this.modalMatchResultClick}
          getSort = {this.getSort}
          modalClick = {this.modalMatchResultClick}
          modalState = {this.state.modalMatchResult}/>
      </div>
    );
  }
}

export default MatchDetail;
