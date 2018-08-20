import React from 'react'
import './SelectField.css'

import ModalBackDrop2 from './ModalBackDrop2'
class SelectField extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      filterList:'',
      FieldDetail:{
        fieldname:'no field'
      }
    }
  }
  getField =(data)=>{
    console.log("data",data.fieldname);
    this.setState({
      FieldDetail: {
        fieldname: data.fieldname
      }
    })
  }
  setInputValue = (data) =>{
    this.setState({filterList: data.target.value})
  }
  render(){
    const testField = []
    const dataTestField = {
      fieldname: ['Field1','Field2','Field3','Field4','Field5','Field6',],
      fieldid: ['1','2','3','4','5','6',]
    }
    for(var i = 0;i < dataTestField.fieldid.length;i++){
      var obj = {
        fieldname: dataTestField.fieldname[i],
        fieldid: dataTestField.fieldid[i]
      }
      testField.push(obj);
    }
    if(this.props.modalState){
      return(
        <div className="selectfield">
          <ModalBackDrop2 click = {this.props.modalClick}/>
          <div className="spacer"></div>
          <div className="selectfield__grid">
            <div onClick = {this.props.modalClick} className="spacer"></div>
            <div className="selectfield__card">
              <p>SelectField</p>
              {this.props.field.map((data)=>
                <button onClick={()=>this.getField(data.fieldid)}>{data.fieldname}</button>
              )}
              <div className="selectfield___search">
                <input type='text' onChange={this.setInputValue}></input>
              </div>
              <div className="selectfield__fieldlist">
                {testField.filter(
                  (item)=>{
                    return (item.fieldname.toLowerCase().search(this.state.filterList.toLowerCase()) !== -1)
                  }
                ).map((data)=>
                  <button className="selectfield__fielditem"
                    onClick={()=>this.getField(data)}>{data.fieldname}</button>
                )}
              </div>
              <div className="selectfield__fielddetail">
                <p>Field name : {this.state.FieldDetail.fieldname}</p>
                <select>
                  <option>1</option>
                  <option>2</option>
                </select>
                <select>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
              <button onClick = {this.props.modalClick}>Cancel</button>
              <button>Confirm</button>
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

export default SelectField;
