import React, { Component } from 'react';
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

const pageClickState = props =>{
  return (props.pageDashboardClick);
}
class Dashboard extends Component {
  constructor(props){
    super(props)
    this.dashboardRefresh = false;
    this.state = {
      createModalIsOpen: false,
      addpeopleModalIsOpen: false,
      addscoreModalIsOpen: false,
      roomPasswordModal:false,
      sideDrawerOpen: false,
      notiToggle: false,
      languageState: false,
      matchDetailState: false,
      matchRunningState: false,
      historyPage: false,
      publicPageState:false,
      createMatchStatus:'',
      data:[],
      dataLength:0,
      fieldFromLoad:[],
      cardTargetData:[{
        matchid:'',
        userTarget:'',
        action:''
      }],
      historyFromLoad:[],
      runningFromLoad:[],
      publicFromLoad:[],
      activityRequest:[],
      activityRequestMap:[],
      roomDetailToAccess:[],
      dataFromLoad:[],
      UserID:'',
      matchModalData:{
        fieldid:'',
        matchname:'',
        typeroom:'',
        publicshow:'',
        date:'',
        teamnum:'',
        departnum:'',
      },
      invitePlayer:'',
      inviteMatchID:'',
      inviteAction:'',
      calScoreMatchID:''
    }
  };
  historyPageToggle = () =>{
    this.drawerToggleClickHandler()
    this.setState((prevState)=>{
      return {
        historyPage: true,
        matchDetailState: false,
        matchRunningState: false,
        publicPageState: false
      };
    });
  };
  runningPageToggle = () =>{
    this.drawerToggleClickHandler()
    console.log("Running match")
    this.setState((prevState)=>{
      return {
        historyPage: false,
        matchDetailState: false,
        matchRunningState: true,
        publicPageState: false
      };
    });
  };
  publicPageToggle = () =>{
    this.drawerToggleClickHandler()
    console.log("Running match")
    this.setState((prevState)=>{
      return {
        historyPage: false,
        matchDetailState: false,
        matchRunningState: false,
        publicPageState: true
      };
    });
  };
  dashboardStateToggle = () =>{
    this.drawerToggleClickHandler()
    this.setState((prevState)=>{
      return {
        historyPage: false,
        matchDetailState: false,
        matchRunningState: false,
        publicPageState: false
    };
    });
  }
  matchDetailStateToggle = (data) =>{
    console.log(data)
    /*
    this.setState((prevState)=>{
      return {
        historyPage: false,
        matchDetailState: true
    };
    });*/
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
    //console.log("this.state.getActivityRequest ::",this.state.activityRequestMap);
    this.setState((prev)=>{
      return{notiToggle: !prev.notiToggle}
    });
  };
  backdropClickHander = () =>{
    this.setState({sideDrawerOpen: false});
  };
  toggleCreateModal = () => {
    this.setState((state)=>{
      return {createModalIsOpen: !state.createModalIsOpen}
    });
  }
  closeCreateMatchModal = () =>{
    this.setState({
      createModalIsOpen: false,
      matchModalData:{}
    });
  }
  toggleAddpeopleModal = () => {
    this.setState((state)=>{
      return {addpeopleModalIsOpen: !state.addpeopleModalIsOpen}
    });
  }
  getCalScoreMatchID=(MatchID)=>{
    this.state.calScoreMatchID = MatchID
  }
  getRoomDetailToAccess=(Data)=>{
    this.state.roomDetailToAccess = Data
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

  HandlerResultRequest = (data) => {
    var geturl;
    geturl = $.ajax({
      type: "POST",
     //url: "http://127.0.0.1/php/login.php",
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
       console.log(data);
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

  HandlerActivityRequest = event =>{
    this.state.activityRequest = []
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/activityrequest.php",
     dataType: 'json',
     data: {},
     xhrFields: { withCredentials: true },
     success: function(data) {
       console.log(data);
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

        //this.setState({dataLength: this.state.fieldFromLoad.length})//-------
      }
      //console.log("this.state.activityRequest :::",this.state.activityRequest)
      this.getNotiClick()
      //this.historyPageToggle()
      //this.dashboardRefresh = false
      //this.showHistoryFromLoad()
    },1500)
    localStorage.clear()
  }

  HandlerUpdateScore = (data) =>{
    var geturl;
    geturl = $.ajax({
      type: "POST",
     //url: "http://127.0.0.1/php/login.php",
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
       console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['response']==='success'){
        console.log(localStorage['response']);
        this.setState({addscoreModalIsOpen: false})
        this.state.calScoreMatchID = ''
      }else{
        alert(localStorage['response'])
      }
    },500)
    localStorage.clear()
  }

  HanderlSendRequest = event =>{
    console.log("this.state.inviteMatchID ",this.state.inviteMatchID);
    console.log("this.state.invitePlayer ",this.state.invitePlayer);
    console.log("this.state.inviteAction ",this.state.inviteAction);
    var geturl;
    geturl = $.ajax({
      type: "POST",
     //url: "http://127.0.0.1/php/login.php",
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
       console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['response']){
        console.log(localStorage['response']);
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
    console.log("Click HandlerLoadField");
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
      this.toggleCreateModal()
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
       console.log(data);
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
        //console.log(fieldid);
        //console.log(fieldname);
        //console.log(cordnum);
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
        //console.log("this.state.historyFromLoad.push(obj) :::",this.state.historyFromLoad)
        //this.setState({dataLength: this.state.fieldFromLoad.length})//-------
      }
      this.historyPageToggle()
      this.dashboardRefresh = false
      this.showHistoryFromLoad()
    },500)
    localStorage.clear()
  }

  HandlerLoadRunning = event => {
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/loadmatchrunning.php",
     dataType: 'json',
     data: {},
     xhrFields: { withCredentials: true },
     success: function(data) {
       console.log(data);
       localStorage['matchid'] = data.matchid;
       localStorage['matchname'] = data.matchname;
       localStorage['userhost'] = data.userhost;
       localStorage['fieldname'] = data.fieldname;
       localStorage['date'] = data.date;
     }
    });
    setTimeout(()=>{
      this.state.runningFromLoad=[]
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
          this.state.runningFromLoad.push(obj);
        }
        console.log("this.state.runningFromLoad.push(obj) :::",this.state.runningFromLoad)
        //this.setState({dataLength: this.state.fieldFromLoad.length})//-------
      }
      this.runningPageToggle()
      this.dashboardRefresh = false
      this.showRunningFromLoad()
    },500)
    localStorage.clear()
  }

  HandlerAddMatch = event => {
    this.createSetTypeRoom(this.state.matchModalData.typeroom)
    this.createSetTeamNumber(this.state.matchModalData.teamnum)
    this.createSetDepartmentNumber(this.state.matchModalData.departnum)
    console.log("in HandlerAddMatch :::",this.state.matchModalData);
    var geturl;
    geturl = $.ajax({
      type: "POST",
     //url: "http://127.0.0.1/php/login.php",
     url: "http://pds.in.th/phpadmin/creatematch.php",
     dataType: 'json',
     data: {
       "fieldid": this.state.matchModalData.fieldid,
       "matchname": this.state.matchModalData.matchname,
       "typeroom": this.state.matchModalData.typeroom,
       "publicshow": this.state.matchModalData.publicshow,
       "date": this.state.matchModalData.date,
       "teamnum": this.state.matchModalData.teamnum,
       "departnum": this.state.matchModalData.departnum,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //localStorage.setItem("response",JSON.stringify(data));
       localStorage['response']=data.status;
       console.log(data);
     }
    });
    if(localStorage['response']){
      var response = localStorage['response'];
      this.setState({createMatchStatus: response});
    }
    //setTimeout(this.CreateMatchAction,1000);
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
       console.log(data);
       localStorage['matchid'] = data.matchid;
       localStorage['matchname'] = data.matchname;
       localStorage['userhost'] = data.userhost;
       localStorage['fieldname'] = data.fieldname;
       localStorage['date'] = data.date;
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
          this.state.publicFromLoad.push(obj);
        }
        console.log("this.state.publicFromLoad :::",this.state.publicFromLoad)
      }
      this.publicPageToggle()
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
      console.log("this.getResultCreateMatch() true ::",this.getResultCreateMatch());
      console.log(this.getResultCreateMatch());
    }else{
      alert(this.getResultCreateMatch())
      console.log("this.getResultCreateMatch() false ::",this.getResultCreateMatch());
      console.log(this.getResultCreateMatch());
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
  getCardTargetData=(Data)=>{

    console.log("getCardTargetData ::",Data);
    console.log("this.state.cardTargetData before:::",this.state.cardTargetData);
    console.log("Data.invitePlayer :::",this.state.invitePlayer)

    console.log("invitePlayer ::",this.state.cardTargetData)
  }
  sentRequestPlayer=(Data)=>{
    this.state.cardTargetData =[]
    this.state.inviteMatchID = Data.matchid
  }
  sentRequestPlayerNotOwn=(Data)=>{
    this.state.invitePlayer = Data.userhost
    this.state.inviteMatchID = Data.matchid
    console.log("this.state.inviteMatchID ",this.state.inviteMatchID);
    console.log("this.state.invitePlayer ",this.state.invitePlayer);
    console.log("this.state.inviteAction ",this.state.inviteAction);
    this.HanderlSendRequest()
  }
  setInviteAction =(action)=>{
    this.state.inviteAction = action
  }
  addRequestPlayer = ()=>{
    //console.log("this.props.userID ",this.props.userID);
    //console.log("this.state.invitePlayer ",this.state.invitePlayer);
    if(this.state.invitePlayer===this.props.userID){
      alert("Same id please enter again")
    }else{
      this.HanderlSendRequest()
    }
    //
    /*this.state.invitePlayer = ''
    this.state.inviteMatchID = ''
    this.state.inviteAction = ''*/
  }
  getCardTargetID =(value)=>{
    this.props.getCardTargetID(value)
    console.log("Detail Data:: ",value)
  }
  getActivityRequest = (data) =>{
    console.log('getActivityRequest data',data)
    this.HandlerResultRequest(data)
  }
  showDataFromLoad = () => {
    if(!this.dashboardRefresh ){
      this.dashboardRefresh=true;
      this.state.dataFromLoad=[]
      this.props.loadMatch()
      for(var i = 0;i < this.props.loadMatchData.length ;i++){
        //console.log(i)
        this.state.dataFromLoad.push(this.props.loadMatchData[i]);
      }
      console.log('this.state.dataFromLoad after set::',this.state.dataFromLoad);
      this.setState(this.state);
    }
  }
  showHistoryFromLoad = () => {
    if(!this.dashboardRefresh ){
      this.dashboardRefresh=true;
      console.log('showHistoryFromLoad');
      this.setState(this.state);
    }
  }
  showRunningFromLoad = () => {
    if(!this.dashboardRefresh ){
      this.dashboardRefresh=true;
      this.setState(this.state);
    }
  }
  showPublicFromLoad = () =>{
    if(!this.dashboardRefresh ){
      this.dashboardRefresh=true;
      this.setState(this.state);
    }
  }

  refreshData=()=>{
    setTimeout(()=>{
      console.log("refresh");
      this.state.dashboardRefresh = false
      this.showDataFromLoad()
    },500);
  }
  dashboardPageClick = ()=>{
    console.log("dashboardPageClick");
    this.props.loadMatch();
    setTimeout(()=>{
      this.dashboardStateToggle()
      this.dashboardRefresh = false
      this.showDataFromLoad()
    },500);
    this.setState(()=>{{sideDrawerOpen: false};});
  }
  render() {
    let backDrop;
    if(this.state.sideDrawerOpen){
      backDrop = <BackDrop click={this.backdropClickHander}/>;
    }
    //----------Dashboard----------
    if(
      this.state.matchDetailState === false &&
      this.state.historyPage === false &&
      this.state.matchRunningState === false &&
      this.state.publicPageState === false)
      {
      this.refreshData()
      return(
        <div>
          <TopNav
            userID = {this.props.userID}
            loadField = {this.HandlerLoadField}
            drawerClickHandler = {this.drawerToggleClickHandler}
            notiClick = {this.HandlerActivityRequest}
            />
          <SideNav
            notiClick = {this.sideNaveNoti}
            logOut = {this.props.logOut}
            show={this.state.sideDrawerOpen}
            click={pageClickState}
            runningPageClick={this.HandlerLoadRunning}
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
              notiState = {this.state.notiToggle} />
              {this.props.loadMatchData.map((number,i) =>
                <Card
                  data={number}
                  userID={this.props.userID}
                  setInviteAction = {this.setInviteAction}
                  sentRequestPlayerNotOwn = {this.sentRequestPlayerNotOwn}
                  sentRequestPlayer={this.sentRequestPlayer}
                  getCardTargetData={this.getCardTargetData}
                  targetClickID={this.getCardTargetID}
                  loadDetail = {this.loadDetail}
                  getRoomDetailToAccess = {this.getRoomDetailToAccess}
                  getCalScoreMatchID={this.getCalScoreMatchID}
                  matchDetailClick = {this.matchDetailStateToggle}
                  roomPasswordClick = {this.toggleRoomPasswordModal}
                  addPeopleClick = {this.toggleAddpeopleModal}
                  addScoreClick = {this.toggleAddScoreModal}
                  />
              )}
          </div>
          <ModalRoomPassword
            roomDetailToAccess = {this.state.roomDetailToAccess}
            modalClick = {this.toggleRoomPasswordModal}
            modalState = {this.state.roomPasswordModal} />
          <ModalAddScore
            closeAddScoreModal = {this.toggleAddScoreModal}
            calculateScore = {this.calculateScore}
            modalState = {this.state.addscoreModalIsOpen} />
          <ModalAddPeople
            addPeople = {this.addPeople}
            addRequestPlayer = {this.addRequestPlayer}
            matchTeamNumber = {this.state.matchModalData.MatchTeamNumber}
            modalClick = {this.toggleAddpeopleModal}
            modalState = {this.state.addpeopleModalIsOpen} />

          <ModalCreateMatch
            addMatch = {this.HandlerAddMatch}
            modalClick = {this.toggleCreateModal}
            createSetFieldId = {this.createSetFieldId}
            createSetMatchName = {this.createSetMatchName}
            createSetTypeRoom = {this.createSetTypeRoom}
            createSetDate = {this.createSetDate}
            createSetTeamNumber = {this.createSetTeamNumber}
            createSetDepartmentNumber = {this.createSetDepartmentNumber}

            publicShow = {this.createSetPublicShow}
            fieldDetail = {this.state.fieldFromLoad}
            matchModalData = {this.state.matchModalData}
            modalClose = {this.closeCreateMatchModal}
            modalState = {this.state.createModalIsOpen}/>
        </div>
      );
    }


    //----------History----------
    else if(this.state.matchDetailState === false &&
      this.state.historyPage === true &&
      this.state.matchRunningState === false &&
      this.state.publicPageState === false){
      this.refreshData()
      return(
        <div>
          <TopNav
            userID = {this.props.userID}
            loadField = {this.HandlerLoadField}
            drawerClickHandler = {this.drawerToggleClickHandler}
            notiClick = {this.HandlerActivityRequest}
            />
          <SideNav
            notiClick = {this.sideNaveNoti}
            logOut = {this.props.logOut}
            show={this.state.sideDrawerOpen}
            click={pageClickState}
            runningPageClick={this.HandlerLoadRunning}
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
              notiState = {this.state.notiToggle} />
              {this.state.historyFromLoad.map((data)=>
                <HistoryCard
                  matchID = {data.matchid}
                  matchName = {data.matchname}
                  userHost = {data.userhost}
                  fieldName = {data.fieldname}
                  date = {data.date}
                  />
              )}
          </div>
          <ModalRoomPassword
            roomDetailToAccess = {this.state.roomDetailToAccess}
            modalClick = {this.toggleRoomPasswordModal}
            modalState = {this.state.roomPasswordModal} />
          <ModalAddScore
            closeAddScoreModal = {this.toggleAddScoreModal}
            calculateScore = {this.calculateScore}
            modalState = {this.state.addscoreModalIsOpen} />
          <ModalAddPeople
            addPeople = {this.addPeople}
            addRequestPlayer = {this.addRequestPlayer}
            matchTeamNumber = {this.state.matchModalData.MatchTeamNumber}
            modalClick = {this.toggleAddpeopleModal}
            modalState = {this.state.addpeopleModalIsOpen} />

          <ModalCreateMatch
            addMatch = {this.HandlerAddMatch}
            modalClick = {this.toggleCreateModal}
            createSetFieldId = {this.createSetFieldId}
            createSetMatchName = {this.createSetMatchName}
            createSetTypeRoom = {this.createSetTypeRoom}
            createSetDate = {this.createSetDate}
            createSetTeamNumber = {this.createSetTeamNumber}
            createSetDepartmentNumber = {this.createSetDepartmentNumber}

            publicShow = {this.createSetPublicShow}
            fieldDetail = {this.state.fieldFromLoad}
            matchModalData = {this.state.matchModalData}
            modalClose = {this.closeCreateMatchModal}
            modalState = {this.state.createModalIsOpen}/>
        </div>
      );
    }
    //----------Detail----------
    else if(
      this.state.matchDetailState === true &&
      this.state.historyPage === false &&
      this.state.matchRunningState === false &&
      this.state.publicPageState === false){
      this.dashboardRefresh=false;
      this.refreshData()
      console.log('sentCardTargetID ::',this.props.sentCardTargetID)
      return(
        <div>
          <TopNav
            userID = {this.props.userID}
            loadField = {this.HandlerLoadField}
            drawerClickHandler = {this.drawerToggleClickHandler}
            notiClick = {this.HandlerActivityRequest}
            />
          <SideNav
            notiClick = {this.sideNaveNoti}
            logOut = {this.props.logOut}
            show={this.state.sideDrawerOpen}
            click={pageClickState}
            runningPageClick={this.HandlerLoadRunning}
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
              notiState = {this.state.notiToggle} />

          </div>
          <ModalRoomPassword
            roomDetailToAccess = {this.state.roomDetailToAccess}
            modalClick = {this.toggleRoomPasswordModal}
            modalState = {this.state.roomPasswordModal} />
          <ModalAddScore
            closeAddScoreModal = {this.toggleAddScoreModal}
            calculateScore = {this.calculateScore}
            modalState = {this.state.addscoreModalIsOpen} />
          <ModalAddPeople
            addPeople = {this.addPeople}
            addRequestPlayer = {this.addRequestPlayer}
            matchTeamNumber = {this.state.matchModalData.MatchTeamNumber}
            modalClick = {this.toggleAddpeopleModal}
            modalState = {this.state.addpeopleModalIsOpen} />

          <ModalCreateMatch
            addMatch = {this.HandlerAddMatch}
            modalClick = {this.toggleCreateModal}
            createSetFieldId = {this.createSetFieldId}
            createSetMatchName = {this.createSetMatchName}
            createSetTypeRoom = {this.createSetTypeRoom}
            createSetDate = {this.createSetDate}
            createSetTeamNumber = {this.createSetTeamNumber}
            createSetDepartmentNumber = {this.createSetDepartmentNumber}

            publicShow = {this.createSetPublicShow}
            fieldDetail = {this.state.fieldFromLoad}
            matchModalData = {this.state.matchModalData}
            modalClose = {this.closeCreateMatchModal}
            modalState = {this.state.createModalIsOpen}/>
        </div>
      );
    }
    //----------Running----------
    else if(
      this.state.matchDetailState === false &&
      this.state.historyPage === false &&
      this.state.matchRunningState === true &&
      this.state.publicPageState === false){
        this.refreshData()
        //console.log("RunningFromLoad ::",this.state.runningFromLoad)
      return(
        <div>
          <TopNav
            userID = {this.props.userID}
            loadField = {this.HandlerLoadField}
            drawerClickHandler = {this.drawerToggleClickHandler}
            notiClick = {this.HandlerActivityRequest}
            />
          <SideNav
            notiClick = {this.sideNaveNoti}
            logOut = {this.props.logOut}
            show={this.state.sideDrawerOpen}
            click={pageClickState}
            runningPageClick={this.HandlerLoadRunning}
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
              notiState = {this.state.notiToggle} />
            {this.state.runningFromLoad.map((number,i) =>
                <Card
                  data={number}
                  userID={this.props.userID}
                  setInviteAction = {this.setInviteAction}
                  sentRequestPlayerNotOwn = {this.sentRequestPlayerNotOwn}
                  sentRequestPlayer={this.sentRequestPlayer}
                  getCardTargetData={this.getCardTargetData}
                  targetClickID={this.getCardTargetID}
                  loadDetail = {this.loadDetail}
                  getRoomDetailToAccess = {this.getRoomDetailToAccess}
                  getCalScoreMatchID={this.getCalScoreMatchID}
                  matchDetailClick = {this.matchDetailStateToggle}
                  roomPasswordClick = {this.toggleRoomPasswordModal}
                  addPeopleClick = {this.toggleAddpeopleModal}
                  addScoreClick = {this.toggleAddScoreModal}
                  />
              )}
          </div>
          <ModalRoomPassword
            roomDetailToAccess = {this.state.roomDetailToAccess}
            modalClick = {this.toggleRoomPasswordModal}
            modalState = {this.state.roomPasswordModal} />
          <ModalAddScore
            closeAddScoreModal = {this.toggleAddScoreModal}
            calculateScore = {this.calculateScore}
            modalState = {this.state.addscoreModalIsOpen} />
          <ModalAddPeople
            addPeople = {this.addPeople}
            addRequestPlayer = {this.addRequestPlayer}
            matchTeamNumber = {this.state.matchModalData.MatchTeamNumber}
            modalClick = {this.toggleAddpeopleModal}
            modalState = {this.state.addpeopleModalIsOpen} />

          <ModalCreateMatch
            addMatch = {this.HandlerAddMatch}
            modalClick = {this.toggleCreateModal}
            createSetFieldId = {this.createSetFieldId}
            createSetMatchName = {this.createSetMatchName}
            createSetTypeRoom = {this.createSetTypeRoom}
            createSetDate = {this.createSetDate}
            createSetTeamNumber = {this.createSetTeamNumber}
            createSetDepartmentNumber = {this.createSetDepartmentNumber}

            publicShow = {this.createSetPublicShow}
            fieldDetail = {this.state.fieldFromLoad}
            matchModalData = {this.state.matchModalData}
            modalClose = {this.closeCreateMatchModal}
            modalState = {this.state.createModalIsOpen}/>
        </div>
      );
    }
    //----------Public----------
    else if(
      this.state.matchDetailState === false &&
      this.state.historyPage === false &&
      this.state.matchRunningState === false &&
      this.state.publicPageState === true){
        this.refreshData()
        return(
          <div>
            <TopNav
              userID = {this.props.userID}
              loadField = {this.HandlerLoadField}
              drawerClickHandler = {this.drawerToggleClickHandler}
              notiClick = {this.HandlerActivityRequest}
              />
            <SideNav
              notiClick = {this.sideNaveNoti}
              logOut = {this.props.logOut}
              show={this.state.sideDrawerOpen}
              click={pageClickState}
              runningPageClick={this.HandlerLoadRunning}
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
                notiState = {this.state.notiToggle} />
              {this.state.publicFromLoad.map((number,i) =>
                  <Card
                    data={number}
                    userID={this.props.userID}
                    setInviteAction = {this.setInviteAction}
                    sentRequestPlayerNotOwn = {this.sentRequestPlayerNotOwn}
                    sentRequestPlayer={this.sentRequestPlayer}
                    getCardTargetData={this.getCardTargetData}
                    targetClickID={this.getCardTargetID}
                    loadDetail = {this.loadDetail}
                    getRoomDetailToAccess = {this.getRoomDetailToAccess}
                    getCalScoreMatchID={this.getCalScoreMatchID}
                    matchDetailClick = {this.matchDetailStateToggle}
                    roomPasswordClick = {this.toggleRoomPasswordModal}
                    addPeopleClick = {this.toggleAddpeopleModal}
                    addScoreClick = {this.toggleAddScoreModal}
                    />
                )}
            </div>
            <ModalRoomPassword
              roomDetailToAccess = {this.state.roomDetailToAccess}
              modalClick = {this.toggleRoomPasswordModal}
              modalState = {this.state.roomPasswordModal} />
            <ModalAddScore
              closeAddScoreModal = {this.toggleAddScoreModal}
              calculateScore = {this.calculateScore}
              modalState = {this.state.addscoreModalIsOpen} />
            <ModalAddPeople
              addPeople = {this.addPeople}
              addRequestPlayer = {this.addRequestPlayer}
              matchTeamNumber = {this.state.matchModalData.MatchTeamNumber}
              modalClick = {this.toggleAddpeopleModal}
              modalState = {this.state.addpeopleModalIsOpen} />

            <ModalCreateMatch
              addMatch = {this.HandlerAddMatch}
              modalClick = {this.toggleCreateModal}
              createSetFieldId = {this.createSetFieldId}
              createSetMatchName = {this.createSetMatchName}
              createSetTypeRoom = {this.createSetTypeRoom}
              createSetDate = {this.createSetDate}
              createSetTeamNumber = {this.createSetTeamNumber}
              createSetDepartmentNumber = {this.createSetDepartmentNumber}

              fieldDetail = {this.state.fieldFromLoad}
              matchModalData = {this.state.matchModalData}
              modalClose = {this.closeCreateMatchModal}
              modalState = {this.state.createModalIsOpen}/>
          </div>
        );
      }
  }
}

export default Dashboard;
