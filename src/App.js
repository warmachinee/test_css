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
      dataLength:0,
      detailData:[
        {
          MatchID: '',
          MatchName: '',
          UserHost: '',
          Type: '',
          FieldName: '',
          Date: ''
        }
      ],
      userID:''
    }
    this.cardStateClick = ''
  }
  getUserID = (UserID) =>{
    this.state.userID = UserID
  }

  getCardTargetID =(value)=>{
    this.cardStateClick = value
    //console.log('this.cardStateClick :: ',this.cardStateClick)
    //console.log('value ::',value);
  }
  goToAnotherPage = () =>{
    this.setState( (pageState)=>{
      return {
        pageLogin: !pageState.pageLogin,
        pageDashboard: !pageState.pageDashboard
      };
    });
  };
  handelLogout = event =>{
    event.preventDefault()
    $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/logout.php",
     dataType: 'json',
     data: {},
     xhrFields: { withCredentials: true },
     success: function(data) {
      }
     });
     setTimeout(this.goToAnotherPage,500)
  }
  handleLoadMatch = event => {
    $.ajax({
      type: "POST",
     //url: "http://127.0.0.1/php/login.php",
     url: "http://pds.in.th/phpadmin/loadmatchprivate.php",
     dataType: 'json',
     data: {},
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
     setTimeout(()=>{
       if(localStorage['matchid']){
         var matchid = localStorage['matchid'];
         var userhost = localStorage['userhost'];
         var matchname = localStorage['matchname'];
         var type = localStorage['type'];
         var fieldname = localStorage['fieldname'];
         var date = localStorage['date'];
         matchid = JSON.parse("["+matchid+"]")
         matchname = matchname.split(",",matchname.length)
         userhost= JSON.parse("["+userhost+"]")
         type= type.split(",",type.length)
         fieldname= fieldname.split(",",fieldname.length)
         date= date.split(",",date.length)
         this.state.appLoadMatch = []
         for(var i = 0;i < matchid.length;i++){
           var obj = {
             matchid: matchid[i],
             matchname: matchname[i],
             userhost: userhost[i],
             type: type[i],
             fieldname: fieldname[i],
             date: date[i]
           }
           this.state.appLoadMatch.push(obj);
         }
         this.setState({dataLength: this.state.appLoadMatch.length})///Dont delete
       }
     },250);
     localStorage.clear()
   }

  render() {
    if(this.state.pageLogin){
      return (
        <Login
          userID = {this.getUserID}
          loadMatch = {this.handleLoadMatch}
          pageLoginClick = {this.goToAnotherPage}/>
      );
    }else if (this.state.pageDashboard) {
      return(
        <Dashboard
          userID = {this.state.userID}
          logOut = {this.handelLogout}
          loadMatch = {this.handleLoadMatch}
          getCardTargetID = {this.getCardTargetID}
          sentCardTargetID = {this.state.detailData}
          loadMatchData = {this.state.appLoadMatch}
          pageDashboardClick = {this.goToAnotherPage}/>
      );
    }
  }
}

export default App;
