import React from 'react'
import './ModalCreateMatch.css'
import $ from 'jquery'

import ModalBackDrop from './ModalBackDrop'
import EditText from '../EditText/EditText'
import EditTextImg from '../EditText/EditTextImg'
import Button from '../Button/Button'

class ModalCreateMatch extends React.Component{
  constructor(props){
    super(props)
    this.createModalRefresh = false;
    this.state={
      field:[],
      dataLength:0,
      clickedFieldDetail:[],
      clickedFieldCourt:[],
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
    console.log("this.state.clickedFieldDetail :::",this.state.clickedFieldDetail)
    this.props.createSetFieldId(this.state.clickedFieldDetail);
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
    console.log("clickedFieldID before",this.state.clickedFieldID)
    this.state.clickedFieldDetail = []
    console.log("this.state.clickedFieldDetail.push :::",this.state.clickedFieldDetail);
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
        this.state.clickedFieldDetail = []
        this.state.clickedFieldDetail.push(this.state.clickedFieldID)
        this.state.clickedFieldID = []
        for(var i = 0;i < fieldcord.length;i++){
          /*var obj = {
            fieldcord: fieldcord[i]
          }*/
          this.state.clickedFieldDetail.push(fieldcord[i]);
        }
        //this.state.clickedFieldCourt.push(fieldcord[i]);
        console.log("this.state.clickedFieldDetail.push(obj) :::",this.state.clickedFieldDetail)
        //this.setState({dataLength: this.state.fieldFromLoad.length})//-------
      }
      this.createModalRefresh = false;
      this.showFieldFromLoad()
    },500)
    localStorage.clear()
  }
  getCourt = (Court)=>{
    this.state.clickedFieldCourt = Court
  }
  addMatch=()=>{
    console.log("matchModalData ::: ",this.props.matchModalData)
    this.createSetFieldId()
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
      this.setState(this.state);
    }
  }

  render(){

    if(this.props.modalState){
      setTimeout(this.showFieldFromLoad,1000);
      return(
        <div className="modal-creatematch">
          <ModalBackDrop click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="modal-creatematch__grid">
            <div className="spacer"></div>
            <div className="modal-creatematch__card">
              <label>Match name</label>
              <EditTextImg type="text" placeholder="Match name" formType="username"
                editTextValue={this.createSetMatchName}/>
              <label>{'Location'}</label>
                <div  className="dropdown" style={{position: 'fixed',center: '0'}}>
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
                  ):(null)
                  }
                </div>
                <select onChange={(e)=>this.getCourt(e.target.value)}>
                  {this.state.clickedFieldCourt.map((data,i)=>
                    <option value={data}>{data}</option>
                  )}
                </select>
                <select onChange={(e)=>this.getCourt(e.target.value)}>
                  {this.state.clickedFieldCourt.map((data,i)=>
                    <option value={data}>{data}</option>
                  )}
                </select>
              <label>Team</label>
              <EditTextImg type="number" formType="username" placeholder="How many team?"
                editTextValue={this.createSetTeamNumber}/>
              <label>Department</label>
              <EditTextImg type="number" formType="department" placeholder="How many Department?"
                editTextValue={this.createSetDepartmentNumber}/>
              <label>{'Date'}</label>
              <EditTextImg type="date" placeholder="Date" formType="username"
                editTextValue={this.createSetDate}/>
              <label>Room password</label>
              <EditTextImg type="password" placeholder="Set password to access" formType="password"
                editTextValue={this.createSetTypeRoom}/>
              <Button btnLabel="Close" btnOnClick = {this.props.modalClose}></Button>
              <Button btnLabel="Create" btnOnClick = {this.addMatch}></Button>
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
