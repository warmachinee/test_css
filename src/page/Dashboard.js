import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import ReactDom from 'react-dom';
import $ from 'jquery'
import '../css/App.css'

import TopNav from '../component/TopNav/TopNav'
import SideNav from '../component/SideNav/SideNav'
import BackDrop from '../component/BackDrop/BackDrop'
import Card from '../component/Card/Card'
import ModalCreateMatch from '../component/Modal/ModalCreateMatch'
import ModalAddPeople from '../component/Modal/ModalAddPeople'
import ModalAddScore from '../component/Modal/ModalAddScore'
import ModalRoomPassword from '../component/Modal/ModalRoomPassword'
import HistoryCard from '../component/Card/HistoryCard'
import DropDown from '../component/DropDown/DropDown'
import MatchDetail from '../component/Card/MatchDetail'
import UserMatch from '../component/Card/UserMatch'
import SwitchToggle from '../component/Switch/SwitchToggle'

const pageClickState = props =>{
  return (props.pageDashboardClick);
}
class Dashboard extends Component {
  constructor(props){
    super(props)
    this.dashboardRefresh = false;
    this.refreshMatchDetail = React.createRef()
    this.state = {
      createModalIsOpen: false,
      addpeopleModalIsOpen: false,
      addscoreModalIsOpen: false,
      roomPasswordModal: false,
      sideDrawerOpen: false,
      notiToggle: false,
      languageState: false,
      matchDetailState: false,
      userDashboardState: !false,
      historyPage: false,
      publicPageState:false,
      updateMatchState: false,
      currentCardData:{},
      data:[],
      userProfileData:[],
      fieldFromLoad:[],
      loadUserMatchData:[],
      customFieldFromLoad:[],
      customFieldFromLoadHoleScore:[],
      cardTargetData:[{
        matchid:'',
        userTarget:'',
        action:''
      }],
      addScoreFieldScoreFirst:[],
      addScoreFieldScoreLast:[],
      historyFromLoad:[],
      detailMatchFromLoad:[],
      detailMatchFromLoadUser:[],
      detailMatchFromLoadUserHost:[],
      detailMatchFromLoadUserHostScore:[],
      detailMatchFromLoadHoleScore:[],
      detailMatchFromLoadField:[],
      setTeamData:[],
      setDepartData:[],
      runningFromLoad:[],
      publicFromLoad:[],
      activityRequest:[],
      activityRequestMap:[],
      roomDetailToAccess:[],
      dataFromLoad:[],
      matchDetailData:[],
      matchDetailID:'',
      tempHole:[],
      dashUserID:'',
      UserHostID:'',
      chksessionFullLast:'',
      updateMatchMatchid:'',
      matchModalData:{
        fieldid:'',
        matchname:'',
        typeroom:'',
        publicshow:'',
        tourMode:'',
        date:'',
        teamnum:'',
        departnum:'',
        typescore:0
      },
      invitePlayer:'',
      inviteMatchID:'',
      inviteAction:'',
      calScoreMatchID:'',
      calScoreFieldID:'',
      chksession: '',
      tourDetail: 0
    }
  };
  TournamentToggle = (value) =>{
    if(value){
      this.state.tourDetail = 1
    }else{
      this.state.tourDetail = 0
    }
    this.HandleLoadUserMatch()
  }
  historyPageToggle = () =>{
    //this.drawerToggleClickHandler()
    this.setState((prevState)=>{
      return {
        historyPage: true,
        matchDetailState: false,
        userDashboardState: false,
        publicPageState: false,
        sideDrawerOpen: false
      };
    });
  };
  userDashboardPageToggle = () =>{
    this.setState((prevState)=>{
      return {
        historyPage: false,
        matchDetailState: false,
        userDashboardState: true,
        publicPageState: false,
        sideDrawerOpen: false
      };
    });
  };
  publicPageToggle = () =>{
    this.setState((prevState)=>{
      return {
        historyPage: false,
        matchDetailState: false,
        userDashboardState: false,
        publicPageState: true,
        sideDrawerOpen: false
      };
    });
  };
  dashboardStateToggle = () =>{
    this.setState((prevState)=>{
      return {
        historyPage: false,
        matchDetailState: false,
        userDashboardState: false,
        publicPageState: false,
        sideDrawerOpen: false
      };
    });
  }
  matchDetailStateToggle = (data) =>{
    this.setState((prevState)=>{
      return {
        historyPage: false,
        matchDetailState: true,
        userDashboardState: false,
        publicPageState: false,
        sideDrawerOpen: false
      };
    });
  };
  sideNaveNoti=()=>{
    this.HandlerActivityRequest()
    this.drawerToggleClickHandler()
  }
  drawerToggleClickHandler = () =>{
    this.setState((prevState)=>{
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };
  languageToggle = () =>{
    this.setState((state)=>{
      return {languageState: !state.languageState}
    });
  };
  getNotiClick = () =>{
    //console.log("noti__inside ::",this.state.activityRequest)
    //console.log("this.props.activityRequest length :::",this.state.activityRequest.length);
    this.state.activityRequestMap=[]
    for(var i = 0;i < this.state.activityRequest.length ;i++){
      this.state.activityRequestMap.push(this.state.activityRequest[i]);
    }
    this.setState((prev)=>{
      return{notiToggle: !prev.notiToggle}
    });
  };
  backdropClickHander = () =>{
    this.setState({sideDrawerOpen: false});
  };
  toggleCreateModal = (data) => {
    if(data === "create"){
      this.setState((state)=>{
        return {createModalIsOpen: !state.createModalIsOpen}
      });
    }else if(data === "update"){
      this.setState((state)=>{
        return {
          createModalIsOpen: !state.createModalIsOpen,
          updateMatchState: !state.updateMatchState
        }
      });
    }

  }
  toggleCreateModalLoad =()=>{
    this.HandlerLoadField()
    this.toggleCreateModal("create")
  }
  updateMatchToggle = (matchid) =>{
    this.state.updateMatchMatchid = matchid
    this.HandlerLoadField()
    this.toggleCreateModal("update")
  }
  closeCreateMatchModal = () =>{
    this.setState({
      createModalIsOpen: false,
      updateMatchState: false,
      sideDrawerOpen: false,
      matchModalData:{}
    });
    if(
      this.state.matchDetailState === false &&
      this.state.historyPage === false &&
      this.state.userDashboardState === false &&
      this.state.publicPageState === false){
        console.log("defalut");
        this.props.loadMatch();
      }
      else if(
        this.state.matchDetailState === false &&
        this.state.historyPage === false &&
        this.state.userDashboardState === true &&
        this.state.publicPageState === false
      ){
        console.log("userDashboard");
        this.HandleLoadUserMatch()
        //this.HandlerLoadRunning()
      }else if(
        this.state.matchDetailState === false &&
        this.state.historyPage === false &&
        this.state.userDashboardState === false &&
        this.state.publicPageState === true
      ){
        console.log("pub");
        this.HandlerLoadPublicMatch()
      }
    setTimeout(()=>{
      this.dashboardRefresh = false
      this.showDataFromLoad()
    },500);
  }
  toggleAddpeopleModal = () => {
    this.setState((state)=>{
      return {addpeopleModalIsOpen: !state.addpeopleModalIsOpen}
    });
  }
  getFieldDataFromCard=(first,last)=>{
    this.state.addScoreFieldScoreFirst = []
    this.state.addScoreFieldScoreLast = []

    this.state.addScoreFieldScoreFirst = first
    this.state.addScoreFieldScoreLast = last
    this.setState(this.state)
  }

  calculateScore = (score)=>{
    this.toggleAddScoreModal()
    this.HandlerUpdateScore(score)
    //console.log("calculator :::",score);
  }
  toggleAddScoreModal = () => {
    this.setState((state)=>{
      return {addscoreModalIsOpen: !state.addscoreModalIsOpen}
    });
  }
  toggleRoomPasswordModal = () =>{
    this.setState((state)=>{
      return{roomPasswordModal: !state.roomPasswordModal}
    });
  }
  createSetFieldId=(fieldid)=>{
    if(fieldid[1] === undefined || fieldid[2] === undefined){
      this.state.matchModalData.fieldid = fieldid
      this.state.matchModalData.fieldid[1] = 1
      this.state.matchModalData.fieldid[2] = 2
    }else{
      this.state.matchModalData.fieldid = fieldid
    }
  }
  createSetMatchName=(matchname)=>{
    this.state.matchModalData.matchname = matchname
  }
  createSetTypeRoom=(typeroom)=>{
    if(typeroom === "" || typeroom === null || typeroom === undefined){
      this.state.matchModalData.typeroom = 0
    }else{
      this.state.matchModalData.typeroom = typeroom
    }
  }
  createSetPublicShow = (publicshow)=>{
    this.state.matchModalData.publicshow = publicshow
  }
  createSetTourMode = (tourmode)=>{
    this.state.matchModalData.tourMode = tourmode
  }
  createSetDate=(date)=>{
    this.state.matchModalData.date = date
  }
  createSetTeamNumber=(teamnum)=>{
    if(teamnum < 1 || teamnum === "" || teamnum === null || teamnum === undefined){
      this.state.matchModalData.teamnum = 0
    }
    else{
      this.state.matchModalData.teamnum = teamnum
    }

  }
  createSetDepartmentNumber=(departnum)=>{
    if(departnum <= 0 || departnum === "" || departnum === null || departnum === undefined){
      this.state.matchModalData.departnum = 0
    }else{
      this.state.matchModalData.departnum = departnum
    }
  }
  createSetTypeScore=(typescore)=>{
    this.state.matchModalData.typescore = typescore
  }

  HandlerResultRequest = (data) => {
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/resultrequest.php",
     dataType: 'json',
     data: {
       "matchid": data.matchid,
       "userTarget": data.userTarget,
       "action": data.action,
       "status": data.status,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //localStorage.setItem("response",JSON.stringify(data));
       localStorage['response']=data.status;
       //console.log(data);
     }
    });
    if(localStorage['response']){
      var response = localStorage['response'];
      alert(response)
    }
    this.setState((prev)=>{
      return{notiToggle: !prev.notiToggle}
    });
    setTimeout(this.CreateMatchAction,1000);
  }

  HandlerActivityRequest = ()=>{
    this.state.activityRequest = []
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/activityrequest.php",
     dataType: 'json',
     data: {},
     xhrFields: { withCredentials: true },
     success: function(data) {
       //console.log(data);
       localStorage['matchid'] = data.matchid
       localStorage['userid'] = data.userid
       localStorage['action'] = data.action
     }
    });
    setTimeout(()=>{
      this.state.activityRequest=[]
      if(localStorage['userid']){
        var matchid = localStorage['matchid'];
        var userid = localStorage['userid'];
        var action = localStorage['action'];
        matchid = JSON.parse("["+matchid+"]")
        userid = JSON.parse("["+userid+"]")
        action = JSON.parse("["+action+"]")

        for(var i = 0;i < matchid.length;i++){
          var obj = {
            matchid: matchid[i],
            userid: userid[i],
            action: action[i]
          }
          //this.setState({activityRequest: obj})
          this.state.activityRequest.push(obj);
        }
      }
      this.getNotiClick()
    },500)
    localStorage.clear()
  }

  HandlerLoadMatchUserDetail = (data) =>{
    const userhost = data.userhost
    this.state.UserHostID = data.userhost
    let userhostIndex;
    this.state.matchDetailID = data.matchid
    this.state.matchDetailData = data
    this.state.setTeamData = []
    this.state.setDepartData = []
    this.state.tempHole = []
    this.state.detailMatchFromLoad = []
    this.state.detailMatchFromLoadUser = []
    this.state.detailMatchFromLoadHoleScore = []
    this.state.detailMatchFromLoadField = []
    this.state.detailMatchFromLoadUserHost = []
    this.state.detailMatchFromLoadUserHostScore = []
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/loadmatchuserdetail.php",
     dataType: 'json',
     data: {
       "matchid": data.matchid,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['fieldid']=data.fieldid
       localStorage['matchname']=data.matchname
       localStorage['fieldname']=data.fieldname
       localStorage['datecreate']=data.datecreate
       localStorage['datemodify']=data.datemodify
       localStorage['datematch']=data.datematch
       localStorage['cordA']=data.cordA
       localStorage['cordB']=data.cordB
       localStorage['in']=data.in
       localStorage['out']=data.out
       localStorage['gross']=data.gross
       localStorage['holescore']=data.holescore
       localStorage['userid']=data.userid
       localStorage['fullname']=data.fullname
       localStorage['lastname']=data.lastname
       localStorage['typescore']=data.typescore
       localStorage['teamnum']=data.teamnum
       localStorage['teamno']=data.teamno
       localStorage['departnum']=data.departnum
       localStorage['departno']=data.departno
       //console.log(data);
     }
    });
    var geturl2;
    geturl2 = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/setteammatch.php",
     dataType: 'json',
     data: {
       "matchid": data.matchid,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //console.log(data);
       localStorage['teamname2']=data.teamname
       localStorage['teamno2']=data.teamno
     }
    });
    var geturl3;
    geturl3 = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/setdepartmatch.php",
     dataType: 'json',
     data: {
       "matchid": data.matchid,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //console.log(data);
       localStorage['departname2']=data.departname
       localStorage['departno2']=data.departno
     }
    });
    setTimeout(()=>{
      if(localStorage['teamname2']){
        var teamname2 = localStorage['teamname2']
        var teamno2 = localStorage['teamno2']

        teamname2 = teamname2.split(",",teamname2.length)
        teamno2 = teamno2.split(",",teamno2.length)
        for(var i =0;i < teamname2.length;i++){
          var obj2 = {
            teamname: teamname2[i],
            teamno: teamno2[i],
          }
          this.state.setTeamData.push(obj2)
        }
      }
      if(localStorage['departname2']){
        var departname2 = localStorage['departname2']
        var departno2 = localStorage['departno2']
        departname2 = departname2.split(",",departname2.length)
        departno2 = departno2.split(",",departno2.length)
        for(var i =0;i < departname2.length;i++){
          var obj3 = {
            departname: departname2[i],
            departno: departno2[i],
          }
          this.state.setDepartData.push(obj3)
        }
      }
      if(localStorage['matchname']){
        var fieldid = localStorage['fieldid'];
        var matchname = localStorage['matchname'];
        var fieldname = localStorage['fieldname'];
        var datecreate = localStorage['datecreate'];
        var datemodify = localStorage['datemodify'];
        var datematch = localStorage['datematch'];
        var cordA = localStorage['cordA'];
        var cordB = localStorage['cordB'];
        var inn = localStorage['in'];
        var outt = localStorage['out'];
        var gross = localStorage['gross'];
        var holescore = localStorage['holescore'];
        var userid = localStorage['userid'];
        var fullname = localStorage['fullname'];
        var lastname = localStorage['lastname'];

        var teamnum = localStorage['teamnum'];
        var teamno = localStorage['teamno'];
        var departnum = localStorage['departnum'];
        var departno = localStorage['departno'];
        var typescore = localStorage['typescore'];

        fieldid = JSON.parse("["+fieldid+"]")
        matchname = matchname.split(",",matchname.length)
        fieldname= fieldname.split(",",fieldname.length)
        datecreate = datecreate.split(",",datecreate.length)
        datemodify= datemodify.split(",",datemodify.length)
        datematch = datematch.split(",",datematch.length)
        cordA = JSON.parse("["+cordA+"]")
        cordB = JSON.parse("["+cordB+"]")
        inn = JSON.parse("["+inn+"]")
        outt = JSON.parse("["+outt+"]")
        gross = JSON.parse("["+gross+"]")
        holescore = holescore.split(",",holescore.length)
        userid = userid.split(",",userid.length)
        fullname = fullname.split(",",fullname.length)
        lastname = lastname.split(",",lastname.length)
        teamnum = teamnum.split(",",teamnum.length)
        teamno = JSON.parse("["+teamno+"]")
        departnum = departnum.split(",",departnum.length)
        departno = JSON.parse("["+departno+"]")
        typescore = typescore.split(",",typescore.length)
        var obj = {
          fieldid:"",
          matchname:"",
          fieldname:"",
          datecreate:"",
          datemodify:"",
          datematch:"",
          cordA:"",
          cordB:"",
          teamnum:"",
          departnum:"",
          typescore:"",
        }
        obj.fieldid = fieldid[0]
        obj.matchname = matchname[0]
        obj.fieldname = fieldname[0]
        obj.datecreate = datecreate[0]
        obj.datemodify = datemodify[0]
        obj.datematch = datematch[0]
        obj.cordA = cordA[0]
        obj.cordB = cordB[0]
        obj.teamnum = teamnum[0]
        obj.departnum = departnum[0]
        obj.typescore = typescore[0]
        this.state.detailMatchFromLoad.push(obj);
        for(var i = 0;i < userid.length;i++){
          var obj = {
            in: inn[i],
            out: outt[i],
            gross: gross[i],
            userid: userid[i],
            fullname: fullname[i],
            lastname: lastname[i],
            teamno: teamno[i],
            departno: departno[i]
          }
          this.state.detailMatchFromLoadUser.push(obj);
        }
        let holescoreTemp = [];
        for(var i = 0;i < holescore.length;i++){
          holescoreTemp.push(holescore[i])
          if((i+1)%18===0){
            this.state.detailMatchFromLoadHoleScore.push(holescoreTemp);
            holescoreTemp = []
          }
        }
        for(var i=0;i < this.state.detailMatchFromLoadUser.length;i++){
          this.state.tempHole.push({
            userid: this.state.detailMatchFromLoadUser[i].userid,
            teamno: this.state.detailMatchFromLoadUser[i].teamno,
            holescore: this.state.detailMatchFromLoadHoleScore[i]
          })
        }
        for(var i = 0;i < userid.length;i++){
          if(userhost === parseInt(userid[i])){
            this.state.detailMatchFromLoadUserHost.push(
              {
                in: inn[i],
                out: outt[i],
                gross: gross[i],
                userid: userid[i],
                fullname: fullname[i],
                lastname: lastname[i],
                teamno: teamno[i],
                departno: departno[i]
              })
            this.state.detailMatchFromLoadUserHostScore.push(this.state.detailMatchFromLoadHoleScore[i])
            userhostIndex = i;
          }
        }
      }
      this.HandlerLoadMatchFieldDetail(data.matchid,parseInt(fieldid))
    },500)
    localStorage.clear()
  }

  HandlerLoadMatchFieldDetail = (matchid,fieldid) =>{
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/loadmatchfielddetail.php",
     dataType: 'json',
     data: {
       "matchid": matchid,
       "fieldid": fieldid,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //console.log(data);
       localStorage['fieldscore']=data.fieldscore
       localStorage['fieldHscore']=data.fieldHscore
     }
    });
    setTimeout(()=>{
      if(localStorage['fieldscore']){
        var fieldscore = localStorage['fieldscore'];
        var fieldHscore = localStorage['fieldHscore'];
        fieldscore = fieldscore.split(",",fieldscore.length)
        fieldHscore = fieldHscore.split(",",fieldHscore.length)
        for(var i = 0;i < fieldscore.length;i++){
          var obj = {
            fieldscore: fieldscore[i],
            fieldHscore: fieldHscore[i]
          }
          this.state.detailMatchFromLoadField.push(obj)
        }
        //console.log("detailMatchFromLoad ",this.state.detailMatchFromLoad)
        //console.log("detailMatchFromLoadUser :::",this.state.detailMatchFromLoadUser)
        //console.log("detailMatchFromLoadHoleScore :::",this.state.detailMatchFromLoadHoleScore)
        //console.log("tempHole ",this.state.tempHole);
        //console.log("detailMatchFromLoadField :::",this.state.detailMatchFromLoadField)
        //console.log("detailMatchFromLoadUserHost :::",this.state.detailMatchFromLoadUserHost)
        //console.log("detailMatchFromLoadUserHostScore :::",this.state.detailMatchFromLoadUserHostScore)
        this.setState(this.state)
      }
    },300)
    localStorage.clear()
  }

  HandlerUpdateScore = (data) =>{
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/userupdatescore.php",
     dataType: 'json',
     data: {
       "matchid": this.state.calScoreMatchID.matchid,
       "arrscore": data,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //localStorage.setItem("response",JSON.stringify(data));
       localStorage['response']=data.status;
       //console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['response']==='success'){
        this.setState({addscoreModalIsOpen: false})
        this.state.calScoreMatchID = ''
      }else{
        alert(localStorage['response'])
      }
    },500)
    localStorage.clear()
  }

  HanderlSendRequest = event =>{
    //console.log("this.state.inviteMatchID ",this.state.inviteMatchID);
    //console.log("this.state.invitePlayer ",this.state.invitePlayer);
    //console.log("this.state.inviteAction ",this.state.inviteAction);
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/sendrequest.php",
     dataType: 'json',
     data: {
       "matchid": this.state.inviteMatchID,
       "userTarget": this.state.invitePlayer,
       "action": this.state.inviteAction,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //localStorage.setItem("response",JSON.stringify(data));
       localStorage['response']=data.status;
       //console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['response']){
        //console.log(localStorage['response']);
        if(this.state.inviteAction===0){
          this.toggleAddpeopleModal()
        }
        this.state.invitePlayer = ''
        this.state.inviteMatchID = ''
        this.state.inviteAction = ''
      }
    },1000)
    localStorage.clear()
  }

  HandlerLoadField = (event) => {
    this.state.fieldFromLoad = []
    this.state.customFieldFromLoad = []
    this.state.customFieldFromLoadHoleScore = []
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/loadfield.php",
     dataType: 'json',
     data: {},
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['fieldid']=data.fieldid;
       localStorage['fieldname']=data.fieldname;
       localStorage['cordnum']=data.cordnum;
       //console.log(data);
     }
    });
    var geturl2;
    geturl2 = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/loadcustomfield.php",
     dataType: 'json',
     data: {},
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['cus__fieldid']=data.fieldid;
       localStorage['cus__fieldname']=data.fieldname;
       localStorage['holescore']=data.holescore;
       //console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['fieldid']){
        var fieldid = localStorage['fieldid'];
        var fieldname = localStorage['fieldname'];
        var cordnum = localStorage['cordnum'];
        fieldid = fieldid.split(",",fieldid.length)
        fieldname = fieldname.split(",",fieldname.length)
        cordnum = cordnum.split(",",cordnum.length)
        for(var i = 0;i < fieldid.length;i++){
          var obj = {
            fieldid: fieldid[i],
            fieldname: fieldname[i],
            cordnum: cordnum[i],
          }
          this.state.fieldFromLoad.push(obj);
        }
      }
      if(localStorage['cus__fieldid']){
        var cus__fieldid = localStorage['cus__fieldid'];
        var cus__fieldname = localStorage['cus__fieldname'];
        var holescore = localStorage['holescore'];

        cus__fieldid = cus__fieldid.split(",",cus__fieldid.length)
        cus__fieldname = cus__fieldname.split(",",cus__fieldname.length)
        holescore = holescore.split(",",holescore.length)

        for(var i = 0;i < cus__fieldid.length;i++){
          var obj = {
            fieldid: cus__fieldid[i],
            fieldname: cus__fieldname[i],
          }
          this.state.customFieldFromLoad.push(obj);
        }
        let holescoreTempCus = [];
        let holescoreTempCusHole = [];
        let holescoreTempCusHCP = [];
        for(var i = 0;i < holescore.length;i++){
          holescoreTempCus.push(holescore[i])
          if((i+1)%36===0){
            for(var j = 0;j < 18;j++){
              holescoreTempCusHole.push(holescoreTempCus[j])
            }
            for(var j = 18;j < 36;j++){
              holescoreTempCusHCP.push(holescoreTempCus[j])
            }
            this.state.customFieldFromLoadHoleScore.push({
              holescore: holescoreTempCusHole,
              hcp: holescoreTempCusHCP
            });
            holescoreTempCus = []
            holescoreTempCusHole = []
            holescoreTempCusHCP = []
          }
        }
      }
    },500)
    localStorage.clear()
  }

  HandlerLoadHistory = event => {
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/matchhistory.php",
     dataType: 'json',
     data: {},
     xhrFields: { withCredentials: true },
     success: function(data) {
       //console.log(data);
     }
    });
    setTimeout(()=>{
      this.state.historyFromLoad=[]
      if(localStorage['matchid']){
        var matchid = localStorage['matchid'];
        var matchname = localStorage['matchname'];
        var userhost = localStorage['userhost'];
        var fieldname = localStorage['fieldname'];
        var date = localStorage['date'];

        matchid = JSON.parse("["+matchid+"]")
        matchname = matchname.split(",",matchname.length)
        userhost= JSON.parse("["+userhost+"]")
        fieldname= fieldname.split(",",fieldname.length)
        date= date.split(",",date.length)
        for(var i = 0;i < matchid.length;i++){
          var obj = {
            matchid: matchid[i],
            matchname: matchname[i],
            userhost: userhost[i],
            fieldname: fieldname[i],
            date: date[i]
          }
          this.state.historyFromLoad.push(obj);
        }
      }
      this.historyPageToggle()
      this.dashboardRefresh = false
      this.showHistoryFromLoad()
    },500)
    localStorage.clear()
  }
  HandleUserDetail = () =>{
    this.state.userProfileData = []
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/userdetail.php",
     dataType: 'json',
     data: {},
     xhrFields: { withCredentials: true },
     success: function(data) {
       //console.log(data);
       localStorage['status'] = data.status
       localStorage['userid'] = data.userid
       localStorage['username'] = data.username
       localStorage['fullname'] = data.fullname
       localStorage['lastname'] = data.lastname
       localStorage['nickname'] = data.nickname
       localStorage['sex'] = data.sex
       localStorage['depart'] = data.depart
       localStorage['tel'] = data.tel
       localStorage['favtypegolf'] = data.favtypegolf
     }
    });
    setTimeout(()=>{
      if(localStorage['status'] === 'success'){
        var userid = localStorage['userid']
        var username = localStorage['username']
        var fullname = localStorage['fullname']
        var lastname = localStorage['lastname']
        var nickname = localStorage['nickname']
        var sex = localStorage['sex']
        var depart = localStorage['depart']
        var tel = localStorage['tel']
        var favtypegolf = localStorage['favtypegolf']

        this.state.userProfileData.push({
          userid: parseInt(userid),
          username: username,
          fullname: fullname,
          lastname: lastname,
          nickname: nickname,
          sex: sex,
          depart: depart,
          tel: tel,
          favtypegolf: favtypegolf
        })
      }
    },500)
    localStorage.clear()
  }
  HandleLoadUserMatch = () =>{
    this.state.loadUserMatchData = []
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/loadusermatch.php",
     dataType: 'json',
     data: {
       "tourtype": this.state.tourDetail
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //console.log(data);
       localStorage['matchname'] = data.matchname
       localStorage['matchid'] = data.matchid
       localStorage['date'] = data.date
       localStorage['in'] = data.in
       localStorage['out'] = data.out
       localStorage['gross'] = data.gross
       localStorage['hc'] = data.hc
       localStorage['net'] = data.net
       localStorage['net36sys'] = data.net36sys
       localStorage['par'] = data.par
       localStorage['sf'] = data.sf
       localStorage['sf36sys'] = data.sf36sys
     }
    });
    setTimeout(()=>{
      if(localStorage['matchname']){
        var matchname = localStorage['matchname']
        var matchid = localStorage['matchid']
        var date = localStorage['date']
        var inn = localStorage['in']
        var outt = localStorage['out']
        var gross = localStorage['gross']
        var hc = localStorage['hc']
        var net = localStorage['net']
        var net36sys = localStorage['net36sys']
        var par = localStorage['par']
        var sf = localStorage['sf']
        var sf36sys = localStorage['sf36sys']

        matchname= matchname.split(",",matchname.length)
        matchid= matchid.split(",",matchid.length)
        date= date.split(",",date.length)
        inn= inn.split(",",inn.length)
        outt= outt.split(",",outt.length)
        gross= gross.split(",",gross.length)
        hc= hc.split(",",hc.length)
        net= net.split(",",net.length)
        net36sys= net36sys.split(",",net36sys.length)
        par= par.split(",",par.length)
        sf= sf.split(",",sf.length)
        sf36sys= sf36sys.split(",",sf36sys.length)

        for(var i = 0;i < matchname.length;i++){
          var obj = {
            matchname: matchname[i],
            matchid: parseInt(matchid[i]),
            date: date[i],
            in: parseInt(inn[i]),
            out: parseInt(outt[i]),
            gross: parseInt(gross[i]),
            hc: parseInt(hc[i]),
            net: parseInt(net[i]),
            net36sys: parseInt(net36sys[i]),
            par: parseInt(par[i]),
            sf: parseInt(sf[i]),
            sf36sys: parseInt(sf36sys[i]),
          }
          this.state.loadUserMatchData.push(obj)
        }
        //console.log("loadMatchData",this.state.loadUserMatchData);
        //console.log("userProfileData",this.state.userProfileData);
      }
      this.dashboardRefresh = false
      this.showUserLoadmatchFromLoad()
    },800)
    localStorage.clear()
  }
  HandlerUpdateMatch = (data) =>{
    if(this.state.matchModalData.fieldid[0] === undefined){
      this.state.matchModalData.fieldid[0] = this.state.detailMatchFromLoad[0].fieldid.toString()
    }
    if(this.state.matchModalData.matchname === "" || this.state.matchModalData.matchname === undefined || this.state.matchModalData.matchname === null){
      this.state.matchModalData.matchname = this.state.detailMatchFromLoad[0].matchname
    }
    if(this.state.matchModalData.typeroom === "" || this.state.matchModalData.typeroom === undefined || this.state.matchModalData.typeroom  === null){
      this.state.matchModalData.typeroom = 0
    }
    if(this.state.matchModalData.date === "" || this.state.matchModalData.date === undefined || this.state.matchModalData.date === null){
      this.state.matchModalData.date = this.state.detailMatchFromLoad[0].datematch
    }
    if(this.state.matchModalData.teamnum === "" || this.state.matchModalData.teamnum === undefined || this.state.matchModalData.teamnum === null){
      this.state.matchModalData.teamnum  = this.state.detailMatchFromLoad[0].teamnum
    }
    if(this.state.matchModalData.departnum === "" || this.state.matchModalData.departnum === undefined || this.state.matchModalData.departnum === null){
      this.state.matchModalData.departnum = this.state.detailMatchFromLoad[0].departnum
    }
    const dataU = {
      "fieldid": this.state.matchModalData.fieldid[0],
      "cordA": this.state.matchModalData.fieldid[1],
      "cordB": this.state.matchModalData.fieldid[2],
      "matchid": this.state.updateMatchMatchid,
      "matchname": this.state.matchModalData.matchname,
      "typescore": this.state.matchModalData.typescore,
      "typeroom": this.state.matchModalData.typeroom,
      "publicshow": this.state.matchModalData.publicshow,
      "date": this.state.matchModalData.date,
      "teamnum": this.state.matchModalData.teamnum,
      "departnum": this.state.matchModalData.departnum,
    }
    //console.log("detailMatchFromLoad",this.state.detailMatchFromLoad);
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/updatematch.php",
     dataType: 'json',
     data: {

     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['status']=data.status;
       //console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['status']){
        if(localStorage['status'] === "updatematch success"){
          this.HandlerLoadMatchUserDetail(this.state.currentCardData)
        }else{
          alert(localStorage['status'])
        }
      }
    },1300)
    this.setState({
      createModalIsOpen: false,
      updateMatchState: false,
      sideDrawerOpen: false,
      matchModalData:{}
    });
    if(
      this.state.matchDetailState === true &&
      this.state.historyPage === false &&
      this.state.userDashboardState === false &&
      this.state.publicPageState === false
    ){
      this.refreshMatchDetail.current.refresh()
    }else{
      this.setState({updateMatchState: false})
      this.setState(this.state)
    }
  }
  refresh = ()=>{
    this.setState(this.state)
  }
  HandlerAddMatch = event => {
    this.createSetTypeRoom(this.state.matchModalData.typeroom)
    this.createSetTeamNumber(this.state.matchModalData.teamnum)
    this.createSetDepartmentNumber(this.state.matchModalData.departnum)
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/creatematch.php",
     dataType: 'json',
     data: {
       "fieldid": this.state.matchModalData.fieldid,
       "matchname": this.state.matchModalData.matchname,
       "typeroom": this.state.matchModalData.typeroom,
       "publicshow": this.state.matchModalData.publicshow,
       "tourtype"  : this.state.matchModalData.tourMode,
       "date": this.state.matchModalData.date,
       "teamnum": this.state.matchModalData.teamnum,
       "departnum": this.state.matchModalData.departnum,
       "typescore": this.state.matchModalData.typescore
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //localStorage.setItem("response",JSON.stringify(data));
       localStorage['response']=data.status;
       //console.log(data);
     }
    });
    if(localStorage['response']){
      var response = localStorage['response'];
    }
    setTimeout(this.refreshData,300);
    localStorage.clear()
  }

  HandlerLoadPublicMatch = event => {
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/loadmatchpublic.php",
     dataType: 'json',
     data: {},
     xhrFields: { withCredentials: true },
     success: function(data) {
       //console.log(data);
       localStorage['matchid'] = data.matchid;
       localStorage['matchname'] = data.matchname;
       localStorage['userhost'] = data.userhost;
       localStorage['fieldname'] = data.fieldname;
       localStorage['date'] = data.date;
       localStorage['type']=data.type;
     }
    });
    setTimeout(()=>{
      this.state.publicFromLoad=[]
      if(localStorage['matchid']){
        var matchid = localStorage['matchid'];
        var matchname = localStorage['matchname'];
        var userhost = localStorage['userhost'];
        var fieldname = localStorage['fieldname'];
        var date = localStorage['date'];
        var type = localStorage['type'];

        matchid = JSON.parse("["+matchid+"]")
        matchname = matchname.split(",",matchname.length)
        userhost= JSON.parse("["+userhost+"]")
        fieldname= fieldname.split(",",fieldname.length)
        date= date.split(",",date.length)
        type= type.split(",",type.length)

        for(var i = 0;i < matchid.length;i++){
          var obj = {
            matchid: matchid[i],
            matchname: matchname[i],
            userhost: userhost[i],
            type: type[i],
            fieldname: fieldname[i],
            date: date[i]
          }
          this.state.publicFromLoad.push(obj);
        }
        //console.log("this.state.publicFromLoad :::",this.state.publicFromLoad)
      }
      this.dashboardRefresh = false
      this.showPublicFromLoad()
    },500)
    localStorage.clear()
  }

  getResultCreateMatch=()=>{
    var result = localStorage['response'];
    return result;
  }
  CreateMatchAction=()=>{
    if(this.getResultCreateMatch()){
      alert(this.getResultCreateMatch())
      //console.log("this.getResultCreateMatch() true ::",this.getResultCreateMatch());
      //console.log(this.getResultCreateMatch());
    }else{
      alert(this.getResultCreateMatch())
      //console.log("this.getResultCreateMatch() false ::",this.getResultCreateMatch());
      //console.log(this.getResultCreateMatch());
    }
    localStorage['response']=null;
    localStorage.clear()
    this.dashboardRefresh = false
    this.setState({
      matchModalData:{}
    });
    this.props.loadMatch();
    setTimeout(this.showDataFromLoad,500);
  }
  addPeople = (PlayerName) =>{
    this.state.invitePlayer = PlayerName
  }
  sentRequestPlayer=(Data)=>{
    this.state.cardTargetData =[]
    this.state.inviteMatchID = Data.matchid
  }
  sentRequestPlayerNotOwn=(Data)=>{
    this.state.invitePlayer = Data.userhost
    this.state.inviteMatchID = Data.matchid
    /*
    console.log("this.state.inviteMatchID ",this.state.inviteMatchID);
    console.log("this.state.invitePlayer ",this.state.invitePlayer);
    console.log("this.state.inviteAction ",this.state.inviteAction);*/
    this.HanderlSendRequest()
  }
  setInviteAction =(action)=>{
    this.state.inviteAction = action
  }
  addRequestPlayer = ()=>{
    //console.log("this.props.userID ",this.props.userID);
    //console.log("this.state.invitePlayer ",this.state.invitePlayer);
    if(this.state.invitePlayer===this.state.dashUserID){
      alert("Same id please enter again")
    }else{
      this.HanderlSendRequest()
    }
  }
  getCardTargetIDEdit = (value)=>{
    this.state.currentCardData = value
    this.HandlerLoadMatchUserDetail(value)
    this.dashboardRefresh=false;
    this.updateMatchToggle(value.matchid)

  }
  getCardTargetID =(value)=>{
    this.state.currentCardData = value
    this.HandlerLoadMatchUserDetail(value)
    this.dashboardRefresh = false;
    this.matchDetailStateToggle()
  }
  getCardTargetIDPass = (value) =>{
    //console.log(value);
    this.HandlerLoadMatchUserDetail(value)
    this.dashboardRefresh=false;
    this.matchDetailStateToggle()
  }
  getRoomDetailToAccess=(Data)=>{
    this.state.roomDetailToAccess = Data
  }

  getActivityRequest = (data) =>{
    //console.log('getActivityRequest data',data)
    this.HandlerResultRequest(data)
  }
  showDataFromLoad = () => {
    if(!this.dashboardRefresh){
      this.dashboardRefresh=true;
      this.props.loadMatch()
      this.setState(this.state);
    }
  }
  showHistoryFromLoad = () => {
    if(!this.dashboardRefresh ){
      this.dashboardRefresh=true;
      this.setState(this.state);
    }
  }
  showUserLoadmatchFromLoad = () => {
    if(!this.dashboardRefresh ){
      this.dashboardRefresh = true;
      this.setState(this.state);
    }
  }
  showPublicFromLoad = () =>{
    this.publicPageToggle()
    if(!this.dashboardRefresh ){
      this.dashboardRefresh=true;
      this.setState(this.state);
    }
  }
  refresh = () =>{
    this.setState(this.state)
  }
  refreshData=()=>{
    setTimeout(()=>{
      //console.log("refresh");
      this.state.dashboardRefresh = false
      this.showUserLoadmatchFromLoad()
    },500);
  }
  userDashboardPageClick = () =>{
    this.HandleLoadUserMatch()
    setTimeout(()=>{
      this.userDashboardPageToggle()
      this.dashboardRefresh = false
      this.showDataFromLoad()
    },500);
    this.setState(()=>{{sideDrawerOpen: false};});
  }
  dashboardPageClick = ()=>{
    //console.log("dashboardPageClick");
    this.HandleLoadUserMatch()
    setTimeout(()=>{
      this.dashboardStateToggle()
      this.dashboardRefresh = false
      this.showDataFromLoad()
    },500);
    this.setState(()=>{{sideDrawerOpen: false};});
  }
  checksession = () =>{
    $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/loadsession.php",
     dataType: 'json',
     data: {},
     xhrFields: { withCredentials: true },
     success: function(data) {
       //console.log(data)
       localStorage['chk'] = data.status;
       localStorage['id'] = data.id;
       localStorage['fullname'] = data.fullname
       localStorage['lastname'] = data.lastname
      }
     });
     setTimeout(()=>{
       if(localStorage['id']){
         var chksessions = localStorage['chk'];
         var id = localStorage['id'];
         var fullname = localStorage['fullname']
         var lastname = localStorage['lastname']
         this.state.dashUserID = parseInt(id)
         //console.log(id," : ",chksessions);
         if(chksessions === 'valid session'){
           this.state.chksession = true
           this.state.chksessionFullLast = fullname + " " +lastname
         }else{
           this.state.chksession = false
         }
         }
     },300)
     localStorage.clear()
   }
   componentWillMount(){
     this.checksession()
     this.props.dashPage()
     this.HandleUserDetail()
     this.HandleLoadUserMatch()
   }
  render() {
    let backDrop;
    if(this.state.sideDrawerOpen){
      backDrop = <BackDrop click={this.backdropClickHander}/>;
    }
    this.refreshData()
    return(
      <div>
        <TopNav
          name = {this.state.chksessionFullLast}
          userID = {this.state.dashUserID}
          loadField = {this.toggleCreateModalLoad}
          drawerClickHandler = {this.drawerToggleClickHandler}
          notiClick = {this.HandlerActivityRequest}
          />
        <SideNav
          dashUserID = {this.state.dashUserID}
          notiClick = {this.sideNaveNoti}
          logOut = {this.props.logOut}
          show={this.state.sideDrawerOpen}
          click={pageClickState}
          userDashboardPageClick = {this.userDashboardPageClick}
          dashboardPageClick={this.dashboardPageClick}
          historyPageClick={this.HandlerLoadHistory}
          publicPageClick={this.HandlerLoadPublicMatch}
          lang={this.state.languageState}
          langClick={this.languageToggle}/>
        {backDrop}
        <div className="maincontent">
          <DropDown
            getActivityRequest = {this.getActivityRequest}
            activityRequest = {this.state.activityRequestMap}
            notiClick = {this.getNotiClick}
            notiState = {this.state.notiToggle} />
          {(
            this.state.matchDetailState === false &&
            this.state.historyPage === false &&
            this.state.userDashboardState === false &&
            this.state.publicPageState === false
          )?(
            (this.props.loadMatchData.length)?
            (this.props.loadMatchData.map((number,i) =>
              <Card
                data={number}
                userID={this.state.dashUserID}
                setInviteAction = {this.setInviteAction}
                sentRequestPlayerNotOwn = {this.sentRequestPlayerNotOwn}
                sentRequestPlayer={this.sentRequestPlayer}
                targetClickID={this.getCardTargetID}
                loadDetail = {this.loadDetail}
                updateMatchToggle = {this.updateMatchToggle}
                getCardTargetIDEdit = {this.getCardTargetIDEdit}
                matchDetailID = {number.matchid}
                loadMatchDetail = {this.HandlerLoadMatchUserDetail}
                getRoomDetailToAccess = {this.getRoomDetailToAccess}
                getFieldDataFromCard={this.getFieldDataFromCard}
                matchDetailClick = {this.matchDetailStateToggle}
                roomPasswordClick = {this.toggleRoomPasswordModal}
                addPeopleClick = {this.toggleAddpeopleModal}
                addScoreClick = {this.toggleAddScoreModal}
                />
            )):(
              no__match__card
            )
          ):(
            (
              this.state.matchDetailState === false &&
                this.state.historyPage === true &&
                this.state.userDashboardState === false &&
                this.state.publicPageState === false
            )?(
              (this.state.historyFromLoad.length)?
              (this.state.historyFromLoad.map((data)=>
                <HistoryCard
                  matchID = {data.matchid}
                  matchName = {data.matchname}
                  userHost = {data.userhost}
                  fieldName = {data.fieldname}
                  date = {data.date}
                  />
              )):(
                no__match__card
              )
            ):(
              (
                this.state.matchDetailState === true &&
                this.state.historyPage === false &&
                this.state.userDashboardState === false &&
                this.state.publicPageState === false
              )?(
                <MatchDetail
                  ref = {this.refreshMatchDetail}
                  userID={this.state.dashUserID}
                  userHostID = {this.state.UserHostID}
                  loadMatchDetail = {this.HandlerLoadMatchUserDetail}
                  matchDetailID = {this.state.matchDetailID}
                  matchDetailData = {this.state.matchDetailData}
                  detailMatchFromLoadField = {this.state.detailMatchFromLoadField}
                  setTeamData={this.state.setTeamData}
                  setDepartData = {this.state.setDepartData}
                  detail={this.state.detailMatchFromLoad}
                  updateMatchToggle = {this.updateMatchToggle}
                  detailUserhost={this.state.detailMatchFromLoadUserHost}
                  detailUser={this.state.detailMatchFromLoadUser}
                  tempHole = {this.state.tempHole}
                  holeScore={this.state.detailMatchFromLoadHoleScore}
                  holeScoreUserhost={this.state.detailMatchFromLoadUserHostScore}/>
              ):(
                (
                  this.state.matchDetailState === false &&
                  this.state.historyPage === false &&
                  this.state.userDashboardState === true &&
                  this.state.publicPageState === false
                )?(
                  <UserMatch
                    userProfileData = {this.state.userProfileData}
                    getCardTargetID = {this.getCardTargetID}
                    TournamentToggle = {this.TournamentToggle}
                    loadUserMatchData = {this.state.loadUserMatchData}/>
                ):(
                  (
                    this.state.matchDetailState === false &&
                    this.state.historyPage === false &&
                    this.state.userDashboardState === false &&
                    this.state.publicPageState === true
                  )?(
                    (this.state.publicFromLoad.length)?
                    (this.state.publicFromLoad.map((number,i) =>
                        <Card
                          data={number}
                          userID={this.state.dashUserID}
                          setInviteAction = {this.setInviteAction}
                          sentRequestPlayerNotOwn = {this.sentRequestPlayerNotOwn}
                          sentRequestPlayer={this.sentRequestPlayer}
                          targetClickID={this.getCardTargetID}
                          loadDetail = {this.loadDetail}
                          loadMatchDetail = {this.HandlerLoadMatchUserDetail}
                          getCardTargetIDEdit = {this.getCardTargetIDEdit}
                          updateMatchToggle = {this.updateMatchToggle}
                          matchDetailID = {this.state.matchDetailID}
                          getRoomDetailToAccess = {this.getRoomDetailToAccess}
                          getFieldDataFromCard={this.getFieldDataFromCard}
                          matchDetailClick = {this.matchDetailStateToggle}
                          roomPasswordClick = {this.toggleRoomPasswordModal}
                          addPeopleClick = {this.toggleAddpeopleModal}
                          addScoreClick = {this.toggleAddScoreModal}
                          />
                      )):(
                        no__match__card
                      )
                  ):(null)
                )
              )
            )
          )}
        </div>
        <ModalRoomPassword
          getCardTargetIDPass = {this.getCardTargetIDPass}
          roomDetailToAccess = {this.state.roomDetailToAccess}
          modalClick = {this.toggleRoomPasswordModal}
          modalState = {this.state.roomPasswordModal} />
        <ModalAddScore
          firstFieldScore = {this.state.addScoreFieldScoreFirst}
          lastFieldScore = {this.state.addScoreFieldScoreLast}
          modalClick = {this.toggleAddScoreModal}
          calculateScore = {this.calculateScore}
          modalState = {this.state.addscoreModalIsOpen} />
        <ModalAddPeople
          addPeople = {this.addPeople}
          addRequestPlayer = {this.addRequestPlayer}
          matchTeamNumber = {this.state.matchModalData.MatchTeamNumber}
          modalClick = {this.toggleAddpeopleModal}
          modalState = {this.state.addpeopleModalIsOpen} />
        <ModalCreateMatch
          refresh = {this.refresh}
          loadField = {this.HandlerLoadField}
          addMatch = {this.HandlerAddMatch}
          updateMatchState = {this.state.updateMatchState}
          updateMatch = {this.HandlerUpdateMatch}
          updateMatchMatchid = {this.state.updateMatchMatchid}

          modalClick = {this.toggleCreateModal}
          createSetFieldId = {this.createSetFieldId}
          createSetMatchName = {this.createSetMatchName}
          createSetTypeRoom = {this.createSetTypeRoom}
          createSetDate = {this.createSetDate}
          createSetTeamNumber = {this.createSetTeamNumber}
          createSetDepartmentNumber = {this.createSetDepartmentNumber}
          createSetTypeScore = {this.createSetTypeScore}

          publicShow = {this.createSetPublicShow}
          tourMode = {this.createSetTourMode}
          fieldDetail = {this.state.fieldFromLoad}
          customFieldDetail = {this.state.customFieldFromLoad}
          customFieldDetailScore = {this.state.customFieldFromLoadHoleScore}
          matchModalData = {this.state.matchModalData}
          modalClose = {this.closeCreateMatchModal}
          modalState = {this.state.createModalIsOpen}/>
      </div>
    );
  }
}

const no__match__card = (
  <div className="no__match">
    <div className="spacer"></div>
    <div className="no__match__grid">
      <div className="spacer"></div>
      <div className="no__match__card">
        <div className="spacer"></div>
        <div className="no__match__card__grid">
          <div className="spacer"></div>
          <div className="no__match__card__content">
            No match available
          </div>
          <div className="spacer"></div>
        </div>
        <div className="spacer"></div>
      </div>
      <div className="spacer"></div>
    </div>
    <div className="spacer"></div>
  </div>
)
export default Dashboard;
