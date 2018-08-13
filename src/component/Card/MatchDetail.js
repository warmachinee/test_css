import React from 'react'
import ReactDom from 'react-dom'
import $ from 'jquery'
import './MatchDetail.css'

class MatchDetail extends React.Component{
  constructor(props){
    super(props)
    this.matchDetailRefresh = false
    this.state = {
      teamTemp:'',
      optionTemp:[],
      teamNumber: '',
    }
  }
  setTeamTemp = (data)=>{
    this.state.teamTemp = data;
    this.state.optionTemp = []
    this.state.optionTemp = this.props.setTeamData
  }
  setUpdateTeam = (data)=>{
    this.state.teamNumber = data
  }
  updateTeam =()=>{
    if(this.state.teamNumber === undefined || this.state.teamNumber === "" || this.state.teamNumber === null){
      this.state.teamNumber = 1
      this.HandlerUpdateTDbyUser(this.props.matchDetailID,1)
    }else{
      this.HandlerUpdateTDbyUser(this.props.matchDetailID,this.state.teamNumber)
    }
  }
  HandlerUpdateTDbyUser=(matchid,teamno)=>{
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://pds.in.th/phpadmin/updateTDbyuser.php",
     dataType: 'json',
     data: {
       "matchid": matchid,
       "teamno": teamno,
       "departno": "",
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //localStorage.setItem("response",JSON.stringify(data));
       localStorage['response']=data.status;
       console.log(data);
     }
    });
    setTimeout(()=>{
      if(localStorage['response']){
        this.props.loadMatchDetail(this.props.matchDetailData)
        setTimeout(()=>{
          /*this.matchDetailRefresh=false;
          this.refresh()*/
          this.setState({ state: this.state });
          console.log("in handler update :::");
        },500)
      }
    },500)
  }
  refresh = () =>{
    if(!this.matchDetailRefresh){
      this.matchDetailRefresh=true;
      this.props.loadMatchDetail(this.props.matchDetailData)
      this.setState(this.state);
      console.log("refresh");
    }
  }
  render(){
    return(
      <div className="match__detail">
        <div className="space"></div>
        <div className="detail__grid">
          <div className="space"></div>
          <div className="detail__card">
            <div className="detail__gridtop">
              {this.props.detail.map((data,i)=>
                <div className="detail__label">
                  <div className="detail__matchname">{data.matchname}</div>
                  <div className="detail__fieldname">{data.fieldname}</div>
                  <div className="detail__datematch">{data.datematch}</div>
                </div>
              )}
              <div className="detail__controller">
              </div>
            </div>
            <div className="detail__gridfield">

            </div>
            <div className="detail__griduserhost">
              <div className="detail__userhostname">Name</div>
              <div className="detail__userhostin">{"IN"}</div>
              <div className="detail__userhostout">{"OUT"}</div>
              <div className="detail__userhostgross">{"GROSS"}</div>
            </div>
            {this.props.detailUserhost.map((data)=>
              <div className="detail__griduserhost">
                <div className="detail__userhostname">{data.fullname} {data.userid}</div>
                <div className="detail__userhostin">{data.in}</div>
                <div className="detail__userhostout">{data.out}</div>
                <div className="detail__userhostgross">{data.gross}</div>
              </div>
            )}
            {this.props.setTeamData.map((data,i)=>
              <div>
                <p>{data.teamname}</p>
                <div className="detail__teambox">
                  {this.setTeamTemp(i)}
                  {this.props.detailUser.filter(
                      (item)=>{
                        return this.state.teamTemp + 1 === item.teamno;
                      }
                    ).map((data)=>
                      <div className="detail__username">
                        <div className="detail__username">{data.fullname} {data.userid}
                          <select onChange={(e)=>this.setUpdateTeam(e.target.value)}>
                            {this.state.optionTemp.map((data,i)=>
                              <option value={data.teamno}>{data.teamno}</option>
                            )}
                          </select>
                          <button onClick={this.updateTeam} className="detail__choose">Choose team</button>
                        </div>
                        <div className="detail__usernamein">{data.in}</div>
                        <div className="detail__usernameout">{data.out}</div>
                        <div className="detail__usernamegross">{data.gross}</div>
                      </div>
                    )}
                </div>
              </div>
            )}

            {this.props.detailUser.filter(
              (item)=>{
                return item.teamno === 0;
              }
            ).map((data,i)=>
              <div className="detail__username">
                <div className="detail__username">{data.fullname} {data.userid}
                  <select onChange={(e)=>this.setUpdateTeam(e.target.value)}>
                    {this.state.optionTemp.map((data,i)=>
                      <option value={data.teamno}>{data.teamno}</option>
                    )}
                  </select>
                  <button onClick={this.updateTeam} className="detail__choose">Choose team</button>
                </div>
                <div className="detail__usernamein">{data.in}</div>
                <div className="detail__usernameout">{data.out}</div>
                <div className="detail__usernamegross">{data.gross}</div>
              </div>
            )}

          </div>
          <div className="space"></div>
        </div>
        <div className="space"></div>
      </div>
    );
  }
}

export default MatchDetail;
