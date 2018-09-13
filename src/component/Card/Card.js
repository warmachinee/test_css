import React from 'react'
import $ from 'jquery'
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
      addScoreData:{
        fieldid:'',
        matchid:''
      },
      fieldHoleScoreFirst:[],
      fieldHoleScoreLast:[]
    }
    this.stateID=''
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
  HandlerGetDataToAddScore = () =>{
    this.state.fieldHoleScoreFirst = []
    this.state.fieldHoleScoreLast = []
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/loadmatchfielddetail.php",
     dataType: 'json',
     data: {
       "matchid": this.state.addScoreData.matchid,
       "fieldid": this.state.addScoreData.fieldid,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['fieldscore']=data.fieldscore
     }
    });
    setTimeout(()=>{
      if(localStorage['fieldscore']){
        var fieldscore = localStorage['fieldscore'];
        fieldscore = fieldscore.split(",",fieldscore.length)
        for(var i = 0;i < 9;i++){
          this.state.fieldHoleScoreFirst.push(fieldscore[i])
        }
        for(var i = 0;i < 9;i++){
          this.state.fieldHoleScoreLast.push(fieldscore[i+9])
        }
        this.props.getFieldDataFromCard(this.state.fieldHoleScoreFirst,this.state.fieldHoleScoreLast)
      }
    },300)
    localStorage.clear()
  }
  calculateScore = (value)=>{
    this.state.addScoreData.matchid = value.matchid
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/loadmatchuserdetail.php",
     dataType: 'json',
     data: {
       "matchid": value.matchid,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['fieldid'] = data.fieldid
     }
    });
    setTimeout(()=>{
      if(localStorage['fieldid']){
        var fieldid = localStorage['fieldid']
        fieldid = parseInt(fieldid)
        this.state.addScoreData.fieldid = fieldid
        console.log("data.fieldid",this.state.addScoreData.fieldid);
        this.HandlerGetDataToAddScore()
        this.props.addScoreClick()
      }
    },300)
    localStorage.clear()
  }
  detailRoom = (Data)=>{
    //console.log(Data);
    if(Data.type === 'public' ){
      var geturl;
      geturl = $.ajax({
       type: "POST",
       url: "http://pds.in.th/phpadmin/matchaccess.php",
       dataType: 'json',
       data: {
         "matchid": parseInt(Data.matchid),
         "password": 0,
       },
       xhrFields: { withCredentials: true },
       success: function(data) {
         localStorage['response']=data.status;
         //console.log(data);
       }
      });
      setTimeout(()=>{
        if(localStorage['response']){
          var response = localStorage['response'];
          if(response === 'pass'){
            this.props.targetClickID(Data)
          }
          else{
            alert(response)
          }
        }
      },250)
    }else{
      //console.log("Type Room Private:::",Data.type)
      this.props.getRoomDetailToAccess(Data)
      this.props.roomPasswordClick()
    }
  }
  render(){
    let cardMatchName = "Match Name"
    let cardDate ="01/01/2012"
    let cardLocation = "Location"
    let cardPrivateDrawer = 'card-private public'

    if(this.props.data.type === 'private'){
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
            <div className="card-detail-date">Userhost :  {this.props.data.userhost}</div>
            <div className="card-detail-date">Match id :  {this.props.data.matchid}</div>
            <div className="card-spacer"></div>
            <div className="card-add-detail">
              <a onClick={(e)=>this.getCardMatchID(this.props.data)} className="card-add"><img src={ic_person_add}></img></a>
              <div className="card-spacer-add-detail"></div>
              <button
                className="card-detail"
                onClick={(e)=>this.detailRoom(this.props.data)}>DETAIL</button>
            </div>
          </div>
          <div className="card-item-small">
            <a className="card-edit" onClick={()=>this.props.getCardTargetIDEdit(this.props.data)}><img src={ic_edit}></img></a>
            <div className="card-spacer"></div>
            <a className="card-games"><img src={ic_game}></img></a>
            <div className="card-spacer"></div>
            <a onClick={(e)=>this.calculateScore(this.props.data)} className="card-calculator"><img src={ic_calculator}></img></a>
          </div>
        </div>
      </div>
    );

  }
}

export default Card;
