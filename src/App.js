import React, { Component } from 'react';
import Delay from 'react-delay';
import {Link, Redirect} from 'react-router-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './css/App.css';
import $ from 'jquery';

import Dashboard from './page/Dashboard';
import Login from './page/Login';
import FillScore from './component/Card/FillScore'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      pageLogin: true,
      pageDashboard: false,
      pageFillScore: false,
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
      chksession: false,
      chktempid: 0,
      chktype: 0,
      chkName:{},
      sessionstatus: '',
      logoutClickState: false,
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
  goToLoginPage = () =>{
    this.setState( ()=>{
      return {
        chksession: false,
        pageLogin: true,
        pageFillScore: false,
        pageDashboard: false,
        logoutClickState: false
      };
    });
  };
  pageFillScoreToggle = () =>{
    this.setState( ()=>{
      return {
        pageFillScore: true,
        pageLogin: false,
        pageDashboard: false
      };
    });
  }
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
  pageFillScoreClick = () =>{
    this.checksession()
    setTimeout(this.pageFillScoreToggle,350)
  }
  handelLogout = event =>{
    this.state.userID = ''
    this.state.appLoadMatch = []
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
     },1000)
  }
  handelLogoutFillscore = () =>{
    this.state.userID = ''
    this.state.appLoadMatch = []
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
       this.goToLoginPage()
     },1000)
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
         this.setState({chksession: true})
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
        localStorage['fullname'] = data.fullname;
        localStorage['lastname'] = data.lastname;
        localStorage['tempid'] = data.tempid;
        localStorage['type'] = data.type;
       }
      });
      setTimeout(()=>{
        if(localStorage['id']){
          var chksessions = localStorage['chk'];
          var id = localStorage['id'];
          var tempid = localStorage['tempid'];
          var fullname = localStorage['fullname'];
          var lastname = localStorage['lastname'];
          var type = localStorage['type'];

          this.state.sessionstatus = chksessions;
          this.state.userID = parseInt(id)
          this.state.chktempid = parseInt(tempid)
          this.state.chktype = parseInt(type)
          this.state.chkName = fullname + " " + lastname

          //console.log(id," : ",chksessions);
          if(this.state.sessionstatus === 'valid session'){
             this.state.chksession = true
          }else{
             this.state.chksession = false
           }
           if(this.state.chktempid === 1){
             this.state.chktempid = true
           }else{
             this.state.chktempid = false
           }
          }
      },300);
      localStorage.clear()
   }

  componentWillMount(){
    this.checksession()
  }

  componentDidMount(){
    setTimeout(()=>{
      //console.log('main Didmount ::: ',this.state.chksession);
      this.setState(this.state)
    },350)
    //alert('แมทช์การแข่งขัน SENIOR NATION TOUR จะเปิดดูรายละเอียดได้ภายในวันนี้ ขออภัยในความไม่สะดวก')
  }
  render() {
    return (
      <Delay wait={1000}>
      <Router>
        <div>
          {(window.location.pathname === '/register')?
            (<Redirect to="/register" />)
            :(
              (this.state.logoutClickState)?
              (<Redirect to="/" />):(
                (this.state.pageFillScore)?
                (<Redirect to="/fillscore" />):
                (
                  ((this.state.chksession===true) && (window.location.pathname === '/fillscore'))?
                  (
                    (this.state.chktempid)?
                    (<Redirect to="/fillscore" />):(<Redirect to="/home" />)
                  ):
                  ((this.state.pageDashboard)?
                  (<Redirect to="/home" />):(
                    ((this.state.chksession===true) && (window.location.pathname === '/home'))?
                    (
                      (this.state.chktempid)?(<Redirect to="/fillscore" />):(<Redirect to="/home" />)
                    ):
                    (<Redirect to="/" />)
                  ))
                )
              )
            )}
          <Route
            exact path="/"
            render={()=>
              <Login
                session = {this.state.chksession}
                userID = {this.getUserID}
                loadMatch = {this.handleLoadMatch}
                pageLoginClick = {this.goToAnotherPage}
                pageFillScoreClick = {this.pageFillScoreClick}/>
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

              <Route
                path="/register"
                render={()=>
                  <Login
                    session = {this.state.chksession}
                    userID = {this.getUserID}
                    loadMatch = {this.handleLoadMatch}
                    pageLoginClick = {this.goToAnotherPage}
                    pageFillScoreClick = {this.pageFillScoreClick}/>
                }/>
              <Route
                path="/fillscore"
                render={()=>
                  <FillScore
                    chkName = {this.state.chkName}
                    chktype = {this.state.chktype}
                    logout = {this.handelLogoutFillscore}/>
                }/>
        </div>
      </Router>
    </Delay>
    );
  }
}

export default App;
