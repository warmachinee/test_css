import React from 'react'
import './ModalRoomPassword.css'
import $ from 'jquery'
import ModalBackDrop from './ModalBackDrop'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'

class ModalRoomPassword extends React.Component{
  constructor(props){
    super(props)
    this.state={
      roomPassword:[],
    }
  }
  roomPassword = (val) =>{
    this.state.roomPassword = val;
  }
  HandlerMatchAccess = (data) =>{
    //console.log("pass :::",this.state.roomPassword)
    //console.log("Props data :::",this.props.roomDetailToAccess);
    var geturl;
    geturl = $.ajax({
     type: "POST",
     url: "http://pds.in.th/phpadmin/matchaccess.php",
     dataType: 'json',
     data: {
       "matchid": parseInt(this.props.roomDetailToAccess.matchid),
       "password": this.state.roomPassword,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['response']=data.status;
       console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['response']){
        var response = localStorage['response'];
        if(response==='pass'){
          this.props.getCardTargetIDPass(this.props.roomDetailToAccess)
        }else{
          alert(response)
        }
      }
      this.props.modalClick()
    },250)
  }
  render(){
    if(this.props.modalState){
      return(
        <div className="modal-roompassword">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal-roompassword__grid">
            <div className="spacer"></div>
            <div className="modal-roompassword__card">
              <div className="roompassword__item">

              </div>
              <div className="roompassword__item">
                <label>Room password</label>
              </div>
              <div className="roompassword__item">
                <EditTextImg type="password" placeholder="Enter password" editTextValue={this.roomPassword} formType="password"/>
              </div>
              <div className="roompassword__item">
                <button onClick={this.HandlerMatchAccess}>Enter</button>
                <button onClick = {this.props.modalClick} >Close</button>
              </div>

            </div>
            <div className="spacer"></div>
          </div>
          <div className="spacer"></div>
        </div>
      );
    }
    return null;
  }
}
export default ModalRoomPassword;
