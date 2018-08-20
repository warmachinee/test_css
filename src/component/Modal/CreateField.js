import React from 'react'
import './CreateField.css'

import ModalBackDrop2 from './ModalBackDrop2'
import EditTextImg from '../EditText/EditTextImg'

class CreateField extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      hole:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
      hcp:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    }
  }
  getHoleScore = (data,i) =>{
    console.log(i);
  }
  render(){
    if(this.props.modalState){
      return(
        <div className="createfield">
          <ModalBackDrop2 click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="createfield__grid">
            <div onClick = {this.props.modalClick} className="spacer"></div>
            <div className="createfield__card">
              <div className="createfield__fieldname">
                <EditTextImg type="text" placeholder="Field name" formType="username"
                  editTextValue={this.createSetMatchName}/>
              </div>
              <div className="createfield__hole">
                <div className="spacer"></div>
                <div className="createfield__hole__item">
                  <p>Hole score</p>
                  {this.state.hole.map((d)=>
                    <input type="text" placeholder={d} onChange={(e)=>this.getHoleScore(e.target.value,d)}></input>
                  )}
                </div>
                <div className="spacer"></div>
              </div>
              <div className="createfield__hcp">
                <div className="spacer"></div>
                <div className="createfield__hole__item">
                  <p>HCP score</p>
                  {this.state.hcp.map((d)=>
                    <input type="text" placeholder={d} onChange={(e)=>this.getHoleScore(e.target.value,d)}></input>
                  )}
                </div>
                <div className="spacer"></div>
              </div>
              <button onClick = {this.props.modalClick}>Cancel</button>
              <button>Create</button>
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
