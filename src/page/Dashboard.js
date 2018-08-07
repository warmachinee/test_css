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
      sideDrawerOpen: false,
      notiToggle: false,
      languageState: false,
      matchDetailState: false,
      matchRunningState: false,
      historyPage: false,
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
      activityRequest:[],
      activityRequestMap:[],
      dataFromLoad:[],
      UserID:'',
      matchModalData:{
        fieldid:'',
        matchname:'',
        typeroom:'',
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
        matchRunningState: false
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
        matchRunningState: true
      };
    });
  };
  dashboardStateToggle = () =>{
    this.drawerToggleClickHandler()

    this.setState((prevState)=>{
      return {
        historyPage: false,
        matchDetailState: false,
        matchRunningState: false
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
  createSetFieldId=(fieldid)=>{
    this.state.matchModalData.fieldid = fieldid
  }
  createSetMatchName=(matchname)=>{
    this.state.matchModalData.matchname = matchname
  }
  createSetTypeRoom=(typeroom)=>{
    if(typeroom === "" || typeroom === null){
      this.state.matchModalData.typeroom = 0
    }else{
      this.state.matchModalData.typeroom = typeroom
    }
  }
  createSetDate=(date)=>{
    this.state.matchModalData.date = date
  }
  createSetTeamNumber=(teamnum)=>{
    if(teamnum < 1 || teamnum === "" || teamnum === null){
      this.state.matchModalData.teamnum = 0
    }
    else{
      this.state.matchModalData.teamnum = teamnum
    }

  }
  createSetDepartmentNumber=(departnum)=>{
    if(departnum <= 0 || departnum === "" || departnum === null){
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
    console.log("Score ::",data);
    console.log("MatchID ::",this.state.calScoreMatchID.matchid);
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
      if(localStorage['response']){
        console.log(localStorage['response']);
        this.toggleAddScoreModal()
        this.state.calScoreMatchID = ''
      }

    },1000)
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

  HandlerLoadField = event => {
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
        //console.log(fieldid);
        //console.log(fieldname);
        //console.log(cordnum);
        for(var i = 0;i < fieldid.length;i++){
          var obj = {
            fieldid: fieldid[i],
            fieldname: fieldname[i],
            cordnum: cordnum[i],
          }
          this.state.fieldFromLoad.push(obj);
        }
        //console.log("this.state.fieldFromLoad.push(obj) :::",this.state.fieldFromLoad)
        //this.setState({dataLength: this.state.fieldFromLoad.length})//-------
      }
      this.toggleCreateModal()
    },1500)
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
    },1500)
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
    },1500)
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
    setTimeout(this.CreateMatchAction,1000);
  }

  //HandlerActivity
  getResultCreateMatch=()=>{
    var result = localStorage['response'];
    return result;
    //return 'Success'
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
    setTimeout(this.showDataFromLoad,1500);
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
    console.log("this.props.userID ",this.props.userID);
    console.log("this.state.invitePlayer ",this.state.invitePlayer);
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
      for(var i = 0;i < this.props.loadMatchData.length ;i++){
        //console.log(i)
        this.state.dataFromLoad.push(this.props.loadMatchData[i]);
        console.log('this.state.dataFromLoad in for::',this.state.dataFromLoad);
      }
      //console.log('this.state.dataFromLoad after set::',this.state.dataFromLoad);
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
      console.log('showRunningFromLoad');
      this.setState(this.state);
    }
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
      this.state.matchRunningState === false){
      setTimeout(this.showDataFromLoad,1000);
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
            dashboardPageClick={this.dashboardStateToggle}
            historyPageClick={this.HandlerLoadHistory}
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
                  getCalScoreMatchID={this.getCalScoreMatchID}
                  matchDetailClick = {this.matchDetailStateToggle}
                  addPeopleClick = {this.toggleAddpeopleModal}
                  addScoreClick = {this.toggleAddScoreModal}
                  />
              )}
          </div>
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
    //----------History----------
    else if(this.state.matchDetailState === false &&
      this.state.historyPage === true &&
      this.state.matchRunningState === false){
      setTimeout(this.showHistoryFromLoad,1000);
      console.log("this.state.historyFromLoad",this.state.historyFromLoad)
      return(
        <div>
          <TopNav
            loadField = {this.HandlerLoadField}
            drawerClickHandler = {this.drawerToggleClickHandler}
            />
          <SideNav
            logOut = {this.props.logOut}
            show={this.state.sideDrawerOpen}
            click={pageClickState}
            runningPageClick={this.HandlerLoadRunning}
            dashboardPageClick={this.dashboardStateToggle}
            historyPageClick={this.HandlerLoadHistory}
            lang={this.state.languageState}
            langClick={this.languageToggle}/>
          {backDrop}
          <div className="maincontent">
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
          <ModalAddScore
            modalClick = {this.toggleAddScoreModal}
            modalState = {this.state.addscoreModalIsOpen} />
          <ModalAddPeople
            addPeople = {this.addPeople}
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
    //----------Detail----------
    else if(
      this.state.matchDetailState === true &&
      this.state.historyPage === false &&
      this.state.matchRunningState === false){
      this.dashboardRefresh=false;
      setTimeout(this.showDataFromLoad,1000);
      console.log('sentCardTargetID ::',this.props.sentCardTargetID)
      return(
        <div>
          <TopNav
            drawerClickHandler = {this.drawerToggleClickHandler}/>
          <SideNav
            show={this.state.sideDrawerOpen}
            click={pageClickState}
            lang={this.state.languageState}
            langClick={this.languageToggle}/>
          {backDrop}
          <div className="maincontent">
            <p>{"this is content"}</p>
            <p>{this.state.data.MatchName}</p>
            <p>{this.state.data.MatchDate}</p>
          </div>
          <ModalAddPeople
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
    //----------Running----------
    else if(
      this.state.matchDetailState === false &&
      this.state.historyPage === false &&
      this.state.matchRunningState === true ){
        setTimeout(this.showRunningFromLoad,1000);
        //console.log("RunningFromLoad ::",this.state.runningFromLoad)
      return(
        <div>
          <TopNav
            loadField = {this.HandlerLoadField}
            drawerClickHandler = {this.drawerToggleClickHandler}
            />
          <SideNav
            logOut = {this.props.logOut}
            show={this.state.sideDrawerOpen}
            click={pageClickState}
            runningPageClick={this.HandlerLoadRunning}
            dashboardPageClick={this.dashboardStateToggle}
            historyPageClick={this.HandlerLoadHistory}
            lang={this.state.languageState}
            langClick={this.languageToggle}/>
          {backDrop}
          <div className="maincontent">
            {this.state.runningFromLoad.map((data)=>
                <Card
                  data={data}
                  targetClickID={this.getCardTargetID}
                  loadDetail = {this.loadDetail}
                  matchDetailClick = {this.matchDetailStateToggle}
                  addPeopleClick = {this.toggleAddpeopleModal}
                  addScoreClick = {this.toggleAddScoreModal}
                  />
            )}
          </div>
          <ModalAddScore
            modalClick = {this.toggleAddScoreModal}
            modalState = {this.state.addscoreModalIsOpen} />
          <ModalAddPeople
            addPeople = {this.addPeople}
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
