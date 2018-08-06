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
      languageState: false,
      matchDetailState: false,
      createMatchStatus:'',
      data:[],
      dataLength:0,
      fieldFromLoad:[],
      dataFromLoad:[],
      matchModalData:{
        fieldid:'',
        matchname:'',
        typeroom:'',
        date:'',
        teamnum:'',
        departnum:'',
      },
      PlayerInMatch:{
        playerName:''
      },
    }
  };
  matchDetailStateToggle = () =>{
    this.setState((prevState)=>{
      return {matchDetailState: !prevState.matchDetailState};
    });
  };
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
  toggleAddScoreModal = () => {
    this.setState((state)=>{
      return {addscoreModalIsOpen: false}
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
    if(teamnum <= 0 || teamnum === "" || teamnum === null){
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



  HandlerAddMatch = event => {
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
  getResultCreateMatch=()=>{
    var result = localStorage['response'];
    return result;
    //return 'Success'
  }
  CreateMatchAction=()=>{
    if(this.getResultCreateMatch()){
      alert("this.getResultCreateMatch() true ::",this.getResultCreateMatch())
      console.log("this.getResultCreateMatch() true ::",this.getResultCreateMatch());
      console.log(this.getResultCreateMatch());
    }else{
      alert("this.getResultCreateMatch() false ::",this.getResultCreateMatch())
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
    this.state.PlayerInMatch.playerName = PlayerName
  }

  getCardTargetID =(value)=>{
    this.props.getCardTargetID(value)
    console.log("Detail :: ID",value)
  }
  showDataFromLoad = () => {
    if(!this.dashboardRefresh ){
      this.dashboardRefresh=true;
      this.state.dataFromLoad=[]
      for(var i = 0;i < this.props.loadMatchData.length ;i++){
        //console.log(i)
        this.state.dataFromLoad.push(this.props.loadMatchData[i]);
        //console.log('this.state.dataFromLoad in for::',this.state.dataFromLoad);
      }
      //console.log('this.state.dataFromLoad after set::',this.state.dataFromLoad);
      this.setState(this.state);
    }
  }
  render() {
    let backDrop;
    if(this.state.sideDrawerOpen){
      backDrop = <BackDrop click={this.backdropClickHander}/>;
    }
    if(!this.state.matchDetailState){
      setTimeout(this.showDataFromLoad,1000);
      return(
        <div>
          <TopNav
            loadField = {this.HandlerLoadField}
            drawerClickHandler = {this.drawerToggleClickHandler}
            />
          <SideNav
            show={this.state.sideDrawerOpen}
            click={pageClickState}
            lang={this.state.languageState}
            langClick={this.languageToggle}/>
          {backDrop}
          <div className="maincontent">
              {this.props.loadMatchData.map((number,i) =>
                <Card
                  data={number}
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
    else{
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
            modalClick = {this.toggleCreateModal}
            modalState = {this.state.createModalIsOpen}/>
        </div>
      );
    }
  }
}

export default Dashboard;
