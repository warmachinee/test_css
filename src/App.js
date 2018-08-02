import React, { Component } from 'react';
import './css/App.css'

import Dashboard from './page/Dashboard'
import Login from './page/Login'
class App extends Component {
  state = {
    pageLogin: false,
    pageDashboard: true
  };
  goToAnotherPage = () =>{
    this.setState( (pageState)=>{
      return {
        pageLogin: !pageState.pageLogin,
        pageDashboard: !pageState.pageDashboard
      };
    });
  };
  render() {
    if(this.state.pageLogin){
      return (
        <Login
          pageLoginClick = {this.goToAnotherPage}/>
      );
    }else if (this.state.pageDashboard) {
      return(
        <Dashboard pageDashboardClick = {this.goToAnotherPage}/>
      );
    }

  }
}

export default App;
