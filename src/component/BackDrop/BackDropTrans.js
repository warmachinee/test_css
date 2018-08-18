import React from 'react'

import './BackDropTrans.css'

class BackDropTrans extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="backdroptrans" onClick={this.props.click}/>
    );
  }
}

export default BackDropTrans;
