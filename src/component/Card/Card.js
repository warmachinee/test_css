import React from 'react'
import './Card.css'

import ic_person_add from '../img/baseline-person_add-24px.svg'
import ic_location from '../img/baseline-place-24px.svg'
import ic_edit from '../img/baseline-edit-24px-white.svg'
import ic_game from '../img/baseline-videogame_asset-24px-white.svg'
import ic_calculator from '../img/baseline-games-24px-white.svg'
import ic_lock from '../img/baseline-lock-24px.svg'

class Card extends React.Component{
  constructor(props){
    super(props)
    this.state={
      userID:'',
    }
    this.stateID=''
  }
  sentCardTargetData = (Data) =>{
    this.props.getCardTargetData(Data)
  }
  getCardMatchID = (value)=>{
    //this.props.targetClickID(value)
    //console.log("Value ::",value);
    console.log("Card.js userid::",this.props.userID);
    //this.state.userID = this.props.userID()
    console.log("Value id :::",value.userhost);
    if(parseInt(this.props.userID) === value.userhost){
      this.props.addPeopleClick()
      this.props.setInviteAction(0)
      this.props.sentRequestPlayer(value)
      //setTimeout(this.props.matchDetailClick,1000)
    }else{
      this.props.setInviteAction(1)
      this.props.sentRequestPlayerNotOwn(value)
      alert('Sent join request')
    }
    /**/
  }
  render(){
    let cardMatchName = "Match Name"
    let cardDate ="01/01/2012"
    let cardLocation = "Location"
    let cardPrivateDrawer = 'card-private public'

    if(this.props.cardPrivate){
      cardPrivateDrawer = 'card-private private'
    }
    return(
      <div className="card-box">
        <div className="card">
          <div className="card-item-large">
            <div className="card-match-lock">
              <img className={cardPrivateDrawer} src={ic_lock}></img>
              <div className="card-detail-match">{this.props.data.matchname}</div>
            </div>
            <div className="card-detail-date">{this.props.data.date}</div>
            <div className="card-detail-locationgroup">
              <img className="card-detail-img" src={ic_location}></img>
              <div className="card-detail-location">{this.props.data.fieldname}</div>
            </div>
            <div className="card-detail-date">{this.props.data.userhost}</div>
            <div className="card-spacer"></div>
            <div className="card-add-detail">
              <a onClick={(e)=>this.getCardMatchID(this.props.data)} className="card-add"><img src={ic_person_add}></img></a>
              <div className="card-spacer-add-detail"></div>
              <button className="card-detail">DETAIL</button>
            </div>
          </div>
          <div className="card-item-small">
            <a className="card-edit"><img src={ic_edit}></img></a>
            <div className="card-spacer"></div>
            <a className="card-games"><img src={ic_game}></img></a>
            <div className="card-spacer"></div>
            <a onClick={this.props.addScoreClick} className="card-calculator"><img src={ic_calculator}></img></a>
          </div>
        </div>
      </div>
    );

  }
}

export default Card;
