import React from 'react'
import './ModalCreateMatch.css'
import $ from 'jquery'

import ModalBackDrop from './ModalBackDrop'
import EditText from '../EditText/EditText'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'
import SwitchToggle from '../Switch/SwitchToggle'
import SelectField from './SelectField'
import CreateField from './CreateField'

class ModalCreateMatch extends React.Component{
  constructor(props){
    super(props)
    this.createModalRefresh = false;
    this.state={
      selectFieldState: false,
      createFieldState: false,
      field:[],
      dataLength:0,
      publicShow: 0,
      clickedFieldDetail:[],
      clickedFieldCourt:[],
      FieldCourt:[],
      courtNumber:[],
      typescore:0,
      clickedFieldID:'',
      roomPassword:''
    }
  }
  createSetFieldId=()=>{
    this.props.createSetFieldId(this.state.clickedFieldDetail);
  }
  createSetPublicShow=()=>{
    this.props.publicShow(this.state.publicShow)
  }
  createSetMatchName=(matchname)=>{
    this.props.createSetMatchName(matchname);
  }
  createSetTypeRoom=(typeroom)=>{
    this.state.roomPassword = typeroom
    this.props.createSetTypeRoom(this.state.roomPassword);
  }
  createSetDate=(date)=>{
    this.props.createSetDate(date);
  }
  createSetTeamNumber=(teamnum)=>{
    this.props.createSetTeamNumber(teamnum);
  }
  createSetDepartmentNumber=(departnum)=>{
    this.props.createSetDepartmentNumber(departnum);
  }
  createSetTypeScore=(typescore)=>{
    this.props.createSetTypeScore(this.state.typescore)
  }
  getField = (value)=>{
    this.state.clickedFieldID = value
    this.state.clickedFieldDetail = []
    this.state.clickedFieldDetail[0] = this.state.clickedFieldID
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/loadfielddetail.php",
     dataType: 'json',
     data: {
       fieldid: value
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['fieldcord']=data.fieldcord;
       console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['fieldcord']){
        var fieldcord = localStorage['fieldcord'];
        fieldcord = fieldcord.split(",",fieldcord.length)
        //this.state.clickedFieldDetail = []
        //this.state.clickedFieldDetail.push(this.state.clickedFieldID)
        this.state.FieldCourt = []
        for(var i = 0;i < fieldcord.length;i++){
          /*var obj = {
            fieldcord: fieldcord[i]
          }*/
          this.state.FieldCourt.push(fieldcord[i]);
        }
        //this.state.clickedFieldCourt.push(fieldcord[i]);
        console.log("this.state.clickedFieldID.push(obj) :::",this.state.FieldCourt)
        //this.setState({dataLength: this.state.fieldFromLoad.length})//-------
      }
      this.createModalRefresh = false;
      this.showFieldFromLoad()
    },500)
    localStorage.clear()
  }
  getCourt = (Court,i)=>{
    //this.state.clickedFieldCourt = []
    this.state.courtNumber[i] = Court
    if(this.state.courtNumber[0]===this.state.courtNumber[1]){
      alert("Please select different court")
    }
    this.state.clickedFieldDetail[0] = this.state.clickedFieldID
    this.state.clickedFieldDetail[1] = this.state.courtNumber[0]
    this.state.clickedFieldDetail[2] = this.state.courtNumber[1]
    console.log("this.state.courtNumber ::",this.state.courtNumber)
  }

  getTypeScore = (type)=>{
    this.state.typescore = type
  }
  addMatch=()=>{
    console.log("matchModalData",this.props.matchModalData)
    this.createSetFieldId()
    this.createSetPublicShow()
    this.createSetTypeScore()
    this.state.clickedFieldDetail = []
    if(this.state.roomPassword.length >= 4){
      if(
        this.props.matchModalData.matchname &&
        this.props.matchModalData.fieldid &&
        this.props.matchModalData.date){
          //this.props.addMatch();
          //this.props.modalClose();
        }else{
          alert('Please complete the information!!!')
        }
    }else{
      alert('Room password 4-digit at least')
    }

  }
  showFieldFromLoad = () => {
    if(!this.createModalRefresh ){
      this.createModalRefresh = true;
      this.state.field=[]
      for(var i = 0;i < this.props.fieldDetail.length ;i++){
        this.state.field.push(this.props.fieldDetail[i]);
      }
      this.setState(this.state);
    }
  }
  switchToggleState=(value)=>{
    if(value){
      this.state.publicShow = 1
    }else{
      this.state.publicShow = 0
    }
  }
  selectFieldToggle = ()=>{
    this.setState((state)=>{
      return {selectFieldState: !state.selectFieldState}
    })
  }
  createFieldToggle = ()=>{
    this.setState((state)=>{
      return {createFieldState: !state.createFieldState}
    })
  }
  render(){
    if(this.props.modalState){
      setTimeout(this.showFieldFromLoad,500);
      return(
        <div className="modal-creatematch">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal-creatematch__grid">
            <div onClick = {this.props.modalClick} className="spacer"></div>
            <div className="modal-creatematch__card">
              <div className="creatematch__matchname">
                <label>Match name</label>
                <EditTextImg type="text" placeholder="Match name" formType="username"
                  editTextValue={this.createSetMatchName}/>
              </div>
              <div className="roomtype__scoretype">
                <div className="creatematch__switchpub">
                  <p>Public</p>
                  <SwitchToggle switchToggleState={this.switchToggleState}/>
                </div>
                <div className="creatematch__typeroom">
                  <p>Score type</p>
                  <select onChange={(e)=>this.getTypeScore(e.target.value)}>
                    <option value={0}>Par</option>
                    <option value={1}>Stable Ford</option>
                    <option value={2}>{"36 System"}</option>
                  </select>
                </div>
              </div>
              <div className="locationselect">
                <label className="locationselect__label">{'Location'}</label>
                <button onClick = {this.selectFieldToggle}
                  className="creatematch__selectfield">Select Field</button>
                <button onClick = {this.createFieldToggle}
                  className="creatematch__selectfield">Create match</button>
              </div>
              <div className="team__deaprt">
                <div className="creatematch__team">
                  <label>{"Team (Number)"}</label>
                  <EditTextImg type="number" formType="username" placeholder="0"
                    editTextValue={this.createSetTeamNumber}/>
                </div>
                <div className="creatematch__depart">
                  <label>{"Department (Number)"}</label>
                  <EditTextImg type="number" formType="department" placeholder="0"
                    editTextValue={this.createSetDepartmentNumber}/>
                </div>
              </div>
              <div className="modal-creatematch__items">
                <label>{'Date'}</label>
                <EditTextImg type="date" placeholder="Date" formType="username"
                  editTextValue={this.createSetDate}/>
              </div>
              <div className="modal-creatematch__items">
                <label>Room password</label>
                <EditTextImg type="password" placeholder="Set password to access" formType="password"
                  editTextValue={this.createSetTypeRoom}/>
              </div>
              <div className="modal-creatematch__items"></div>
              <div className="modal-creatematch__items"></div>
              <button onClick = {this.props.modalClose}>Close</button>
              <button onClick = {this.addMatch}>Create</button>
            </div>
            <div onClick = {this.props.modalClick} className="spacer"></div>
          </div>
          <div className="spacer"></div>
          <SelectField
            field = {this.state.field}
            modalClick = {this.selectFieldToggle}
            modalState = {this.state.selectFieldState}/>
          <CreateField
            modalClick = {this.createFieldToggle}
            modalState = {this.state.createFieldState}/>
        </div>
      );
    }
    return null;
  }
}
export default ModalCreateMatch;
