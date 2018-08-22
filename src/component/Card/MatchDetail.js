import React from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import './MatchDetail.css'

import ModalEditTeam from '../Modal/ModalEditTeam'
import ModalMatchResult from '../Modal/ModalMatchResult'

class MatchDetail extends React.Component{
  constructor(props){
    super(props)
    this.matchDetailRefresh = false
    this.state = {
      modalEditTeam: false,
      modalMatchResult: false,
      teamTemp:'',
      optionTemp:[],
      teamNumber: '',
      editTeamData:{
        teamname:'',
        teamno:'',
        matchid:''
      },
      typeScore:0,
      resultMatchFromLoad:[],
      resultMatchFromLoadUser:[],
      resultMatchFromLoadHoleScore:[],
      tempHole:{
        teamno:'',
        matchid:''
      },
      userMapID:''
    }
  }

  modalMatchResultClick =() =>{
    this.state.resultMatchFromLoad = []
    this.state.resultMatchFromLoadUser = []
    this.state.resultMatchFromLoadHoleScore = []
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/matchresultscore.php",
     dataType: 'json',
     data: {
       "matchid": this.props.matchDetailID
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
       console.log(data);
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
              departno: departno[i]
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
              departno: departno[i]
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
              departno: departno[i]
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

      }
      console.log("resultMatchFromLoadUser",this.state.resultMatchFromLoadUser);
      this.setState((state)=>{
        return {modalMatchResult: !state.modalMatchResult}
      })
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
  updateTeam =()=>{
    if(this.state.teamNumber === undefined || this.state.teamNumber === "" || this.state.teamNumber === null){
      this.state.teamNumber = 1
      this.HandlerUpdateTDbyUser(this.props.matchDetailID,1)
      setTimeout(()=>{
        this.matchDetailRefresh=false;
        this.props.loadMatchDetail(this.props.matchDetailData)
      },500)
    }else{
      this.HandlerUpdateTDbyUser(this.props.matchDetailID,this.state.teamNumber)
      setTimeout(()=>{
        this.matchDetailRefresh=false;
        this.props.loadMatchDetail(this.props.matchDetailData)
      },500)
    }
    this.setState(this.state)
  }
  HandlerUpdateTDbyUser=(matchid,teamno)=>{
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/updateTDbyuser.php",
     dataType: 'json',
     data: {
       "matchid": matchid,
       "teamno": teamno,
       "departno": "",
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
     url: "http://pds.in.th/phpadmin/sudoupdateTNDN.php",
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
    },500)
  }
  editTeamName =(data)=>{
    this.state.editTeamData.matchid = this.props.matchDetailID
    this.state.editTeamData.teamno = data.teamno
    this.modalEditTeamClick()
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
    console.log("detailUser",this.props.detailUser);
    console.log("setTeamData",this.props.setTeamData);*/
    const option = this.props.setTeamData
    console.log(option);
    return(
      <div className="match__detail">
        <div className="space"></div>
        <div className="detail__grid">
          <div className="space"></div>
          <div className="detail__card">
            <div className="detail__gridtop">
              {this.props.detail.map((data,i)=>
                <div className="detail__label">
                  <div className="detail__matchname">{data.matchname}</div>
                  <div className="detail__fieldname">{data.fieldname}</div>
                  <div className="detail__datematch">{data.datematch}</div>
                </div>
              )}
              <div className="detail__controller">
                <button onClick={this.modalMatchResultClick}>Result</button>
                <button onClick={()=>this.props.updateMatchToggle(this.props.matchDetailID)}>Edit Field</button>
              </div>
            </div>
            <div className="detail__gridfield">

            </div>
            <div className="detail__griduserhost">
              <div className="detail__userhostname">Name</div>
              <div className="detail__userhostin">{"IN"}</div>
              <div className="detail__userhostout">{"OUT"}</div>
              <div className="detail__userhostgross">{"GROSS"}</div>
            </div>
            {this.props.detailUserhost.map((data)=>
              <div className="detail__griduserhost">
                <div className="detail__userhostname">{data.fullname} {data.userid}</div>
                <div className="detail__userhostin">{data.in}</div>
                <div className="detail__userhostout">{data.out}</div>
                <div className="detail__userhostgross">{data.gross}</div>
              </div>
            )}
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
                    <div>
                      <div className="detail__username">
                        <div className="detail__username">{data.fullname} {data.userid}
                          {this.setTeamno(data)}
                          {this.setUserMapID(data.userid)}
                          <select onChange={(e)=>this.setUpdateTeam(e.target.value)}>
                            {(parseInt(this.state.userMapID) === this.props.userID)?
                            (
                              option.map((data,i)=>
                                <option value={data.teamno}>{data.teamno}</option>
                              )
                            ):(null)}
                          </select>
                          {(parseInt(this.state.userMapID) === this.props.userID)?
                          (
                            <button onClick={this.updateTeam} className="detail__choose">Choose team</button>
                          ):(null)}
                          {this.props.tempHole.filter(
                            (item)=>{
                              return (this.state.tempHole.teamno === item.teamno) && (this.state.tempHole.userid === item.userid)
                            }
                          ).map((data)=>
                          <div>{" "}{data.holescore}{" "}</div>
                        )}
                        </div>
                        <div className="detail__usernamein">{data.in}</div>
                        <div className="detail__usernameout">{data.out}</div>
                        <div className="detail__usernamegross">{data.gross}</div>
                      </div>
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
              <div className="detail__username">
                <div className="detail__username">{data.fullname} {data.userid}
                  {this.setUserMapID(data.userid)}
                  <select onChange={(e)=>this.setUpdateTeam(e.target.value)}>
                    {(parseInt(this.state.userMapID) === this.props.userID)?
                    (
                      option.map((data,i)=>
                        <option value={data.teamno}>{data.teamno}</option>
                      )
                    ):(null)}
                  </select>
                  {(parseInt(this.state.userMapID) === this.props.userID)?
                  (
                    <button onClick={this.updateTeam} className="detail__choose">Choose team</button>
                  ):(null)}
                </div>
                <div className="detail__usernamein">{data.in}</div>
                <div className="detail__usernameout">{data.out}</div>
                <div className="detail__usernamegross">{data.gross}</div>
              </div>
            )}

          </div>
          <div className="space"></div>
        </div>
        <div className="space"></div>
        <ModalEditTeam
          updateTNDN = {this.HandlerSudoUpdateTNDN}
          setTeamName = {this.setTeamName}
          modalClick = {this.modalEditTeamClick}
          modalState = {this.state.modalEditTeam}/>
        <ModalMatchResult
          setTeamData = {this.props.setTeamData}
          typeScore = {this.state.typeScore}
          resultMatchFromLoad = {this.state.resultMatchFromLoad}
          resultMatchFromLoadUser = {this.state.resultMatchFromLoadUser}
          resultMatchFromLoadHoleScore = {this.state.resultMatchFromLoadHoleScore}
          modalClick = {this.modalMatchResultClick}
          modalState = {this.state.modalMatchResult}/>
      </div>
    );
  }
}

export default MatchDetail;
