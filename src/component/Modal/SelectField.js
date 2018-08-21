import React from 'react'
import $ from 'jquery'
import './SelectField.css'

import ModalBackDrop2 from './ModalBackDrop2'
import SwitchToggle from '../Switch/SwitchToggle'

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
      editCustomHolescore:[],
      editCustomHCP:[],
      hole:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
      confirmCancel: false,
    }
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
    },700)
  }
  editCustomFieldToggle = (data) =>{
    this.state.editCustomHolescore = []
    this.state.editCustomHCP = []
    this.state.editCustomFieldID = data.fieldid
    this.state.editCustomFieldName = data.fieldname
    this.state.editCustomHolescore = data.holescore
    this.state.editCustomHCP = data.hcp
    console.log("editCustomHolescore",this.state.editCustomHolescore);
    console.log("editCustomHCP",this.state.editCustomHCP);
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
     url: "http://pds.in.th/phpadmin/deletecustomfield.php",
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
    console.log("this.props.customField",this.props.customField);
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
    console.log("field",this.state.field);
    if(this.props.modalState){
      return(
        <div className="selectfield">
          <ModalBackDrop2 click = {this.toggleSelect}/>
          <div className="spacer"></div>
          <div className="selectfield__grid">
            <div onClick = {this.toggleSelect} className="spacer"></div>
            <div className="selectfield__card">
              <p>SelectField</p>
              <div className="selectfield__switch">
                <p>Show custom field</p>
                <SwitchToggle switchToggleState={this.switchToggleState}/>
              </div>
              <div className="selectfield___search">
                <input type='text' onChange={this.setInputValue}></input>
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
                      onClick={()=>this.editCustomFieldToggle(data)}>edit</button>
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
                <button className="selectfield__fielditem__edit"
                  onClick={()=>this.editCustomFieldToggle()}>edit</button>
              </div>
              <div className="selectfield__fielddetail">
                <p>Field name : {this.state.fieldname}</p>
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
              <button onClick = {this.toggleSelect}>Cancel</button>
              <button onClick = {this.confirmSelect}>Confirm</button>
            </div>
            <div onClick = {this.toggleSelect} className="spacer"></div>
          </div>
          <div className="spacer"></div>
        </div>
      );
    }else if(this.state.editCustomField){
      return(
        <div className="selectfield">
          <ModalBackDrop2 click = {this.toggleSelectUpdate}/>
          <div className="spacer"></div>
          <div className="selectfield__grid">
            <div onClick = {this.toggleSelectUpdate} className="spacer"></div>
            <div className="selectfield__card">
              <div className="selectfield__edit__fieldname">
                <input type="text" placeholder={this.state.editCustomFieldName}/>
                <button onClick={this.confirmCancelToggle}>Delete</button>
                {
                  (this.state.confirmCancel)?
                  (
                    <div>
                      <button onClick={this.handlerDeleteCustomField}>Confirm</button>
                      <button onClick={this.confirmCancelToggle}>Cancel</button>
                    </div>
                  ):(null)
                }
              </div>

              <div className="selectfield__edit__hole">
                <div className="spacer"></div>
                <div className="selectfield__edit__hole__item">
                  <p>Hole score</p>
                  {this.state.editCustomHolescore.map((d,i)=>
                    <input type="text" placeholder={i}></input>
                  )}
                </div>
                <div className="spacer"></div>
              </div>

              <div className="selectfield__edit__hole">
                <div className="spacer"></div>
                <div className="selectfield__edit__hole__item">
                  <p>HCP</p>
                  {this.state.editCustomHCP.map((d,i)=>
                    <input type="text" placeholder={i}></input>
                  )}
                </div>

                <div className="spacer"></div>
              </div>
              <button onClick={()=>this.toggleSelectUpdate()}>Cancel</button>
              <button >Update</button>
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
