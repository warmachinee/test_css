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
        sex:'',
        fullname:'',
        lastname:'',
        nickname:'',
        phoneNumber:'',
        department:'',
        racket:''
      },
      checkPassword:{
        password:'',
        confirmPassword:''
      }
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
  inputSexRegis = (Sex) =>{
    this.state.regisData.sex = Sex
  }
  inputFullnameRegis = (Fullname) =>{
    this.state.regisData.fullname = Fullname
  }
  inputLastnameRegis = (Lastname) =>{
    this.state.regisData.lastname = Lastname
  }
  inputNicknameRegis = (Nickname) =>{
    this.state.regisData.nickname = Nickname
  }
  inputDepartmentRegis = (Department) =>{
    this.state.regisData.department = Department
  }
  inputRacketRegis = (Racket) =>{
    this.state.regisData.racket = Racket
  }
  inputPasswordRegis = (Password) =>{
    this.state.checkPassword.password = Password
  }
  inputConfirmPasswordRegis = (ConfirmPassword) =>{
    this.state.checkPassword.confirmPassword = ConfirmPassword
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
    },1000)
  }
  handleSubmitRegis =()=> {
    var geturl;
    geturl = $.ajax({
      type: "POST",
     //url: "http://127.0.0.1/php/login.php",
     url: "http://pds.in.th/phpadmin/register.php",
     dataType: 'json',
     data: {
       "username": this.state.regisData.username,
       "password": this.state.regisData.password,
       "sex": this.state.regisData.sex,
       "fullname": this.state.regisData.fullname,
       "lastname": this.state.regisData.lastname,
       "nickname": this.state.regisData.nickname,
       "tel": this.state.regisData.phoneNumber,
       "depart": this.state.regisData.department,
       "favgolf": this.state.regisData.racket,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //localStorage.setItem("response",JSON.stringify(data));
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
  checkPasswordSend=()=>{
    //console.log("Send password:::",this.state.checkPassword.password);
    //console.log("Send password checkPassword:::",this.state.checkPassword.confirmPassword);
    if(this.state.checkPassword.password===this.state.checkPassword.confirmPassword){
      this.state.regisData.password = this.state.checkPassword.password
      //console.log("Send :::",this.state.regisData);
      this.handleSubmitRegis()
    }else{
      console.log('Password and Confirm password not match');
    }
    //alert('Password and confirm password not match')

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
            submitRegis = {this.checkPasswordSend}
            inputUsername = {this.inputUsernameLogin}
            inputPassword = {this.inputPasswordLogin}
            inputUsernameRegis = {this.inputUsernameRegis}
            inputPasswordRegis = {this.inputPasswordRegis}
            inputConfirmPasswordRegis = {this.inputConfirmPasswordRegis}
            inputSexRegis = {this.inputSexRegis}
            inputFullnameRegis = {this.inputFullnameRegis}
            inputLastnameRegis = {this.inputLastnameRegis}
            inputNicknameRegis = {this.inputNicknameRegis}
            inputPhoneRegis = {this.inputPhoneRegis}
            inputDepartmentRegis = {this.inputDepartmentRegis}
            inputRacketRegis = {this.inputRacketRegis}
            loginClick = {this.props.pageLoginClick}/>
        </div>
      </div>
    );
  }
}

export default Login;
