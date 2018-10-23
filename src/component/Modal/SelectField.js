import React from 'react'
import $ from 'jquery'
import './SelectField.css'

import ModalBackDrop2 from './ModalBackDrop2'
import SwitchToggle from '../Switch/SwitchToggle'
import EditTextImg from '../EditText/EditTextImg'

class SelectField extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      refreshSelect:true,
      editCustomField: false,
      switchToggleCus: false,
      filterList:'',
      fieldname:'no field',
      court: [],
      field:[],
      clickedCourt:[],
      editCustomFieldID:'',
      editCustomFieldName:'',
      editedCustomFieldName:'',
      editCustomHolescore:[],
      editCustomHCP:[],
      scoreSet:[],
      hole:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
      confirmCancel: false,
    }
  }
  getScore=(score,hole)=>{
    this.state.scoreSet[hole]=score
  }
  editCustomFieldName =(data)=>{
    this.state.editedCustomFieldName = data
  }
  updateCustomField = ()=>{
    var editedScoreset = this.state.scoreSet
    var editedFieldName = this.state.editedCustomFieldName
    for(var i =0;i < 18;i++){
      if(editedScoreset[i] === -1){
        editedScoreset[i] = this.state.editCustomHolescore[i]
      }
    }
    for(var j = 18;j < 36;j++){
      if(editedScoreset[j] === -1){
        editedScoreset[j] = this.state.editCustomHCP[j-18]
      }
    }
    if(this.state.editedCustomFieldName === "" || this.state.editedCustomFieldName === undefined || this.state.editedCustomFieldName === null){
      editedFieldName = this.state.editCustomFieldName
    }
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://www.thai-pga.com/phpadmin/updatecustomfield.php",
     dataType: 'json',
     data: {
       fieldid: this.state.editCustomFieldID,
       fieldname: editedFieldName,
       arrscore: editedScoreset
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['status']=data.status;
       console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['status'] === 'update customfield success'){
        alert(localStorage['status'])
        this.toggleSelectUpdate()
      }else{
        alert(localStorage['status'])
      }
    },200)
    localStorage.clear()
  }
  getField =(data)=>{
    this.props.getField(data.fieldid)
    this.state.court = ['-']
    this.state.clickedCourt = []
    setTimeout(()=>{
      for(var i =0;i < this.props.fieldCourt.length;i++){
          this.state.court.push(this.props.fieldCourt[i])
      }
      this.setState({fieldname: data.fieldname})
      this.props.exportFieldName(this.state.fieldname)
    },700)
  }
  editCustomFieldToggle = (data) =>{
    this.state.editCustomHolescore = []
    this.state.editCustomHCP = []
    this.state.editCustomFieldID = data.fieldid
    this.state.editCustomFieldName = data.fieldname
    this.state.editCustomHolescore = data.holescore
    this.state.editCustomHCP = data.hcp
    this.toggleSelectUpdate()
  }
  toggleSelectUpdate = ()=>{
    this.props.modalClick()
    this.setState((state)=>{
      return {
        editCustomField: !state.editCustomField,
        switchToggleCus: false
      }
    })
  }
  toggleSelect =()=>{
    this.state.field = []
    this.setState({switchToggleCus: false})
    this.props.modalClick()
  }
  confirmCancelToggle = ()=>{
    this.setState((state)=>{
      return {confirmCancel: !state.confirmCancel}
    })
  }
  getCourt = (court,i)=>{
    this.state.clickedCourt[i] = court
    console.log(this.state.clickedCourt);
    this.setState(this.state)
  }
  setInputValue = (data) =>{
    this.setState({filterList: data.target.value})
  }
  switchToggleState=(value)=>{
    this.state.court = []
    setTimeout(this.props.refresh,500)
    this.setState({
      switchToggleCus: value,
      fieldname: 'no field'
    })

  }
  confirmSelect = () =>{
    if(this.state.clickedCourt.length!==2){
      if(this.state.clickedCourt[0] === 1 || this.state.clickedCourt[1] === 2){
        this.props.getFieldDetail([1,2])
        this.props.modalClick()
      }else if(this.state.clickedCourt[0] === 2 || this.state.clickedCourt[1] === 1){
        this.props.getFieldDetail([2,1])
        this.props.modalClick()
      }else if(isNaN(this.state.clickedCourt[0]) || isNaN(this.state.clickedCourt[1])){
        alert('Please selectfield')
      }
    }else{
      if(isNaN(this.state.clickedCourt[0]) || isNaN(this.state.clickedCourt[1])){
        alert('Please selectfield')
      }else{
        this.props.getFieldDetail(this.state.clickedCourt)
        this.props.modalClick()
      }
    }
  }
  handlerDeleteCustomField = () =>{
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://www.thai-pga.com/phpadmin/deletecustomfield.php",
     dataType: 'json',
     data: {
       fieldid: this.state.editCustomFieldID,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['status']=data.status;
       console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['status'] === 'delete success'){
        alert(localStorage['status'])
        this.toggleSelectUpdate()
        this.props.refresh()
      }else{
        alert(localStorage['status'])
      }
    },200)
    localStorage.clear()
  }
  refresh = ()=>{
    if(this.state.refreshSelect){
      this.setState({refreshSelect: false})
    }
  }
  render(){
    this.state.field = []
    if(this.state.switchToggleCus){
      for(var i = 0;i < this.props.customField.length;i++){
        this.state.field.push(this.props.customField[i])
      }
    }else{
      for(var i = 0;i < this.props.field.length;i++){
        this.state.field.push(this.props.field[i])
      }
    }
    if(this.props.modalState){
      return(
        <div className="selectfield">
          <ModalBackDrop2 click = {this.toggleSelect}/>
          <div className="spacer"></div>
          <div className="selectfield__grid">
            <div onClick = {this.toggleSelect} className="spacer"></div>
            <div className="selectfield__card">
              <div className="selectfield__card__label__grid">
                <div className="selectfield__card__label">เลือกสนาม</div>
                <div className="selectfield__switch">
                  <div className="selectfield__switch__switch">
                    <SwitchToggle switchToggleState={this.switchToggleState}/>
                  </div>
                  <div className="selectfield__switch__label">Show custom field</div>
                </div>
              </div>
              <div className="selectfield___search">
                <EditTextImg type='text' placeholder="Search course name" editTextValue={this.setInputValue} formType='search'/>
              </div>
              <div className="selectfield__fieldlist">

                { (this.state.switchToggleCus)?
                  (this.state.field.filter(
                  (item)=>{
                    return (item.fieldname.toLowerCase().search(this.state.filterList.toLowerCase()) !== -1)
                  }
                ).map((data)=>
                  <div className="selectfield__fielditem">
                    <button className="selectfield__fielditem__field"
                      onClick={()=>this.getField(data)}>{data.fieldname}</button>
                    <button className="selectfield__fielditem__edit"
                      onClick={()=>this.editCustomFieldToggle(data)}>EDIT</button>
                  </div>
                )):(
                  this.state.field.filter(
                  (item)=>{
                    return (item.fieldname.toLowerCase().search(this.state.filterList.toLowerCase()) !== -1)
                  }
                ).map((data)=>
                  <div className="selectfield__fielditem">
                    <button className="selectfield__fielditem__field"
                      onClick={()=>this.getField(data)}>{data.fieldname}</button>
                  </div>
                )
                )}
              </div>
              <div className="selectfield__fielddetail">
                <div className="selectfield__fielddetail__label">
                  <div className="spacer"></div>
                  Field name : {this.state.fieldname}
                  <div className="spacer"></div>
                </div>
                  <div className="selectfield__fielddetail__option">
                    <select onChange={(e)=>this.getCourt(parseInt(e.target.value),0)}>
                      {this.state.court.filter(
                        (item)=>{
                          return (parseInt(item) !== this.state.clickedCourt[1])
                        }
                      ).map((court)=>
                        <option value={court}>{court}</option>
                      )}
                    </select>
                  </div>
                  <div className="selectfield__fielddetail__option">
                    <select onChange={(e)=>this.getCourt(parseInt(e.target.value),1)}>
                      {this.state.court.filter(
                        (item)=>{
                          return (parseInt(item) !== this.state.clickedCourt[0])
                        }
                      ).map((court)=>
                        <option value={court}>{court}</option>
                      )}
                    </select>
                  </div>
              </div>
              <div className="selectfield__card__button">
                <button className="selectfield__card__close" onClick = {this.toggleSelect}>Cancel</button>
                <button className="selectfield__card__add" onClick = {this.confirmSelect}>Confirm</button>
              </div>
            </div>
            <div onClick = {this.toggleSelect} className="spacer"></div>
          </div>
          <div className="spacer"></div>
        </div>
      );
    }else if(this.state.editCustomField){
      this.state.scoreSet = []
      for(var i = 0;i < 36;i++){
        this.state.scoreSet.push(-1)
      }
      return(
        <div className="selectfield">
          <ModalBackDrop2 click = {this.toggleSelectUpdate}/>
          <div className="spacer"></div>
          <div className="selectfield__grid">
            <div onClick = {this.toggleSelectUpdate} className="spacer"></div>
            <div className="selectfield__card">
              <div className="selectfield__edit__fieldname">
                <div className="selectfield__edit__card__label">SelectField</div>
                <EditTextImg type='text' placeholder={this.state.editCustomFieldName}
                  editTextValue={this.editCustomFieldName} formType='search'/>

                <button className ="selectfield__edit__card__delete" onClick={this.confirmCancelToggle}>Delete</button>
                {
                  (this.state.confirmCancel)?
                  (
                    <div>
                      <button className="selectfield__delete__confirm" onClick={this.handlerDeleteCustomField}>Confirm</button>
                      <button className="selectfield__delete__cancel" onClick={this.confirmCancelToggle}>Cancel</button>
                    </div>
                  ):(null)
                }
              </div>
              <div className="selectfield__edit__hole">
                <div className="spacer"></div>
                <div className="createfield__hole__item">
                  <div className="createfield__hole__label">Hole score</div>
                  {this.state.editCustomHolescore.map((d,i)=>
                    <input type="number" min="0" placeholder={i}
                      onChange={(e)=>this.getScore(e.target.value,i)}></input>
                  )}
                  {this.state.hole.map((d,i)=>
                    <input type="number" min="0" placeholder={i}
                      onChange={(e)=>this.getScore(e.target.value,i)}></input>
                  )}
                </div>
                <div className="spacer"></div>
              </div>

              <div className="selectfield__edit__hole">
                <div className="spacer"></div>
                <div className="createfield__hole__item">
                  <div className="createfield__hole__label">HCP</div>
                  {this.state.editCustomHCP.map((d,i)=>
                    <input type="number" min="0" placeholder={i}
                      onChange={(e)=>this.getScore(e.target.value,i+18)}></input>
                  )}
                  {this.state.hole.map((d,i)=>
                    <input type="number" min="0" placeholder={i}
                      onChange={(e)=>this.getScore(e.target.value,i)}></input>
                  )}
                </div>

                <div className="spacer"></div>
              </div>
              <div className="selectfield__edit__card__button">
                <button className="selectfield__edit__card__close" onClick = {()=>this.toggleSelectUpdate()}>Cancel</button>
                <button className="selectfield__edit__card__add" onClick = {this.updateCustomField}>Update</button>
              </div>
            </div>
            <div onClick = {this.toggleSelectUpdate} className="spacer"></div>
          </div>
          <div className="spacer"></div>
        </div>
      );
    }else{
      return null
    }
  }
}

export default SelectField;
