import React from 'react'
import './ModalCreateMatch.css'
import $ from 'jquery'

import ModalBackDrop from './ModalBackDrop'
import EditText from '../EditText/EditText'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'
import SwitchToggle from '../Switch/SwitchToggle'

class ModalCreateMatch extends React.Component{
  constructor(props){
    super(props)
    this.createModalRefresh = false;
    this.state={
      field:[],
      dataLength:0,
      publicShow: 0,
      clickedFieldDetail:[],
      clickedFieldCourt:[],
      FieldCourt:[],
      courtNumber:[],
      clickedFieldID:''
    }
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }
  showDropdownMenu(event) {
      event.preventDefault();
      this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
      });
    }
  hideDropdownMenu() {
      this.setState({ displayMenu: false }, () => {
        document.removeEventListener('click', this.hideDropdownMenu);
      });
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
    this.props.createSetTypeRoom(typeroom);
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
  addMatch=()=>{
    console.log("matchModalData ::: ",this.props.matchModalData)
    this.createSetFieldId()
    this.createSetPublicShow()

    this.state.clickedFieldDetail = []
    if(
      this.props.matchModalData.matchname &&
      this.props.matchModalData.fieldid &&
      this.props.matchModalData.date){
        this.props.addMatch();
        this.props.modalClose();
      }else{
        alert('Please complete the information!!!')
      }
  }
  showFieldFromLoad = () => {
    if(!this.createModalRefresh ){
      this.createModalRefresh = true;
      this.state.field=[]
      for(var i = 0;i < this.props.fieldDetail.length ;i++){
        this.state.field.push(this.props.fieldDetail[i]);
      }
      console.log('this.state.field ::',this.state.field);
      console.log("this.state.clickedFieldID",this.state.clickedFieldID);
      this.setState(this.state);
    }
  }
  switchToggleState=(value)=>{
    if(value){
      this.state.publicShow = 1
    }else{
      this.state.publicShow = 0
    }
    console.log("this.state.publicShow:::",this.state.publicShow);
  }
  render(){

    if(this.props.modalState){
      setTimeout(this.showFieldFromLoad,500);
      return(
        <div className="modal-creatematch">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal-creatematch__grid">
            <div className="spacer"></div>
            <div className="modal-creatematch__card">
              <div className="modal-creatematch__items">
                <label>Match name</label>
                <EditTextImg type="text" placeholder="Match name" formType="username"
                  editTextValue={this.createSetMatchName}/>
              </div>
              <div className="modal-creatematch__items">
                <p>Public</p>
                <SwitchToggle switchToggleState={this.switchToggleState}/>
              </div>
              <div className="modal-creatematch__items">
                <label>{'Location'}</label>
                  <div  className="dropdown__item">
                   <button onClick={this.showDropdownMenu}>Select Field</button>
                    { this.state.displayMenu ? (
                      <div className="dropdown__item">
                      {this.state.field.map((d) =>
                        <button onClick={
                            (e)=>{
                              this.getField(d.fieldid)
                            }
                          }>{d.fieldname}</button>
                        )}
                      </div>
                    ):(null)}
                    <select onChange={(e)=>this.getCourt(e.target.value,0)}>
                      {this.state.FieldCourt.map((data,i)=>
                        <option value={data}>{data}</option>
                      )}
                    </select>
                    <select onChange={(e)=>this.getCourt(e.target.value,1)}>
                      {this.state.FieldCourt.map((data,i)=>
                        <option value={data}>{data}</option>
                      )}
                    </select>
                  </div>
              </div>
              <div className="modal-creatematch__items">
                <label>Team</label>
                <EditTextImg type="number" formType="username" placeholder="How many team?"
                  editTextValue={this.createSetTeamNumber}/>
              </div>
              <div className="modal-creatematch__items">
                <label>Department</label>
                <EditTextImg type="number" formType="department" placeholder="How many Department?"
                  editTextValue={this.createSetDepartmentNumber}/>
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
            <div className="spacer"></div>
          </div>
          <div className="spacer"></div>
        </div>
      );
    }
    return null;
  }
}
export default ModalCreateMatch;
