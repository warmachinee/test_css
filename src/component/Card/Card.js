import React from 'react'
import './Card.css'

import ic_person_add from '../img/baseline-person_add-24px.svg'
import ic_location from '../img/baseline-place-24px.svg'
import ic_edit from '../img/baseline-edit-24px-white.svg'
import ic_game from '../img/baseline-games-24px-white.svg'
import ic_calculator from '../img/baseline-videogame_asset-24px-white.svg'
import ic_lock from '../img/baseline-lock-24px.svg'

const card = props =>{
  let cardMatchName = "Match Name"
  let cardDate ="01/01/2012"
  let cardLocation = "Location"
  let cardPrivateDrawer = 'card-private public'
  if(props.cardMatchName){
    cardMatchName = props.cardMatchName
  }
  if(props.cardDate){
    cardDate = props.cardDate
  }
  if(props.cardLocation){
    cardLocation = props.cardLocation
  }
  if(props.cardPrivate){
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
            <a className="card-add" href="/"><img src={ic_person_add}></img></a>
            <div className="card-spacer-add-detail"></div>
            <a className="card-detail" href="/">DETAIL</a>
          </div>
        </div>
        <div className="card-item-small">
          <a className="card-edit" href="/"><img src={ic_edit}></img></a>
          <div className="card-spacer"></div>
          <a className="card-calculator" href="/"><img src={ic_calculator}></img></a>
          <div className="card-spacer"></div>
          <a className="card-games" href="/"><img src={ic_game}></img></a>
        </div>
      </div>
    </div>
  );
};

export default card;
