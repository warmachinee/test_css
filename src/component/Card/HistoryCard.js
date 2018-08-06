import React from 'react'
import './HistoryCard.css'

class HistoryCard extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className = "his__grid">
        <div className = "his__card">
          <div className = "his__card__item">
            <p>MatchID : {this.props.matchID}</p>
          </div>
          <div className = "his__card__item">
            <p>MatchName : {this.props.matchname}</p>
          </div>
          <div className = "his__card__item">
            <p>Userhost : {this.props.userhost}</p>
          </div>
          <div className = "his__card__item">
            <p>Fieldname : {this.props.fieldname}</p>
          </div>
          <div className = "his__card__item">
            <p>{'Date'} : {this.props.date}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default HistoryCard;
