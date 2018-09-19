import React from 'react'
import $ from 'jquery'
import './FillScore.css'

class FillScore extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      firstRender: true,
      hole: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
      holeIndex: 0,
      player: [1,2,3,4,5,6,7,8,9,10],
      scoreDataSent:[],
      listItemClass:[],
      listItemClickState:[],
      listItemIndex: 0,
      fillScoreUserData:[]
    }
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
    this.state.scoreDataSent[this.state.listItemIndex].score[this.state.holeIndex] += 1
    this.setState(this.state)
  }
  minus = () =>{
    this.state.scoreDataSent[this.state.listItemIndex].score[this.state.holeIndex]  -= 1
    if(this.state.scoreDataSent[this.state.listItemIndex].score[this.state.holeIndex]  < 0){
      this.state.scoreDataSent[this.state.listItemIndex].score[this.state.holeIndex]  = 0
    }
    this.setState(this.state)
  }
  ShowData = () =>{
    console.log(this.state.scoreDataSent);
  }
  saveUpdate = () =>{
    let arruserid = []
    let arrscore = []
    for(var i = 0;i < this.state.scoreDataSent.length;i++){
      arruserid.push(this.state.scoreDataSent[i].playerid)
      arrscore.push(this.state.scoreDataSent[i].score[this.state.holeIndex])
    }
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/updateusertoupdatescore.php",
     dataType: 'json',
     data: {
       "hole": this.state.holeIndex + 1,
       "arruserid": arruserid,
       "arrscore": arrscore,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       console.log(data);
       localStorage['fullname']=data.fullname
       localStorage['lastname']=data.lastname
       localStorage['teamno']=data.teamno
       localStorage['userid']=data.userid
     }
    });
  }
  HandleLoadusertourupdatescore = () =>{
    if(this.state.firstRender){
      this.state.firstRender = false
      this.state.fillScoreUserData = []
      this.state.scoreDataSent = []
      let tempScore = []
      var geturl;
      geturl = $.ajax({
        type: "POST",
       url: "http://pds.in.th/phpadmin/loadusertoupdatescore.php",
       dataType: 'json',
       data: {
         "matchid": 45506254
       },
       xhrFields: { withCredentials: true },
       success: function(data) {
         console.log(data);
         localStorage['fullname']=data.fullname
         localStorage['lastname']=data.lastname
         localStorage['teamno']=data.teamno
         localStorage['userid']=data.userid
       }
      });
      setTimeout(()=>{
        if(localStorage['userid']){
          var fullname = localStorage['fullname'];
          var lastname = localStorage['lastname'];
          var teamno = localStorage['teamno'];
          var userid = localStorage['userid'];

          fullname = fullname.split(",",fullname.length)
          lastname = lastname.split(",",lastname.length)
          teamno = teamno.split(",",teamno.length)
          userid = userid.split(",",userid.length)

          for(var i = 0;i < userid.length;i++){
            var obj = {
              fullname: fullname[i],
              lastname: lastname[i],
              teamno: parseInt(teamno[i]),
              userid: parseInt(userid[i])
            }
            this.state.fillScoreUserData.push(obj)
          }
          console.log(this.state.fillScoreUserData.length,":",this.state.fillScoreUserData);
          for(var i = 0;i < this.state.fillScoreUserData.length;i++){
            this.state.listItemClickState[i] = false
            this.state.listItemClass[i] = 'fillscore__listitem'
            for(var j = 0;j < 18;j++){
              tempScore.push(0)
            }
            this.state.scoreDataSent.push({
              player: this.state.fillScoreUserData[i].fullname + this.state.fillScoreUserData[i].lastname,
              playerid: this.state.fillScoreUserData[i].userid,
              score: tempScore
            })
            tempScore = []
          }
          this.state.listItemClass[0] = 'fillscore__listitem selected'
          console.log(this.state.scoreDataSent);
          this.setState(this.state)
        }
      },300)
    }
    localStorage.clear()
  }
  render(){
    this.HandleLoadusertourupdatescore()
    return(
      <div className="fillscore">
        <div className="fillscore__topnav">
          <div className="fillscore__user">User: Username1</div>
          <button onClick={this.props.logout}>Logout</button>
        </div>
        <div className="fillscore__hole">
          <p>หลุม</p>
          <select onChange = {(e)=>this.setState({holeIndex: e.target.value})}>
            {this.state.hole.map((d)=>
              <option value={d}>{d+1}</option>
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
                <div>{this.state.scoreDataSent[i].score[this.state.holeIndex]}</div>
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

export default FillScore;
