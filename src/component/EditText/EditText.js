import React from 'react'
import './EditText.css'

const EditText = props =>(
  <div>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>
);

export default EditText
