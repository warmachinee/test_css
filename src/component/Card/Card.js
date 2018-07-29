import React from 'react'
import './Card.css'

import ic_person_add from '../img/baseline-person_add-24px.svg'
import ic_location from '../img/baseline-place-24px.svg'
import ic_edit from '../img/baseline-edit-24px-white.svg'
import ic_game from '../img/baseline-games-24px-white.svg'
import ic_calculator from '../img/baseline-videogame_asset-24px-white.svg'

const card = props =>(
  <div className="card-box">
    <div className="card">
      <div className="card-item-large">
        <div className="card-detail-match">Match Name</div>
        <div className="card-detail-date">01/01/2012</div>
        <div className="card-detail-locationgroup">
          <img className="card-detail-img" src={ic_location}></img>
          <div className="card-detail-location">Location</div>
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

export default card;
