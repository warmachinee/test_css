import React, { Component } from 'react';
import TopNav from './component/TopNav/TopNav'
import SideNav from './component/SideNav/SideNav'
import BackDrop from './component/BackDrop/BackDrop'
import Card from './component/Card/Card'

class ComponentTest extends Component {
  state = {
    sideDrawerOpen: false
  };
  drawerToggleClickHandler = () =>{
    this.setState((prevState)=>{
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHander = () =>{
    this.setState({sideDrawerOpen: false});
  };

  render() {
    let backDrop;
    let privateStatus = true
    if(this.state.sideDrawerOpen){
      backDrop = <BackDrop click={this.backdropClickHander}/>;
    }

    return (
      <div>
        <TopNav drawerClickHandler={this.drawerToggleClickHandler}/>
        <SideNav show={this.state.sideDrawerOpen}/>
        {backDrop}
        <div className="maincontent">
          <Card
            cardMatchName="test"
            cardLocation="Location12345"
            cardDate="26/05/2018"
            cardPrivate={privateStatus}
            />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    );
  }
}

export default ComponentTest;
