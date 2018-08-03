import React from 'react'
import './EditText.css'

class EditText extends React.Component{
  constructor(props){
    super(props);
  }

  editTextValue=(val)=>{
    this.props.editTextValue(val);
  }


  render(){
    return(
      <div>
        <input type={this.props.type} placeholder={this.props.placeholder} onChange={(e)=>this.editTextValue(e.target.value)}/>
      </div>
    );
  }
}

export default EditText
