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
      resultMatchFromLoad:[],
      resultMatchFromLoadUser:[],
      resultMatchFromLoadHoleScore:[],
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
       localStorage['net']=data.net
       localStorage['sf']=data.sf
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
        var net = localStorage['net'];
        var sf = localStorage['sf'];
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
        net = JSON.parse("["+net+"]")
        sf = JSON.parse("["+sf+"]")
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
        this.state.resultMatchFromLoad.push(obj);
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
        let holescoreTemp = [];
        for(var i = 0;i < holescore.length;i++){
          holescoreTemp.push(holescore[i])
          if((i+1)%18===0){
            this.state.resultMatchFromLoadHoleScore.push(holescoreTemp);
            holescoreTemp = []
          }
        }

      }
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
  setTeamTemp = (data)=>{
    this.state.teamTemp = data;
    this.state.optionTemp = []
    this.state.optionTemp = this.props.setTeamData
  }
  setUpdateTeam = (data)=>{
    this.state.teamNumber = data
  }
  updateTeam =()=>{
    if(this.state.teamNumber === undefined || this.state.teamNumber === "" || this.state.teamNumber === null){
      this.state.teamNumber = 1
      this.HandlerUpdateTDbyUser(this.props.matchDetailID,1)
    }else{
      this.HandlerUpdateTDbyUser(this.props.matchDetailID,this.state.teamNumber)
    }
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
    setTimeout(()=>{
      if(localStorage['response']){
        this.props.loadMatchDetail(this.props.matchDetailData)
        setTimeout(()=>{
          /*this.matchDetailRefresh=false;
          this.refresh()*/
          this.setState({ state: this.state });
          console.log("in handler update :::");
        },500)
      }
    },500)
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
  refresh = () =>{
    if(!this.matchDetailRefresh){
      this.matchDetailRefresh=true;
      this.props.loadMatchDetail(this.props.matchDetailData)
      this.setState(this.state);
      console.log("refresh");
    }
  }
  editTeamName =(data)=>{
    this.state.editTeamData.matchid = this.props.matchDetailID
    this.state.editTeamData.teamno = data.teamno
    this.modalEditTeamClick()
  }
  setTeamName = (data) =>{
    this.state.editTeamData.teamname = data
  }
  render(){
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
                <button onClick={()=>{
                    this.editTeamName(data)
                  }}>edit</button>
                <div className="detail__teambox">
                  {this.setTeamTemp(i)}
                  {this.props.detailUser.filter(
                      (item)=>{
                        return this.state.teamTemp + 1 === item.teamno;
                      }
                    ).map((data)=>
                      <div className="detail__username">
                        <div className="detail__username">{data.fullname} {data.userid}
                          <select onChange={(e)=>this.setUpdateTeam(e.target.value)}>
                            {this.state.optionTemp.map((data,i)=>
                              <option value={data.teamno}>{data.teamno}</option>
                            )}
                          </select>
                          <button onClick={this.updateTeam} className="detail__choose">Choose team</button>
                        </div>
                        <div className="detail__usernamein">{data.in}</div>
                        <div className="detail__usernameout">{data.out}</div>
                        <div className="detail__usernamegross">{data.gross}</div>
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
                  <select onChange={(e)=>this.setUpdateTeam(e.target.value)}>
                    {this.state.optionTemp.map((data,i)=>
                      <option value={data.teamno}>{data.teamno}</option>
                    )}
                  </select>
                  <button onClick={this.updateTeam} className="detail__choose">Choose team</button>
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
