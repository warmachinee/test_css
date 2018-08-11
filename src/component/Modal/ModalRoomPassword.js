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
  HandlerMatchAccess = event =>{
    console.log("pass :::",this.state.roomPassword)
    console.log("Props data :::",this.props.roomDetailToAccess);
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
      }
      console.log(response);
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
              <label>Room password</label>
              <EditTextImg type="text" placeholder="Enter password" editTextValue={this.roomPassword} formType="password"/>
              <p>{this.props.matchTeamNumber}</p>
              <Button btnLabel="Close" btnOnClick = {this.props.modalClick} />
              <Button btnLabel="Add" btnOnClick={this.HandlerMatchAccess} />
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
