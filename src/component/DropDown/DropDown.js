import React from 'react'
import './DropDown.css'

import BackDropTrans from '../BackDrop/BackDropTrans'
class DropDown extends React.Component{
  super(props){
    this.state ={
    }
  }

  getActivityRequest = (data,i) =>{
    var obj = {
      matchid: data.matchid,
      userTarget: data.userid,
      action: data.action,
      status: i
    }
    this.props.getActivityRequest(obj)
  }
  render(){
    if(this.props.notiState){
      const textAction = ['RequestFromHost','RequestFromUser'];
      if(this.props.activityRequest.length !== 0){
        return(
          <div>
            <BackDropTrans click={this.props.notiClick}/>
            <div className ="noti__box">
              {this.props.activityRequest.map((data,i)=>
                <div className="noti__items">
                  <div className="noti__text">UserID : {data.userid} <br></br>Match id : {data.matchid} {textAction[data.action]}</div>
                  <div className="spacer"></div>
                  <div className="noti__btn">
                    <button
                      className="noti__accept"
                      onClick={(e)=>this.getActivityRequest(data,0)}>ACCEPT</button>
                    <button
                      className="noti__reject"
                      onClick={(e)=>this.getActivityRequest(data,1)}>REJECT</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }else{
        return(
          <div>
            <BackDropTrans click={this.props.notiClick}/>
            <div className ="noti__box">
                <div className="noti__items">
                  <div className="spacer"></div>
                  <div className="middle__request">
                    <div className="spacer"></div>
                    <div className="middle__request noti__text">No request</div>
                    <div className="spacer"></div>
                  </div>
                  <div className="spacer"></div>
                </div>
            </div>
          </div>
        );
      }

    }else{
      return null
    }

  }
}

export default DropDown;
