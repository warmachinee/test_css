import React from 'react'
import $ from 'jquery'
import './FillScore.css'

class FillScore extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      firstRender: true,
      hole: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
      holeInput: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
      holeIndex: 1,
      player: [1,2,3,4,5,6,7,8,9,10],
      scoreDataSent:[],
      scoreDataSentAdmin:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      scoreDataSentHole:[],
      userDataUpdateAdmin: 0,
      listItemClass:[],
      listItemClickState:[],
      listItemIndex: 0,
      fillScoreUserData:[],
      updateScoreMatchid: 0,
    }
  }
  getScore = (score,i) =>{
    this.state.scoreDataSentAdmin[i] = score
  }
  adminSelectUser = (data) =>{
    this.state.userDataUpdateAdmin = data
  }
  listItemClick = (i) =>{
    this.state.listItemIndex = i
    for(var j = 0;j < this.state.player.length;j++){
      this.state.listItemClickState[j] = false
      this.state.listItemClass[j] = 'fillscore__listitem'
    }
    this.state.listItemClickState[i] = !this.state.listItemClickState[i]
    if(this.state.listItemClickState[i]){
      this.state.listItemClass[i] = "fillscore__listitem selected"
    }else{
      this.state.listItemClass[i] = "fillscore__listitem"
    }
    this.setState(this.state)
  }
  add = () =>{
    this.state.scoreDataSentHole[this.state.listItemIndex] += 1
    this.setState(this.state)
  }
  minus = () =>{
    this.state.scoreDataSentHole[this.state.listItemIndex] -= 1
    if(this.state.scoreDataSentHole[this.state.listItemIndex]  < 0){
      this.state.scoreDataSentHole[this.state.listItemIndex] = 0
    }
    this.setState(this.state)
  }
  ShowData = () =>{
    console.log("holeIndex",this.state.holeIndex,":",this.state.scoreDataSent,":",this.state.scoreDataSentHole);
  }
  ShowDataAdmin = () =>{
    console.log(this.state.userDataUpdateAdmin,":",this.state.scoreDataSentAdmin);
  }
  saveUpdate = () =>{
    let arruserid = []
    let arrscore = []
    for(var i = 0;i < this.state.scoreDataSent.length;i++){
      arruserid.push(this.state.scoreDataSent[i].playerid)
      arrscore.push(this.state.scoreDataSentHole[i])
    }
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/updateusertoupdatescore.php",
     dataType: 'json',
     data: {
       "hole": this.state.holeIndex,
       "arruserid": arruserid,
       "arrscore": arrscore,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       console.log(data);
       localStorage['status']=data.status
       localStorage['usercount']=data.usercount
     }
    });
    setTimeout(()=>{
      if(localStorage['status'] === 'success '){
        alert(localStorage['status'])
      }
    },300)
    localStorage.clear()
  }
  HandleLoadusertourupdatescore = () =>{
    if(this.state.firstRender){
      //console.log(this.props.chktype);
      this.state.firstRender = false
      this.state.fillScoreUserData = []
      this.state.scoreDataSent = []
      this.state.scoreDataSentHole = []
      let tempScore = []
      var geturl;
      geturl = $.ajax({
        type: "POST",
       url: "http://pds.in.th/phpadmin/loadusertoupdatescore.php",
       dataType: 'json',
       data: {
         "matchid": 45506254,
         "hole": this.state.holeIndex
       },
       xhrFields: { withCredentials: true },
       success: function(data) {
         //console.log(data);
         localStorage['fullname']=data.fullname
         localStorage['lastname']=data.lastname
         localStorage['teamno']=data.teamno
         localStorage['userid']=data.userid
         localStorage['matchid']=data.matchid
         localStorage['score']=data.score
       }
      });
      setTimeout(()=>{
        if(localStorage['userid']){
          var fullname = localStorage['fullname'];
          var lastname = localStorage['lastname'];
          var teamno = localStorage['teamno'];
          var userid = localStorage['userid'];
          var score = localStorage['score'];
          var matchid = parseInt(localStorage['userid']);

          fullname = fullname.split(",",fullname.length)
          lastname = lastname.split(",",lastname.length)
          teamno = teamno.split(",",teamno.length)
          userid = userid.split(",",userid.length)
          score = score.split(",",score.length)

          for(var i = 0;i < userid.length;i++){
            var obj = {
              fullname: fullname[i],
              lastname: lastname[i],
              teamno: parseInt(teamno[i]),
              userid: parseInt(userid[i]),
              score: parseInt(score[i])
            }
            this.state.fillScoreUserData.push(obj)
          }
          //console.log(this.state.fillScoreUserData.length,":",this.state.fillScoreUserData);
          for(var i = 0;i < this.state.fillScoreUserData.length;i++){
            this.state.listItemClickState[i] = false
            this.state.listItemClass[i] = 'fillscore__listitem'
            this.state.scoreDataSent.push({
              player: this.state.fillScoreUserData[i].fullname + this.state.fillScoreUserData[i].lastname,
              playerid: this.state.fillScoreUserData[i].userid
            })
            this.state.scoreDataSentHole.push(this.state.fillScoreUserData[i].score)
          }
          this.state.updateScoreMatchid = matchid
          this.state.listItemClass[0] = 'fillscore__listitem selected'
          this.state.userDataUpdateAdmin = this.state.fillScoreUserData[0].userid
          //console.log(this.state.scoreDataSent);
          this.setState(this.state)
        }
      },300)
    }
    localStorage.clear()
  }
  HandlerAdminUpdateScore = (hole) =>{
    let arruserid = []
    let arrscore = []
    arruserid.push(this.state.userDataUpdateAdmin)
    arrscore.push(this.state.scoreDataSentAdmin[hole-1])
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/updateusertoupdatescore.php",
     dataType: 'json',
     data: {
       "hole": hole,
       "arruserid": arruserid,
       "arrscore": arrscore,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['status']=data.status
     }
    });
  }
  adminUpdateScore = () =>{
    for(var i = 0;i < 18;i++){
      this.HandlerAdminUpdateScore(i+1)
    }
    setTimeout(()=>{
      if(localStorage['status'] === 'success '){
        alert(localStorage['status'])
      }
      localStorage.clear()
    },1000)
  }
  changeHole = (hole) =>{
    this.state.holeIndex = hole
    this.setState({firstRender: true})
    this.HandleLoadusertourupdatescore()
    //this.state.scoreDataSent[i].score[this.state.holeIndex]
  }
  render(){
    this.HandleLoadusertourupdatescore()
    if(this.props.chktype === 2){
      return(
        <div className="fillscore">
          <div className="fillscore__topnav">
            <div className="fillscore__user">Admin: {this.props.chkName}</div>
            <button onClick={this.props.logout}>Logout</button>
          </div>
          <div className="fillscore__label">
            เลือกผู้เล่น
            <select onChange={(e)=>this.adminSelectUser(parseInt(e.target.value))}>
              {this.state.fillScoreUserData.map((d)=>
                <option value={parseInt(d.userid)}>{d.fullname} {d.lastname}</option>
              )}
            </select>
            <button onClick={this.ShowDataAdmin}>ShowData</button>
            <button onClick={this.adminUpdateScore}>Save</button>
          </div>
          <div className="fillscore__label__input__grid">
            {this.state.holeInput.filter((item) => {return item < 9})
            .map((d)=>
              <div className="fillscore__label__input">
                <div className="fillscore__label__input__text">{d+1}</div>
                <input type="number" min="0" placeholder={0}
                  onChange={(e)=>this.getScore(parseInt(e.target.value),d)} />
              </div>
            )}
          </div>
          <div className="fillscore__label__input__grid">
            {this.state.holeInput.filter((item) => {return item >= 9})
            .map((d)=>
              <div className="fillscore__label__input">
                <div className="fillscore__label__input__text">{d+1}</div>
                <input type="number" min="0" placeholder={0}
                  onChange={(e)=>this.getScore(parseInt(e.target.value),d)} />
              </div>
            )}
          </div>
        </div>
      );
    }else{
      return(
        <div className="fillscore">
          <div className="fillscore__topnav">
            <div className="fillscore__user">User: {this.props.chkName}</div>
            <button onClick={this.props.logout}>Logout</button>
          </div>
          <div className="fillscore__hole">
            <p>หลุม</p>
            <select onChange = {(e)=>this.changeHole(parseInt(e.target.value))}>
              {this.state.hole.map((d)=>
                <option value={d+1}>{d+1}</option>
              )}
            </select>
          </div>
          <div className="fillscore__label">
            เลือกผู้เล่น
            <button onClick={this.ShowData}>ShowData</button>
            <button onClick={this.saveUpdate}>Save</button>
          </div>
          <div className="fillscore__listview__grid">
            <div className="fillscore__listview">
              {this.state.fillScoreUserData.map((d,i)=>
                <a
                  onClick={()=>this.listItemClick(i)}
                  className={this.state.listItemClass[i]}>{d.fullname} {d.lastname}
                  <div>{this.state.scoreDataSentHole[i]}</div>
                </a>
              )}
            </div>
            <div className="fillscore__btn">
              <button onClick={this.add}>+</button>
              <button onClick={this.minus}>-</button>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default FillScore;
