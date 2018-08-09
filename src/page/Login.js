import React, { Component } from 'react'
import '../css/App.css'
import $ from 'jquery';

import TopNavLogin from '../component/TopNav/TopNavLogin'
import LoginForm from '../component/Form/LoginForm'


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
    console.log(this.state.regisData.password)
  }
  sendUserID =() =>{
    this.props.userID(this.state.userID)
  }
  handleSubmit = event => {
    event.preventDefault();
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
       console.log(data);
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
        //console.log("this.state.userID :::",this.state.userID);
      }
      this.LoginAction()
    },300)
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
       console.log(data);
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
      console.log(this.state.userID," ::",this.getResultLogin());
      this.sendUserID();
      this.props.pageLoginClick();
      setTimeout(this.props.loadMatch,500);
    }else{
      console.log(this.getResultLogin());
      alert('Login Fail')
    }
    localStorage['response']=null;
    localStorage.clear()
  }
  RegisAction=()=>{
    if(this.getResultRegis()==='Success'){
      alert(this.getResultRegis())
      console.log(this.getResultRegis());
    }else{
      alert(this.getResultRegis())
      console.log(this.getResultRegis());
    }
    localStorage['response']=null;
    localStorage.clear()
  }
  getResultLogin=()=>{
    var result = localStorage['response'];
    return result;
    //return 'Success'
  }
  getResultRegis=()=>{
    var result = localStorage['response'];
    return result;
  }
  render(){
    return(
      <div>
        <TopNavLogin
          submitLogin = {this.handleSubmit}
          inputUsername = {this.inputUsernameLogin}
          inputPassword = {this.inputPasswordLogin}/>
        <div className="maincontentlogin">
          <LoginForm
            submitLogin = {this.handleSubmit}
            submitRegis = {this.handleSubmitRegis}
            inputUsername = {this.inputUsernameLogin}
            inputPassword = {this.inputPasswordLogin}
            inputUsernameRegis = {this.inputUsernameRegis}
            inputPasswordRegis = {this.inputPasswordRegis}
            inputFullnameRegis = {this.inputFullnameRegis}
            inputLastnameRegis = {this.inputLastnameRegis}
            inputPhoneRegis = {this.inputPhoneRegis}
            loginClick = {this.props.pageLoginClick}/>
        </div>
      </div>
    );
  }
}

export default Login;
