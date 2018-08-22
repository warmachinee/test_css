import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
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
      userID:'',
      chksession : false,
      sessionstatus : '',
      logoutClickState: false
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
        chksession: pageState.chksession,
        pageLogin: !pageState.pageLogin,
        pageDashboard: !pageState.pageDashboard,
        logoutClickState: false
      };
    });
  };
  dashPage = () =>{
    this.state.pageLogin = false
    this.state.pageDashboard = true
  };
  appPage = () =>{
    this.setState( (pageState)=>{
      return {
        pageLogin: true,
        pageDashboard: false,
        logoutClickState: true
      };
    });
  }
  handelLogout = event =>{
    this.state.userID = ''
    this.state.appLoadMatch = []
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
     this.setState({logoutClickState: true})
     setTimeout(()=>{
       this.state.chksession = false
       this.goToAnotherPage()
     },500)
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
       //console.log(data)
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
         this.state.chksession = true
         this.setState(this.state)
       }
     },250);
     localStorage.clear()
   }
   checksession = () =>{
     $.ajax({
       type: "POST",
      //url: "http://127.0.0.1/php/login.php",
      url: "http://pds.in.th/phpadmin/loadsession.php",
      dataType: 'json',
      data: {},
      xhrFields: { withCredentials: true },
      success: function(data) {
        //console.log(data)
        localStorage['chk'] = data.status;
        localStorage['id'] = data.id;
       }
      });
      setTimeout(()=>{
        if(localStorage['id']){
          var chksessions = localStorage['chk'];
          var id = localStorage['id'];
          this.state.sessionstatus = chksessions;
          this.state.userID = parseInt(id)
          //console.log(id," : ",chksessions);
          if(this.state.sessionstatus === 'valid session'){
             this.state.chksession = true
          }else{
             this.state.chksession = false
           }
          }
      },300);
      localStorage.clear()
   }
  componentWillMount(){
    this.checksession()

  }
  render() {
    //this.checksession()

    return (
      <Router>
        <div>
          {(this.state.pageDashboard && this.state.chksession)?
          (<Redirect to="/home" />):(
            (this.state.pageLogin && this.state.chksession)?
            (<Redirect to="/" />):(null)
          )}
          {(this.state.chksession && (window.location.pathname === '/home') && this.state.pageLogin)?
          (<Redirect to="/home" />):(null)}
          {(this.state.logoutClickState)?
            (<Redirect to="/" />):(null)}
          <Route
            exact path="/"
            render={()=>
              <Login
                session = {this.state.chksession}
                userID = {this.getUserID}
                loadMatch = {this.handleLoadMatch}
                pageLoginClick = {this.goToAnotherPage}/>
            }/>
            <Route
              path="/home"
              render={()=>
                <Dashboard
                  dashPage = {this.dashPage}
                  appPage = {this.appPage}
                  pageDashboard = {this.state.pageDashboard}
                  userID = {this.state.userID}
                  logOut = {this.handelLogout}
                  loadMatch = {this.handleLoadMatch}
                  getCardTargetID = {this.getCardTargetID}
                  sentCardTargetID = {this.state.detailData}
                  loadMatchData = {this.state.appLoadMatch}
                  pageDashboardClick = {this.goToAnotherPage}/>
              }/>

        </div>
      </Router>
    );
  }
}

export default App;
