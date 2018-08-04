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
      appLoadMatch:[],
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
       console.log(data)
       localStorage['matchid']=data.matchid;
       localStorage['userhost']=data.userhost;
       localStorage['matchname']=data.matchname;
       localStorage['type']=data.type;
       localStorage['fieldname']=data.fieldname;
       localStorage['date']=data.date;
     }
    });
    if(localStorage['matchid']){
      var matchid = localStorage['matchid'];
      var userhost = localStorage['userhost'];
      var matchname = localStorage['matchname'];
      var type = localStorage['type'];
      var fieldname = localStorage['fieldname'];
      var date = localStorage['date'];

      matchid= JSON.parse("["+matchid+"]"),
      matchname= matchname.split(",",matchname.length),
      userhost= JSON.parse("["+userhost+"]"),
      type= type.split(",",type.length),
      fieldname= fieldname.split(",",fieldname.length),
      date= date.split(",",date.length)

      for(var i=0;i<matchid.length;i++){
        var obj = {
          MatchID: matchid[i],
          MatchName: matchname[i],
          UserHost: userhost[i],
          Type: type[i],
          FieldName: fieldname[i],
          Date: date[i]
        }
        this.state.appLoadMatch.push(obj);
      }

        console.log("From handler this.state.appLoadMatch :: ",this.state.appLoadMatch)
        /*
      this.setState({MatchID: matchid});
      this.setState({MatchName: matchname});
      this.setState({UserHost: userhost});
      this.setState({Type: type});
      this.setState({FieldName: fieldname});
      this.setState({Date: date});*/
      //console.log("this.state.appLoadMatch ::",this.state.appLoadMatch)
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
