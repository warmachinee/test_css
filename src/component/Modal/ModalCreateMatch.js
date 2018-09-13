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
      getExportFieldName:'',
      customField:[],
      dataLength:0,
      publicShow: 0,
      tournamentMode: 0,
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
  createSetTourMode=()=>{
    this.props.tourMode(this.state.tournamentMode)
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
    this.createSetFieldId()
    this.createSetPublicShow()
    this.createSetTourMode()
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
  exportFieldName = (data) =>{
    this.setState({getExportFieldName: data})
  }
  switchToggleStatePublic=(value)=>{
    if(value){
      this.setState({publicShow: 1})
    }else{
      this.setState({publicShow: 0})
    }
    //console.log(this.state.publicShow);
  }
  switchToggleStateTournamentMode=(value)=>{
    if(value){
      this.setState({tournamentMode: 1})
    }else{
      this.setState({tournamentMode: 0})
    }
    //console.log(this.state.tournamentMode);
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
              <div onClick = {this.modalToggle} className="spacer"></div>
              <div className="modal-creatematch__card">
                <div className="creatematch__matchname__text">Match name</div>
                <div className="creatematch__switchtour">
                  <div className="creatematch__switchtour__label">Tournament</div>
                  <SwitchToggle switchToggleState={this.switchToggleStateTournamentMode}/>
                </div>
                <div className="creatematch__matchname">
                  <EditTextImg type="text" placeholder="Match name" formType="matchname"
                    editTextValue={this.createSetMatchName}/>
                </div>
                <div className="roomtype__scoretype">
                  <div className="creatematch__switchpub">
                    {(this.state.publicShow)?(
                      <div className="creatematch__switchpub__label">Public</div>
                    ):(<div className="creatematch__switchpub__label">Private</div>)}
                    <SwitchToggle switchToggleState={this.switchToggleStatePublic}/>
                  </div>
                  <div className="creatematch__typeroom">
                    <div className="creatematch__typeroom__label">Score type</div>
                    <select className="creatematch__typeroom__option"
                      onChange={(e)=>this.getTypeScore(e.target.value)}>
                      <option value={0}>Stableford</option>
                      <option value={1}>{"36 System"}</option>
                      <option value={2}>Par</option>
                    </select>
                  </div>
                </div>
                <div className="locationselect">
                  <div className="locationselect__label">
                    <div className="locationselect__label__label">{'Court'}</div>
                    <div className="locationselect__label__data">{this.state.getExportFieldName}</div>
                  </div>
                  <div className="locationselect__button">
                    <div className="creatematch__selectfield">
                      <button onClick = {this.selectFieldToggle}>Select Field</button>
                    </div>
                    <div className="creatematch__selectfield">
                      <button onClick = {this.createFieldToggle}>Create Field</button>
                    </div>
                  </div>
                </div>
                <div className="team__depart">
                  <div className="creatematch__team">
                    <div className="team__depart__label">{"จำนวนประเภทการแข่งขัน"}</div>
                    <EditTextImg type="number" formType="team" placeholder="0"
                      editTextValue={this.createSetTeamNumber}/>
                  </div>
                  <div className="creatematch__depart">
                    <div className="team__depart__label">{"จำนวนหน่วยงาน"}</div>
                    <EditTextImg type="number" formType="department" placeholder="0"
                      editTextValue={this.createSetDepartmentNumber}/>
                  </div>
                </div>
                <div className="team__depart">
                  <div className="creatematch__depart">
                    <div className="team__depart__label">{"Date"}</div>
                    <EditTextImg type="date" formType="date" placeholder="Date"
                      editTextValue={this.createSetDate}/>
                  </div>
                </div>
                <div className="team__depart">
                  <div className="creatematch__depart">
                    <div className="team__depart__label">{"Room password"}</div>
                    <EditTextImg type="password" formType="password" placeholder="Set password to access"
                      editTextValue={this.createSetTypeRoom}/>
                  </div>
                </div>
                <div className="creatematch__card__button">
                  <button className="addpeople__card__close" onClick = {this.props.modalClose}>Close</button>
                  {(this.props.updateMatchState)?
                    (<button className="creatematch__card__add"
                      onClick = {this.MatchHandle}>Update</button>):
                    (<button className="creatematch__card__add"
                      onClick = {this.MatchHandle}>Create</button>)}
                </div>
              </div>
              <div onClick = {this.modalToggle} className="spacer"></div>
            <div onClick = {this.modalToggle} className="spacer"></div>
          </div>
          <div className="spacer"></div>
          <SelectField
            refresh = {this.props.refresh}
            field = {this.state.field}
            exportFieldName = {this.exportFieldName}
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
