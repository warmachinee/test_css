import React from 'react'
import './DropDown.css'

class DropDown extends React.Component{
  super(props){
    this.state ={
    }
  }

  getActivityRequest = (data,i) =>{
    console.log("data,i",data," :: ",i)
    console.log("data.matchid ::",data.matchid);
    console.log("data.userid ::",data.userid);
    console.log("data.action ::",data.action);
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
      const textAction = ['RequestFromUser','RequestFromHost'];
      let i = 0;
      if(this.props.activityRequest.action===0){
        i=0;
      }else{
        i=1;
      }
      return(
        <div className ="noti__box">
          {this.props.activityRequest.map((data,i)=>
            <div className="noti__items">
              <div className="noti__text">UserID : {data.userid} {textAction[i]}</div>
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
      );
    }else{
      return null
    }

  }
}

export default DropDown;
