import React from 'react'
import './CreateField.css'
import $ from 'jquery'

import ModalBackDrop2 from './ModalBackDrop2'
import EditTextImg from '../EditText/EditTextImg'

class CreateField extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      hole:[1,2,3,4,5,6,7,8,9,19,20,21,22,23,24,25,26,27],
      hcp:[10,11,12,13,14,15,16,17,18,28,29,30,31,32,33,34,35,36],
      arrscore:[],
      fieldname:''
    }
  }
  createFieldSetFieldName = (data)=>{
    this.state.fieldname = data
  }
  getHoleScore = (score,i) =>{
    this.state.arrscore[i] = parseInt(score)
  }
  getHCPScore = (score,i) =>{
    this.state.arrscore[i] = parseInt(score)
  }
  handleCreateCustomField = () =>{
    if(this.state.fieldname  === undefined || this.state.fieldname  === null || this.state.fieldname  === ""){
      alert("Please complete field detail")
    }else{
      var geturl;
      geturl = $.ajax({
        type: "POST",
       url: "http://pds.in.th/phpadmin/createcustomfield.php",
       dataType: 'json',
       data: {
         fieldname: this.state.fieldname,
         arrscore: this.state.arrscore,
       },
       xhrFields: { withCredentials: true },
       success: function(data) {
         localStorage['status']=data.status;
         console.log(data);
       }
      });
      setTimeout(()=>{
        if(localStorage['status'] === 'field success'){
          this.props.loadField()
          setTimeout(()=>{
            this.props.modalClick()
          },200)
        }else{
          alert(localStorage['status'])
        }
      },500)
      localStorage.clear()
    }
  }
  render(){
    if(this.props.modalState){
      this.state.arrscore = []
      return(
        <div className="createfield">
          <ModalBackDrop2 click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="createfield__grid">
            <div onClick = {this.props.modalClick} className="spacer"></div>
            <div className="createfield__card">
              <div className="createfield__fieldname">
                <EditTextImg type="text" placeholder="Field name" formType="username"
                  editTextValue={this.createFieldSetFieldName}/>
              </div>
              <div className="createfield__hole">
                <div className="spacer"></div>
                <div className="createfield__hole__item">
                  <p>Hole score</p>
                  {this.state.hole.map((d,i)=>
                    <input type="text" placeholder={i+1} onChange={(e)=>this.getHoleScore(e.target.value,d-1)}></input>
                  )}
                </div>
                <div className="spacer"></div>
              </div>
              <div className="createfield__hcp">
                <div className="spacer"></div>
                <div className="createfield__hole__item">
                  <p>HCP score</p>
                  {this.state.hcp.map((d,i)=>
                    <input type="text" placeholder={i+1} onChange={(e)=>this.getHCPScore(e.target.value,d-1)}></input>
                  )}
                </div>
                <div className="spacer"></div>
              </div>
              <button onClick = {this.props.modalClick}>Cancel</button>
              <button onClick = {this.handleCreateCustomField}>Create</button>
            </div>
            <div onClick = {this.props.modalClick} className="spacer"></div>
          </div>
          <div className="spacer"></div>
        </div>
      );
    }else{
      return null
    }
  }
}

export default CreateField;
