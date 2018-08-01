import React from 'react'
import './Button.css'

const Button = props =>{
  return(
    <button className="btn" onClick={props.btnOnClick}>{props.btnLabel}</button>
  );
};

export default Button
