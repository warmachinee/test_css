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
      }
    }
  }
  state = {
    loginStatus: ''
  }

  goToRegisCard=()=>{
    this.setState((prevState)=>{
      return {pageRegisCard: !prevState.pageRegisCard};
    });
  };
  inputUsernameLogin = (Username) =>{
    this.state.userData.username = Username;
  }
  inputPasswordLogin = (Password) =>{
    this.state.userData.password = Password;
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
       console.log(data);

     }
    });
    if(localStorage['response']){
      var response = localStorage['response'];
      this.setState({loginStatus: response});
    }
    setTimeout(this.LoginAction,1000);
  }

  LoginAction = () =>{
    if(this.getResultLogin()==='Success'){
      console.log(this.getResultLogin());
      this.props.pageLoginClick();
      setTimeout(this.props.loadMatch,500);
    }else{
      console.log(this.getResultLogin());
      alert('Login Fail')
    }
    localStorage['response']=null;
  }

  getResultLogin=()=>{
    var result = localStorage['response'];
    //alert(result);
    return result;
  }
  render(){
    return(
      <div>
        <TopNavLogin
          submitLogin = {this.handleSubmit}
          regisPageClick = {this.goToRegisCard}
          inputUsername = {this.inputUsernameLogin}
          inputPassword = {this.inputPasswordLogin}/>
        <div className="maincontentlogin">
          <LoginForm
            submitLogin = {this.handleSubmit}
            inputUsername = {this.inputUsernameLogin}
            inputPassword = {this.inputPasswordLogin}
            loginClick = {this.props.pageLoginClick}/>
        </div>
      </div>
    );
  }
}

export default Login;
