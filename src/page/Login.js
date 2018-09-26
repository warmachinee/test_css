import React, { Component } from 'react'
import '../css/App.css'
import {Link, Redirect} from 'react-router-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import $ from 'jquery';

import '../component/TopNav/TopNavLogin.css'

import logo from '../component/img/logo.svg'
import TopNavLogin from '../component/TopNav/TopNavLogin'
import LoginForm from '../component/Form/LoginForm'
import ProfileLogin from '../component/img/baseline-account_circle-24px-login.svg'

import EditText from '../component/EditText/EditText'
import Switch from '../component/Switch/Switch'
import EditTextImg from '../component/EditText/EditTextImg'
import Button from '../component/Button/Button'
import LoginCard from '../component/Card/LoginCard'
import RegisCard from '../component/Card/RegisCard'
const cardLogin = null;
class Login extends Component{
  constructor(props){
    super(props);
    this.pageClick = props.pageLoginClick
    this.state = {
      pageRegisCard: false,
      userData:{
        username:'',
        password:''
      },
      regisData:{
        username:'',
        password:'',
        fullname:'',
        lastname:'',
        phoneNumber:'',
      },
      chksession:false
    }

  }
  state = {
    userID:'',
    loginStatus: '',
    regisStatus: '',
  }
  inputUsernameLogin = (Username) =>{
    this.state.userData.username = Username;
  }
  inputPasswordLogin = (Password) =>{
    this.state.userData.password = Password;
  }
  inputUsernameRegis = (Username) =>{
    this.state.regisData.username = Username;
  }
  inputPhoneRegis = (Phone) =>{
    this.state.regisData.phoneNumber = Phone
  }
  inputFullnameRegis = (Fullname) =>{
    this.state.regisData.fullname = Fullname
  }
  inputLastnameRegis = (Lastname) =>{
    this.state.regisData.lastname = Lastname
  }
  inputPasswordRegis = (Password) =>{
    this.state.regisData.password = Password
  }
  sendUserID =() =>{
    this.props.userID(this.state.userID)
  }
  handleSubmit = event => {
    var geturl;
    geturl = $.ajax({
      type: "POST",
     //url: "http://127.0.0.1/php/login.php",
     url: "http://pds.in.th/phpadmin/login.php",
     dataType: 'json',
     data: {
       "username": this.state.userData.username,
       "password": this.state.userData.password
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //localStorage.setItem("response",JSON.stringify(data));
       localStorage['response']=data.status;
       localStorage['id']=data.id;
       localStorage['tempid']=data.tempid;
       //console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['id']){
        var response = localStorage['response'];
        var id = localStorage['id'];
        this.setState({
          loginStatus: response,
          userID: id
        });
      }
      this.LoginAction()
    },1500)
  }
  handleSubmitRegis =()=> {
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/register.php",
     dataType: 'json',
     data: {
       "username": this.state.regisData.username,
       "password": this.state.regisData.password,
       "fullname": this.state.regisData.fullname,
       "lastname": this.state.regisData.lastname,
       "tel": this.state.regisData.phoneNumber,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['response']=data.status;
       //console.log(data);
     }
    });
    if(localStorage['response']){
      var response = localStorage['response'];
      this.setState({loginStatus: response});
    }
    setTimeout(this.RegisAction,1000);
  }
  LoginAction = () =>{
    if(this.getResultLogin()==='Success'){
      //console.log(this.state.userID," ::",this.getResultLogin());
      if(parseInt(localStorage['tempid'])){
        this.props.pageFillScoreClick()
      }else{
        this.sendUserID();
        this.props.loadMatch();
        setTimeout(this.props.pageLoginClick,350)
      }
    }else{
      //console.log(this.getResultLogin());
      alert('Login Fail')
    }
    localStorage.clear()
  }
  RegisAction=()=>{
    if(this.getResultRegis()==='Success'){
      alert(this.getResultRegis())
      //console.log(this.getResultRegis());
    }else{
      alert(this.getResultRegis())
      //console.log(this.getResultRegis());
    }
    localStorage.clear()
  }
  getResultLogin=()=>{
    var result = localStorage['response'];
    return result;
  }
  getResultRegis=()=>{
    var result = localStorage['response'];
    return result;
  }
  handleKeyPress = (target) => {
    if(target.charCode === 13){
      this.handleSubmit()
    }
  }
  checksession = () =>{
    $.ajax({
      type: "POST",
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
           //console.log(id," : ",chksessions);
           if(chksessions === 'valid session'){
             this.state.chksession = true
           }else{
             this.state.chksession = false
           }
           this.setState(this.state)
         }
     },300)
     localStorage.clear()
   }
   homeClick = ()=>{
     this.sendUserID();
     this.props.pageLoginClick();
     setTimeout(this.props.loadMatch,500)
   }
   componentWillMount(){
     this.checksession()
     setTimeout(()=>{
       //console.log('home ::: ',this.state.chksession);
     },350)
   }

   componentDidMount(){
     setTimeout(()=>{
       //console.log('home Didmount ::: ',this.state.chksession);
     },350)
   }
  render(){
    return(
      <Router>
        <div>
            <div>
              <header className="topnavlogin">
                <nav className="topnavlogin__nav">
                  <div className="topnavlogin__logo">
                    <a href="#"><img src={logo}></img></a>
                  </div>
                  <div className="spacer"></div>
                  <div className="spacer"></div>
                  <div className="topnavlogin__edittext">
                    <EditText type="text" placeholder="Enter Email"
                      handleKeyPress = {this.handleKeyPress}
                      editTextValue={this.inputUsernameLogin}/>
                    <EditText type="password" placeholder="Password"
                      handleKeyPress = {this.handleKeyPress}
                      editTextValue={this.inputPasswordLogin}/>
                  </div>
                  <div className="topnavlogin__signin">
                    <button onClick = {this.handleSubmit}>Sign in</button>
                  </div>
                  <div className="topnavlogin__signup">
                    <Link to='/register'
                      className="signupbtn">Sign up</Link>
                  </div>
                </nav>
              </header>
            </div>
          <div className="maincontentlogin">
              <div className="form__grid">
                <div className="spacer"></div>
                <div className="form__middle__card">
                  <div className="spacer"></div>
                    {(this.state.chksession)?(
                      <div>
                        <p>Logged in</p>
                        <button onClick={this.homeClick}>Home</button>
                      </div>
                    ):((window.location.pathname !== '/register')?(
                      <LoginCard
                        inputUsername={this.inputUsernameLogin}
                        inputPassword={this.inputPasswordLogin}
                        submitLogin={this.handleSubmit}/>
                    ):(null))}
                <Route
                  path="/register"
                  render={()=>
                    <RegisCard
                      inputUsernameRegis={this.inputUsernameRegis}
                      inputPasswordRegis={this.inputPasswordRegis}
                      inputFullnameRegis={this.inputFullnameRegis}
                      inputLastnameRegis={this.inputLastnameRegis}
                      inputPhoneRegis={this.inputPhoneRegis}
                      submitRegis={this.handleSubmitRegis}/>
                  }/>
                  <div className="spacer"></div>
                </div>
                <div className="spacer"></div>
              </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Login;
