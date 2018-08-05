import React, { Component } from 'react';
import ReactDom from 'react-dom';
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
    this.stop = false;
    this.state = {
      createModalIsOpen: false,
      addpeopleModalIsOpen: false,
      addscoreModalIsOpen: false,
      sideDrawerOpen: false,
      languageState: false,
      matchDetailState: false,
      data:[],
      dataFromLoad:[],
      MatchModalData:{
        MatchID:"",
        MatchTeamNumber:"",
        MatchName:"",
        MatchLocation:"",
        MatchDate:""
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
  toggleAddpeopleModal = () => {
    this.setState((state)=>{
      return {addpeopleModalIsOpen: !state.addpeopleModalIsOpen}
    });
  }
  toggleAddScoreModal = () => {
    this.setState((state)=>{
      return {addscoreModalIsOpen: !state.addscoreModalIsOpen}
    });
  }
  showdata = () =>{
    console.log("MatchID : ",this.state.data.length);
    console.log("MatchName : ",this.state.MatchModalData.MatchName);
    console.log("MatchTeamNumber : ",this.state.MatchModalData.MatchTeamNumber);
    console.log("MatchLocation : ",this.state.MatchModalData.MatchLocation);
    console.log("MatchDate : ",this.state.MatchModalData.MatchDate);
    console.log("MatchDate : ",this.state.MatchModalData.MatchDate);
    console.log("Player : ",this.state.PlayerInMatch.playerName);
  }
  addMatch = ()=>{
    console.log("data old :: ",this.state.data);
    this.state.data.push({
      MatchID:this.state.data.length,
      MatchName:this.state.MatchModalData.MatchName,
      MatchTeamNumber:this.state.MatchModalData.MatchTeamNumber,
      UserHost:this.state.data.length,
      FieldName:this.state.MatchModalData.MatchLocation,
      Date:this.state.MatchModalData.MatchDate
    });
    console.log("data new :: ",this.state.data);
    ReactDom.render(<Dashboard />,document.getElementById("root"));
  }
  addPeople = (PlayerName) =>{
    this.state.PlayerInMatch.playerName = PlayerName
  }
  setMatchName = (MatchName)=>{
    this.state.MatchModalData.MatchName = MatchName;
  }
  setMatchTeamNumber = (MatchTeamNumber) =>{
    this.state.MatchModalData.MatchTeamNumber = MatchTeamNumber;
  }
  setMatchLocation = (MatchLocation)=>{
    this.state.MatchModalData.MatchLocation = MatchLocation;
  }
  setMatchDate = (MatchDate)=>{
    this.state.MatchModalData.MatchDate = MatchDate;
  }
  getMatchID = ()=>{
     return this.state.data.length;
  }
  getCardTargetID =(value)=>{
    this.props.getCardTargetID(value)
    console.log("Detail :: ID",value)
  }
  showDataFromLoad = () => {
    console.log("Click ",this.props.loadMatchData)

    if(!this.stop){
      this.stop=true;
      for(var i=0;i<this.props.loadMatchData.length;i++){
        this.state.dataFromLoad.push(this.props.loadMatchData[i]);
      }
      console.log('this.state.dataFromLoad ::',this.state.dataFromLoad);
      this.setState(this.state);
    }
  }
  render() {
    let backDrop;
    const cardDynamically = this.state.data.map((card,i)=>
      <Card
        data={card}
        key={i}
        matchDetailClick = {this.matchDetailStateToggle}

        addPeopleClick = {this.toggleAddpeopleModal}
        addScoreClick = {this.toggleAddScoreModal}
        />
    )
    if(this.state.sideDrawerOpen){
      backDrop = <BackDrop click={this.backdropClickHander}/>;
    }
    if(!this.state.matchDetailState){
      setTimeout(this.showDataFromLoad,1500);
      return(
        <div>
          <TopNav
            drawerClickHandler = {this.drawerToggleClickHandler}
            createMatchClick = {this.toggleCreateModal}
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
            {cardDynamically}
          </div>
          <ModalAddScore
            modalClick = {this.toggleAddScoreModal}
            modalState = {this.state.addscoreModalIsOpen} />
          <ModalAddPeople
            addPeople = {this.addPeople}
            matchTeamNumber = {this.state.MatchModalData.MatchTeamNumber}
            modalClick = {this.toggleAddpeopleModal}
            modalState = {this.state.addpeopleModalIsOpen} />
          <ModalCreateMatch
            addMatch = {this.addMatch}
            getMatchID = {this.getMatchID}
            setMatchName = {this.setMatchName}
            setMatchTeamNumber = {this.setMatchTeamNumber}
            setMatchLocation = {this.setMatchLocation}
            setMatchDate = {this.setMatchDate}
            ModalData = {this.state.MatchModalData}
            modalClick = {this.toggleCreateModal}
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
