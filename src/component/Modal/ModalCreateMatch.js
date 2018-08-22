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
      customField:[],
      dataLength:0,
      publicShow: 0,
      clickedFieldDetail:[],
      clickedFieldCourt:[],
      FieldCourt:[],
      FieldScoreDetail:[],
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
    this.state.FieldScoreDetail = []
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
       localStorage['fieldscore']=data.fieldscore;
       localStorage['fieldHscore']=data.fieldHscore;
       console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['fieldcord']){
        var fieldcord = localStorage['fieldcord'];
        var fieldscore = localStorage['fieldscore'];
        var fieldHscore = localStorage['fieldHscore'];

        fieldcord = fieldcord.split(",",fieldcord.length)
        fieldscore = fieldscore.split(",",fieldscore.length)
        fieldHscore = fieldHscore.split(",",fieldHscore.length)

        this.state.FieldCourt = []
        for(var i = 0;i < fieldcord.length;i++){
          this.state.FieldCourt.push(fieldcord[i]);
        }
        for(var i = 0;i < fieldscore.length;i++){
          this.state.FieldScoreDetail.push({
            fieldscore: fieldscore[i],
            fieldHscore: fieldHscore[i]
          })
        }
      }
      this.setState(this.state)
    },500)
    localStorage.clear()
  }
  sendFieldDetail=(data)=>{
    for(var i = 0;i < data.length;i++){
      this.state.clickedFieldDetail.push(data[i])
    }
  }

  getTypeScore = (type)=>{
    this.state.typescore = type
  }
  MatchHandle=()=>{
    //console.log("matchModalData",this.props.matchModalData)
    this.createSetFieldId()
    this.createSetPublicShow()
    this.createSetTypeScore()
    this.state.clickedFieldDetail = []
    if(this.props.updateMatchState){
      console.log("Update");
      this.props.updateMatch()
      //this.props.modalClose();
    }else{
      if(this.state.roomPassword.length <= 4){
        console.log("Create");
        if(
          this.props.matchModalData.matchname &&
          this.props.matchModalData.fieldid &&
          this.props.matchModalData.date){
            this.props.addMatch();
            this.props.modalClose();
          }else{
            alert('Please complete the information!!!')
          }
      }else{
        console.log("Create");
        if(this.state.roomPassword === undefined || this.state.roomPassword === "" || this.state.roomPassword === null){
          alert('Room password 4-digit at least')
        }else{
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
      }
    }
  }
  switchToggleState=(value)=>{
    if(value){
      this.setState({publicShow: 1})
    }else{
      this.setState({publicShow: 0})
    }
    console.log(this.state.publicShow);
  }
  selectFieldToggle = ()=>{
    this.props.loadField()
    setTimeout(()=>{
      this.props.refresh()
    },500)
    this.setState((state)=>{
      return {selectFieldState: !state.selectFieldState}
    })
  }
  createFieldToggle = ()=>{
    this.setState((state)=>{
      return {createFieldState: !state.createFieldState}
    })
  }
  createModalRefreshToggle = ()=>{
    this.selectFieldToggle()
  }
  modalToggle =()=>{
    if(this.props.updateMatchState){
      this.props.modalClick("update")
    }else{
      this.props.modalClick("create")
    }
  }
  render(){
    if(this.props.modalState){
      this.state.field=[]
      this.state.customField = []
      for(var i = 0;i < this.props.fieldDetail.length ;i++){
        this.state.field.push(this.props.fieldDetail[i]);
      }
      for(var j = 0;j < this.props.customFieldDetail.length ;j++){
        this.state.customField.push({
          fieldid: this.props.customFieldDetail[j].fieldid,
          fieldname: this.props.customFieldDetail[j].fieldname,
          holescore: this.props.customFieldDetailScore[j].holescore,
          hcp: this.props.customFieldDetailScore[j].hcp
        })
      }
      return(
        <div className="modal-creatematch">
          <ModalBackDrop click = {this.modalToggle}/>
          <div className="spacer"></div>
          <div className="modal-creatematch__grid">
            <div onClick = {this.modalToggle} className="spacer"></div>
            <div className="modal-creatematch__card">
              <div className="creatematch__matchname">
                <label>Match name</label>
                <EditTextImg type="text" placeholder="Match name" formType="username"
                  editTextValue={this.createSetMatchName}/>
              </div>
              <div className="roomtype__scoretype">
                <div className="creatematch__switchpub">
                  {(this.state.publicShow)?(
                    <p>Public</p>
                  ):(<p>Private</p>)}
                  <SwitchToggle switchToggleState={this.switchToggleState}/>
                </div>
                <div className="creatematch__typeroom">
                  <p>Score type</p>
                  <select onChange={(e)=>this.getTypeScore(e.target.value)}>
                    <option value={0}>Stableford</option>
                    <option value={1}>{"36 System"}</option>
                    <option value={2}>Par</option>
                  </select>
                </div>
              </div>
              <div className="locationselect">
                <label className="locationselect__label">{'Court'}</label>
                <button onClick = {this.selectFieldToggle}
                  className="creatematch__selectfield">Select Field</button>
                <button onClick = {this.createFieldToggle}
                  className="creatematch__selectfield">Create Custom Field</button>
              </div>
              <div className="team__deaprt">
                <div className="creatematch__team">
                  <label>{"Team (Amount)"}</label>
                  <EditTextImg type="number" formType="username" placeholder="0"
                    editTextValue={this.createSetTeamNumber}/>
                </div>
                <div className="creatematch__depart">
                  <label>{"Department (Amount)"}</label>
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
              {(this.props.updateMatchState)?
                (<button onClick = {this.MatchHandle}>Update</button>):(<button onClick = {this.MatchHandle}>Create</button>)}
            </div>
            <div onClick = {this.modalToggle} className="spacer"></div>
          </div>
          <div className="spacer"></div>
          <SelectField
            refresh = {this.props.refresh}
            field = {this.state.field}
            fieldScore = {this.state.FieldScoreDetail}
            fieldCourt = {this.state.FieldCourt}
            getFieldDetail = {this.sendFieldDetail}
            getField = {this.getField}
            customField = {this.state.customField}
            modalClick = {this.selectFieldToggle}
            modalState = {this.state.selectFieldState}/>
          <CreateField
            loadField = {this.props.loadField}
            modalClick = {this.createFieldToggle}
            modalState = {this.state.createFieldState}/>
        </div>
      );
    }
    return null;
  }
}
export default ModalCreateMatch;
