import React from 'react'
import './Card.css'

import ic_person_add from '../img/baseline-person_add-24px.svg'
import ic_location from '../img/baseline-place-24px.svg'
import ic_edit from '../img/baseline-edit-24px-white.svg'
import ic_game from '../img/baseline-games-24px-white.svg'
import ic_calculator from '../img/baseline-videogame_asset-24px-white.svg'
import ic_lock from '../img/baseline-lock-24px.svg'

class Card extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let cardMatchName = "Match Name"
    let cardDate ="01/01/2012"
    let cardLocation = "Location"
    let cardPrivateDrawer = 'card-private public'
    if(this.props.cardMatchName){
      cardMatchName = this.props.cardMatchName
    }
    if(this.props.cardDate){
      cardDate = this.props.cardDate
    }
    if(this.props.cardLocation){
      cardLocation = this.props.cardLocation
    }
    if(this.props.cardPrivate){
      cardPrivateDrawer = 'card-private private'
    }
    return(
      <div className="card-box">
        <div className="card">
          <div className="card-item-large">
            <div className="card-match-lock">
              <img className={cardPrivateDrawer} src={ic_lock}></img>
              <div className="card-detail-match">{cardMatchName}</div>
            </div>
            <div className="card-detail-date">{cardDate}</div>
            <div className="card-detail-locationgroup">
              <img className="card-detail-img" src={ic_location}></img>
              <div className="card-detail-location">{cardLocation}</div>
            </div>
            <div className="card-spacer"></div>
            <div className="card-add-detail">
              <a onClick={this.props.addPeopleClick} className="card-add"><img src={ic_person_add}></img></a>
              <div className="card-spacer-add-detail"></div>
              <a onClick={this.props.matchDetailClick} className="card-detail" >DETAIL</a>
            </div>
          </div>
          <div className="card-item-small">
            <a className="card-edit"><img src={ic_edit}></img></a>
            <div className="card-spacer"></div>
            <a className="card-calculator"><img src={ic_calculator}></img></a>
            <div className="card-spacer"></div>
            <a className="card-games"><img src={ic_game}></img></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
