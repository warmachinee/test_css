import React, { Component } from 'react';
import './css/App.css';
import $ from 'jquery';

import Dashboard from './page/Dashboard';
import Login from './page/Login';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      pageLogin: true,
      pageDashboard: false,
      appLoadMatch:{
        MatchID:'',
        MatchName:'',
        UserHost:'',
        Type:'',
        FieldName:'',
        Date:''
      }
    }
  }
  goToAnotherPage = () =>{
    this.setState( (pageState)=>{
      return {
        pageLogin: !pageState.pageLogin,
        pageDashboard: !pageState.pageDashboard
      };
    });
  };

  handleLoadMatch = event => {
    var geturl;
    geturl = $.ajax({
      type: "POST",
     //url: "http://127.0.0.1/php/login.php",
     url: "http://pds.in.th/phpadmin/loadmatch.php",
     dataType: 'json',
     data: {
       "matchid": this.state.appLoadMatch.MatchID,
       "matchname": this.state.appLoadMatch.MatchName,
       "userhost": this.state.appLoadMatch.UserHost,
       "type": this.state.appLoadMatch.Type,
       "fieldname": this.state.appLoadMatch.FieldName,
       "date": this.state.appLoadMatch.Date,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['matchid']=data.matchid;
       localStorage['matchname']=data.matchname;
       localStorage['userhost']=data.userhost;
       localStorage['type']=data.type;
       localStorage['fieldname']=data.fieldname;
       localStorage['date']=data.date;
     }
    });
    if(localStorage['matchid']){
      var matchid = localStorage['matchid'];
      var matchname = localStorage['matchname'];
      var userhost = localStorage['userhost'];
      var type = localStorage['type'];
      var fieldname = localStorage['fieldname'];
      var date = localStorage['date'];
      this.setState(
        () => (
          {
            appLoadMatch: {
              MatchID: matchid,
              MatchName: matchname,
              UserHost: userhost,
              Type: type,
              FieldName: fieldname,
              Date: date
          }
        }))
      /*this.setState({appLoadMatch.MatchID: matchid});
      this.setState({appLoadMatch.MatchName: matchname});
      this.setState({appLoadMatch.UserHost: userhost});
      this.setState({appLoadMatch.Type: type});
      this.setState({appLoadMatch.FieldName: fieldname});
      this.setState({appLoadMatch.Date: date});*/
      localStorage.clear()
    }
    localStorage.clear()
  }

  render() {
    if(this.state.pageLogin){
      return (
        <Login
          loadMatch = {this.handleLoadMatch}
          pageLoginClick = {this.goToAnotherPage}/>
      );
    }else if (this.state.pageDashboard) {
      return(
        <Dashboard
          loadMatchData = {this.state.appLoadMatch}
          pageDashboardClick = {this.goToAnotherPage}/>
      );
    }
  }
}

export default App;
