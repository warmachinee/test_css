import React, { Component } from 'react';
import '../css/App.css'

import TopNav from '../component/TopNav/TopNav'
import SideNav from '../component/SideNav/SideNav'
import BackDrop from '../component/BackDrop/BackDrop'
import Card from '../component/Card/Card'
import ModalCreateMatch from '../component/Modal/ModalCreateMatch'
import ModalAddPeople from '../component/Modal/ModalAddPeople'

const pageClickState = props =>{
  return (props.pageDashboardClick);
}
class Dashboard extends Component {
  constructor(props){
    super(props)
  }
  state = {
    createModalIsOpen: false,
    addpeopleModalIsOpen: false,
    sideDrawerOpen: false,
    languageState: false,
    matchDetailState: false
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

  render() {
    let backDrop;
    let privateStatus = false
    if(this.state.sideDrawerOpen){
      backDrop = <BackDrop click={this.backdropClickHander}/>;
    }
    if(!this.state.matchDetailState){
      return (
        <div>
          <TopNav
            drawerClickHandler = {this.drawerToggleClickHandler}
            createMatchClick = {this.toggleCreateModal}/>
          <SideNav
            show={this.state.sideDrawerOpen}
            click={pageClickState}
            lang={this.state.languageState}
            langClick={this.languageToggle}/>
          {backDrop}
          <div className="maincontent">
            <Card
              cardMatchName="test"
              cardLocation="Location12345"
              cardDate="26/05/2018"
              cardPrivate={privateStatus}
              matchDetailClick = {this.matchDetailStateToggle}
              addPeopleClick = {this.toggleAddpeopleModal}
              />
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
    else{
      return(
        <div>
          <TopNav
            drawerClickHandler = {this.drawerToggleClickHandler}
            createMatchClick = {this.toggleCreateModal}/>
          <SideNav
            show={this.state.sideDrawerOpen}
            click={pageClickState}
            lang={this.state.languageState}
            langClick={this.languageToggle}/>
          {backDrop}
          <div className="maincontent">
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
