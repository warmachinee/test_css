import React from 'react'
import $ from 'jquery'
import './UserMatch.css'

import SwitchToggle from '../Switch/SwitchToggle'
import ModalUserMatch from '../Modal/ModalUserMatch'
import ModalFillScore from '../Modal/ModalFillScore'

import ic_person from '../img/baseline-account_circle-24px-login.svg'
import ic_male from '../img/gender-male.svg'
import ic_female from '../img/gender-female.svg'

class UserMatch extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modalUserMatchState: false,
      modalFillScoreState: false,
      modalUserMatchType: 'allUser',
      testData:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      avgStat:{
        in: 0,
        out: 0,
        gross: 0,
        par: 0
      },
      setTeamData:[],
      setDepartData:[],
      detailMatchFromLoad:[],
      detailFieldFromLoad:[],
      FieldFromLoadDetail:[],
      detailUserFromLoad:[],
      tempHole:[],
      holescoreTemp:[],
      holeScoreFromLoad:[],
      holeScoreFromLoadTemp:[],
      clientHistoryData:[],
      matchidUserLoadMatch:'',
      fieldidUserLoadMatch: '',
      selectedFile:null,
      tempMatchid: '',
      tempAccountData: []
    }
    //<SwitchToggle switchToggleState={this.props.TournamentToggle}/>
  }
  modalUserMatchToggle = () =>{
    this.setState((prev)=>{
      return {modalUserMatchState: !prev.modalUserMatchState}
    })
  }
  modalFillScoreToggle = () =>{
    this.setState((prev)=>{
      return {modalFillScoreState: !prev.modalFillScoreState}
    })
  }
  calculateAvgStat = () =>{
    this.state.avgStat = {
      in: 0,
      out: 0,
      gross: 0,
      par: 0
    }
    for(var i = 0;i < this.props.loadUserMatchData.length;i++){
      this.state.avgStat.in += parseInt(this.props.loadUserMatchData[i].in)
      this.state.avgStat.out += parseInt(this.props.loadUserMatchData[i].out)
      this.state.avgStat.gross += parseInt(this.props.loadUserMatchData[i].gross)
      this.state.avgStat.par += parseInt(this.props.loadUserMatchData[i].par)
    }
    this.state.avgStat.in = Math.round(((this.state.avgStat.in / this.props.loadUserMatchData.length)*1000)/1000)
    this.state.avgStat.out = Math.round(((this.state.avgStat.out / this.props.loadUserMatchData.length)*1000)/1000)
    this.state.avgStat.gross = Math.round(((this.state.avgStat.gross / this.props.loadUserMatchData.length)*1000)/1000)
    if(this.props.loadUserMatchData.length === 0){
      this.state.avgStat = {
        in: 0,
        out: 0,
        gross: 0,
        par: 0
      }
    }
  }
  loadAdminTour = (matchid) =>{
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://www.thai-pga.com/phpadmin/loadadmintour.php",
     dataType: 'json',
     data: {
       "matchid": matchid
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       console.log(data);
     }
    });
  }

  loadMatchUserDetail = (matchid,check,checkFirstTime) =>{
    if(matchid){
      this.state.setTeamData = []
      this.state.setDepartData = []
      this.state.detailMatchFromLoad = []
      this.state.detailUserFromLoad = []
      this.state.holeScoreFromLoad = []
      this.state.holeScoreFromLoadTemp = []
      this.state.tempHole = []
      this.state.holescoreTemp = []
      this.state.matchidUserLoadMatch = matchid
      this.state.modalUserMatchType = ''
      if(check === '1User'){
        this.state.modalUserMatchType = check
        var geturl;
        geturl = $.ajax({
          type: "POST",
         url: "http://www.thai-pga.com/phpadmin/loadmatchuserdetailonlyone.php",
         dataType: 'json',
         data: {
           "matchid": matchid,
         },
         xhrFields: { withCredentials: true },
         success: function(data) {
           localStorage['fieldid']=data.fieldid
           localStorage['matchname']=data.matchname
           localStorage['fieldname']=data.fieldname
           localStorage['datecreate']=data.datecreate
           localStorage['datemodify']=data.datemodify
           localStorage['datematch']=data.datematch
           localStorage['cordA']=data.cordA
           localStorage['cordB']=data.cordB
           localStorage['in']=data.in
           localStorage['out']=data.out
           localStorage['gross']=data.gross
           localStorage['holescore']=data.holescore
           localStorage['userid']=data.userid
           localStorage['fullname']=data.fullname
           localStorage['lastname']=data.lastname
           localStorage['typescore']=data.typescore
           localStorage['teamnum']=data.teamnum
           localStorage['teamno']=data.teamno
           localStorage['departnum']=data.departnum
           localStorage['departno']=data.departno
           //console.log(data);
         }
        });
      }else{
        this.state.modalUserMatchType = check
        var geturl;
        geturl = $.ajax({
          type: "POST",
         url: "http://www.thai-pga.com/phpadmin/loadmatchuserdetail.php",
         dataType: 'json',
         data: {
           "matchid": matchid,
         },
         xhrFields: { withCredentials: true },
         success: function(data) {
           localStorage['fieldid']=data.fieldid
           localStorage['matchname']=data.matchname
           localStorage['fieldname']=data.fieldname
           localStorage['datecreate']=data.datecreate
           localStorage['datemodify']=data.datemodify
           localStorage['datematch']=data.datematch
           localStorage['cordA']=data.cordA
           localStorage['cordB']=data.cordB
           localStorage['teamnum']=data.teamnum
           localStorage['departnum']=data.departnum
           localStorage['typescore']=data.typescore
           //console.log("loadmatchuserdetail",data);
         }
        });
        var geturl2;
        geturl2 = $.ajax({
          type: "POST",
         url: "http://www.thai-pga.com/phpadmin/matchresultscore.php",
         dataType: 'json',
         data: {
           "matchid": matchid,
           "sort": 2
         },
         xhrFields: { withCredentials: true },
         success: function(data) {
           localStorage['in']=data.in
           localStorage['out']=data.out
           localStorage['gross']=data.gross
           if(data.par){
             localStorage['par']=data.par
           }
           localStorage['holescore']=data.holescore
           localStorage['userid']=data.userid
           localStorage['fullname']=data.full
           localStorage['lastname']=data.last
           localStorage['teamno']=data.teamno
           localStorage['departno']=data.departno
           localStorage['rank']=data.rank
         }
        });
      }
      var geturl3;
      geturl3 = $.ajax({
        type: "POST",
       url: "http://www.thai-pga.com/phpadmin/setteammatch.php",
       dataType: 'json',
       data: {
         "matchid": matchid,
       },
       xhrFields: { withCredentials: true },
       success: function(data) {
         //console.log(data);
         localStorage['teamname2']=data.teamname
         localStorage['teamno2']=data.teamno
       }
      });
      var geturl4;
      geturl4 = $.ajax({
        type: "POST",
       url: "http://www.thai-pga.com/phpadmin/setdepartmatch.php",
       dataType: 'json',
       data: {
         "matchid": matchid,
       },
       xhrFields: { withCredentials: true },
       success: function(data) {
         //console.log(data);
         localStorage['departname2']=data.departname
         localStorage['departno2']=data.departno
       }
     });
      setTimeout(()=>{
        if(localStorage['teamname2']){
          var teamname2 = localStorage['teamname2']
          var teamno2 = localStorage['teamno2']

          teamname2 = teamname2.split(",",teamname2.length)
          teamno2 = teamno2.split(",",teamno2.length)
          for(var i = 0;i < teamname2.length;i++){
            var obj2 = {
              teamname: teamname2[i],
              teamno: parseInt(teamno2[i]),
            }
            this.state.setTeamData.push(obj2)
          }
        }
        if(localStorage['departname2']){
          var departname2 = localStorage['departname2']
          var departno2 = localStorage['departno2']
          departname2 = departname2.split(",",departname2.length)
          departno2 = departno2.split(",",departno2.length)
          for(var i =0;i < departname2.length;i++){
            var obj3 = {
              departname: departname2[i],
              departno: parseInt(departno2[i]),
            }
            this.state.setDepartData.push(obj3)
          }
        }
        if(localStorage['matchname']){
          var fieldid = localStorage['fieldid'];
          var matchname = localStorage['matchname'];
          var fieldname = localStorage['fieldname'];
          var datecreate = localStorage['datecreate'];
          var datemodify = localStorage['datemodify'];
          var datematch = localStorage['datematch'];
          var cordA = localStorage['cordA'];
          var cordB = localStorage['cordB'];
          var inn = localStorage['in'];
          var outt = localStorage['out'];
          var gross = localStorage['gross'];
          if(localStorage['par']){
            var par = localStorage['par'];
          }
          var holescore = localStorage['holescore'];
          var userid = localStorage['userid'];
          var fullname = localStorage['fullname'];
          var lastname = localStorage['lastname'];

          var teamnum = localStorage['teamnum'];
          var teamno = localStorage['teamno'];
          var departnum = localStorage['departnum'];
          var departno = localStorage['departno'];
          var typescore = localStorage['typescore'];
          var rank = localStorage['rank'];


          fieldid = parseInt(fieldid)
          this.state.fieldidUserLoadMatch = fieldid
          cordA = parseInt(cordA)
          cordB = parseInt(cordB)
          inn = JSON.parse("["+inn+"]")
          outt = JSON.parse("["+outt+"]")
          gross = JSON.parse("["+gross+"]")
          if(localStorage['par']){
            par = JSON.parse("["+par+"]")
          }
          holescore = holescore.split(",",holescore.length)
          userid = userid.split(",",userid.length)
          fullname = fullname.split(",",fullname.length)
          lastname = lastname.split(",",lastname.length)
          teamnum = parseInt(teamnum)
          teamno = JSON.parse("["+teamno+"]")
          departnum = parseInt(departnum)
          departno = JSON.parse("["+departno+"]")
          typescore = parseInt(typescore)
          rank = rank.split(",",rank.length)
          var obj = {
            fieldid:"",
            matchname:"",
            fieldname:"",
            datecreate:"",
            datemodify:"",
            datematch:"",
            cordA:"",
            cordB:"",
            teamnum:"",
            departnum:"",
            typescore:"",
          }
          obj.fieldid = fieldid
          obj.matchname = matchname
          obj.fieldname = fieldname
          obj.datecreate = datecreate
          obj.datemodify = datemodify
          obj.datematch = datematch
          obj.cordA = cordA
          obj.cordB = cordB
          obj.teamnum = teamnum
          obj.departnum = departnum
          obj.typescore = typescore
          this.state.detailMatchFromLoad.push(obj);
          if(check === '1User'){
            for(var i = 0;i < holescore.length;i++){
              this.state.holescoreTemp.push({
                i: i,
                holescore: parseInt(holescore[i])
              })
            }
          }else{
            let holescoreTemp = [];
            let holescoreTemp2 = [];
            let index = 0;
            for(var i = 0;i < holescore.length;i++){
              holescoreTemp.push({
                i: index,
                holescore: parseInt(holescore[i])
              })
              holescoreTemp2.push(parseInt(holescore[i]))
              index += 1
              if((i+1)%18===0){
                this.state.holeScoreFromLoad.push(holescoreTemp);
                this.state.holeScoreFromLoadTemp.push(holescoreTemp2);
                holescoreTemp = []
                holescoreTemp2 = [];
                index = 0
              }
            }
          }

          if(check === '1User'){
            for(var i = 0;i < userid.length;i++){
              var obj = {
                in: parseInt(inn[i]),
                out: parseInt(outt[i]),
                gross: parseInt(gross[i]),
                userid: parseInt(userid[i]),
                fullname: fullname[i],
                lastname: lastname[i],
                teamno: parseInt(teamno[i]),
                departno: parseInt(departno[i]),
                rank: rank[i],
                holescore: this.state.holeScoreFromLoadTemp[i]
              }
              this.state.detailUserFromLoad.push(obj);
            }
          }else{
            if(localStorage['par']){
              for(var i = 0;i < userid.length;i++){
                var obj = {
                  i: i,
                  in: parseInt(inn[i]),
                  out: parseInt(outt[i]),
                  gross: parseInt(gross[i]),
                  par: parseInt(par[i]),
                  userid: parseInt(userid[i]),
                  fullname: fullname[i],
                  lastname: lastname[i],
                  teamno: parseInt(teamno[i]),
                  departno: parseInt(departno[i]),
                  rank: rank[i],
                  holescore: this.state.holeScoreFromLoadTemp[i]
                }
                this.state.detailUserFromLoad.push(obj);
              }
            }else{
              for(var i = 0;i < userid.length;i++){
                var obj = {
                  i: i,
                  in: parseInt(inn[i]),
                  out: parseInt(outt[i]),
                  gross: parseInt(gross[i]),
                  userid: parseInt(userid[i]),
                  fullname: fullname[i],
                  lastname: lastname[i],
                  teamno: parseInt(teamno[i]),
                  departno: parseInt(departno[i]),
                  rank: rank[i],
                  holescore: this.state.holeScoreFromLoadTemp[i]
                }
                this.state.detailUserFromLoad.push(obj);
              }
            }
          }

          for(var i=0;i < this.state.detailUserFromLoad.length;i++){
            this.state.tempHole.push({
              userid: this.state.detailUserFromLoad[i].userid,
              teamno: this.state.detailUserFromLoad[i].teamno,
              departno: this.state.detailUserFromLoad[i].departno,
              holescore: this.state.holeScoreFromLoad[i]
            })
          }
        }
        localStorage.clear()
        this.loadMatchFieldDetail(matchid,fieldid,checkFirstTime)
      },500)
    }
  }

  loadMatchFieldDetail = (matchid,fieldid,checkFirstTime) =>{
    console.log("fieldid : ",fieldid," , ","matchid : ",matchid);
    if(fieldid){
      this.state.detailFieldFromLoad = []
      this.state.FieldFromLoadDetail = []
      var geturl;
      geturl = $.ajax({
        type: "POST",
       url: "http://www.thai-pga.com/phpadmin/loadmatchfielddetail.php",
       dataType: 'json',
       data: {
         "matchid": matchid,
         "fieldid": fieldid,
       },
       xhrFields: { withCredentials: true },
       success: function(data) {
         //console.log(data);
         localStorage['fieldscore']=data.fieldscore
         localStorage['fieldHscore']=data.fieldHscore
       }
      });

      setTimeout(()=>{
        if(localStorage['fieldscore']){
          var fieldscore = localStorage['fieldscore'];
          var fieldHscore = localStorage['fieldHscore'];
          fieldscore = fieldscore.split(",",fieldscore.length)
          fieldHscore = fieldHscore.split(",",fieldHscore.length)
          let fieldIn = 0
          let fieldOut = 0
          for(var i = 0;i < 9;i++){
            fieldIn += parseInt(fieldscore[i])
          }
          for(var i = 9;i < 18;i++){
            fieldOut += parseInt(fieldscore[i])
          }
          for(var i = 0;i < fieldscore.length;i++){
            var obj = {
              i: i,
              fieldscore: parseInt(fieldscore[i]),
              fieldHscore: parseInt(fieldHscore[i])
            }
            this.state.detailFieldFromLoad.push(obj)
          }
          this.state.FieldFromLoadDetail.push({
            in: fieldIn,
            out: fieldOut,
            gross: fieldIn+fieldOut
          })
          /*
          console.log("setTeamData",this.state.setTeamData);
          console.log("setDepartData",this.state.setDepartData);
          console.log("detailMatchFromLoad",this.state.detailMatchFromLoad);
          console.log("detailUserFromLoad",this.state.detailUserFromLoad);
          console.log("tempHole",this.state.tempHole);
          console.log("holeScoreFromLoadTemp",this.state.holeScoreFromLoadTemp);
          console.log("detailFieldFromLoad ",this.state.detailFieldFromLoad)
          console.log("userProfileData",this.props.userProfileData);
          console.log("loadUserMatchData",this.props.loadUserMatchData);*/
          this.setState(this.state)
          if(checkFirstTime){
            this.modalUserMatchToggle()
          }
        }

      },300)
      localStorage.clear()
    }

  }

  autoRefreshData = (i) =>{
    this.state.setTeamData = []
    this.state.setDepartData = []
    this.state.detailMatchFromLoad = []
    this.state.detailUserFromLoad = []
    this.state.holeScoreFromLoad = []
    this.state.holeScoreFromLoadTemp = []
    this.state.tempHole = []
    this.state.holescoreTemp = []
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://www.thai-pga.com/phpadmin/loadmatchuserdetail.php",
     dataType: 'json',
     data: {
       "matchid": this.state.matchidUserLoadMatch,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['fieldid']=data.fieldid
       localStorage['matchname']=data.matchname
       localStorage['fieldname']=data.fieldname
       localStorage['datecreate']=data.datecreate
       localStorage['datemodify']=data.datemodify
       localStorage['datematch']=data.datematch
       localStorage['cordA']=data.cordA
       localStorage['cordB']=data.cordB
       localStorage['teamnum']=data.teamnum
       localStorage['departnum']=data.departnum
       localStorage['typescore']=data.typescore
       //console.log("loadmatchuserdetail",data);
     }
    });
    var geturl2;
    geturl2 = $.ajax({
      type: "POST",
     url: "http://www.thai-pga.com/phpadmin/matchresultscore.php",
     dataType: 'json',
     data: {
       "matchid": this.state.matchidUserLoadMatch,
       "sort": 2
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['in']=data.in
       localStorage['out']=data.out
       localStorage['gross']=data.gross
       if(data.par){
         localStorage['par']=data.par
       }
       localStorage['holescore']=data.holescore
       localStorage['userid']=data.userid
       localStorage['fullname']=data.full
       localStorage['lastname']=data.last
       localStorage['teamno']=data.teamno
       localStorage['departno']=data.departno
       localStorage['rank']=data.rank
     }
    });
    var geturl3;
    geturl3 = $.ajax({
      type: "POST",
     url: "http://www.thai-pga.com/phpadmin/setteammatch.php",
     dataType: 'json',
     data: {
       "matchid": this.state.matchidUserLoadMatch,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //console.log(data);
       localStorage['teamname2']=data.teamname
       localStorage['teamno2']=data.teamno
     }
    });
    var geturl4;
    geturl4 = $.ajax({
      type: "POST",
     url: "http://www.thai-pga.com/phpadmin/setdepartmatch.php",
     dataType: 'json',
     data: {
       "matchid": this.state.matchidUserLoadMatch,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       //console.log(data);
       localStorage['departname2']=data.departname
       localStorage['departno2']=data.departno
     }
    });
    setTimeout(()=>{
      if(localStorage['teamname2']){
        var teamname2 = localStorage['teamname2']
        var teamno2 = localStorage['teamno2']

        teamname2 = teamname2.split(",",teamname2.length)
        teamno2 = teamno2.split(",",teamno2.length)
        for(var i = 0;i < teamname2.length;i++){
          var obj2 = {
            teamname: teamname2[i],
            teamno: parseInt(teamno2[i]),
          }
          this.state.setTeamData.push(obj2)
        }
      }
      if(localStorage['departname2']){
        var departname2 = localStorage['departname2']
        var departno2 = localStorage['departno2']
        departname2 = departname2.split(",",departname2.length)
        departno2 = departno2.split(",",departno2.length)
        for(var i =0;i < departname2.length;i++){
          var obj3 = {
            departname: departname2[i],
            departno: parseInt(departno2[i]),
          }
          this.state.setDepartData.push(obj3)
        }
      }
      if(localStorage['matchname']){
        var fieldid = localStorage['fieldid'];
        var matchname = localStorage['matchname'];
        var fieldname = localStorage['fieldname'];
        var datecreate = localStorage['datecreate'];
        var datemodify = localStorage['datemodify'];
        var datematch = localStorage['datematch'];
        var cordA = localStorage['cordA'];
        var cordB = localStorage['cordB'];
        var inn = localStorage['in'];
        var outt = localStorage['out'];
        var gross = localStorage['gross'];
        if(localStorage['par']){
          var par = localStorage['par'];
        }
        var holescore = localStorage['holescore'];
        var userid = localStorage['userid'];
        var fullname = localStorage['fullname'];
        var lastname = localStorage['lastname'];

        var teamnum = localStorage['teamnum'];
        var teamno = localStorage['teamno'];
        var departnum = localStorage['departnum'];
        var departno = localStorage['departno'];
        var typescore = localStorage['typescore'];
        var rank = localStorage['rank'];


        fieldid = parseInt(fieldid)
        this.state.fieldidUserLoadMatch = fieldid
        cordA = parseInt(cordA)
        cordB = parseInt(cordB)
        inn = JSON.parse("["+inn+"]")
        outt = JSON.parse("["+outt+"]")
        gross = JSON.parse("["+gross+"]")
        if(localStorage['par']){
          par = JSON.parse("["+par+"]")
        }
        holescore = holescore.split(",",holescore.length)
        userid = userid.split(",",userid.length)
        fullname = fullname.split(",",fullname.length)
        lastname = lastname.split(",",lastname.length)
        teamnum = parseInt(teamnum)
        teamno = JSON.parse("["+teamno+"]")
        departnum = parseInt(departnum)
        departno = JSON.parse("["+departno+"]")
        typescore = parseInt(typescore)
        rank = rank.split(",",rank.length)
        var obj = {
          fieldid:"",
          matchname:"",
          fieldname:"",
          datecreate:"",
          datemodify:"",
          datematch:"",
          cordA:"",
          cordB:"",
          teamnum:"",
          departnum:"",
          typescore:"",
        }
        obj.fieldid = fieldid
        obj.matchname = matchname
        obj.fieldname = fieldname
        obj.datecreate = datecreate
        obj.datemodify = datemodify
        obj.datematch = datematch
        obj.cordA = cordA
        obj.cordB = cordB
        obj.teamnum = teamnum
        obj.departnum = departnum
        obj.typescore = typescore
        this.state.detailMatchFromLoad.push(obj);
        let holescoreTemp = [];
        let holescoreTemp2 = [];
        let index = 0;
        for(var i = 0;i < holescore.length;i++){
          holescoreTemp.push({
            i: index,
            holescore: parseInt(holescore[i])
          })
          holescoreTemp2.push(parseInt(holescore[i]))
          index += 1
          if((i+1)%18===0){
            this.state.holeScoreFromLoad.push(holescoreTemp);
            this.state.holeScoreFromLoadTemp.push(holescoreTemp2);
            holescoreTemp = []
            holescoreTemp2 = [];
            index = 0
          }
        }
        if(localStorage['par']){
          for(var i = 0;i < userid.length;i++){
            var obj = {
              i: i,
              in: parseInt(inn[i]),
              out: parseInt(outt[i]),
              gross: parseInt(gross[i]),
              par: parseInt(par[i]),
              userid: parseInt(userid[i]),
              fullname: fullname[i],
              lastname: lastname[i],
              teamno: parseInt(teamno[i]),
              departno: parseInt(departno[i]),
              rank: rank[i],
              holescore: this.state.holeScoreFromLoadTemp[i]
            }
            this.state.detailUserFromLoad.push(obj);
          }
        }else{
          for(var i = 0;i < userid.length;i++){
            var obj = {
              i: i,
              in: parseInt(inn[i]),
              out: parseInt(outt[i]),
              gross: parseInt(gross[i]),
              userid: parseInt(userid[i]),
              fullname: fullname[i],
              lastname: lastname[i],
              teamno: parseInt(teamno[i]),
              departno: parseInt(departno[i]),
              rank: rank[i],
              holescore: this.state.holeScoreFromLoadTemp[i]
            }
            this.state.detailUserFromLoad.push(obj);
          }
        }
        for(var i=0;i < this.state.detailUserFromLoad.length;i++){
          this.state.tempHole.push({
            userid: this.state.detailUserFromLoad[i].userid,
            teamno: this.state.detailUserFromLoad[i].teamno,
            departno: this.state.detailUserFromLoad[i].departno,
            holescore: this.state.holeScoreFromLoad[i]
          })
        }
      }
      this.setState(this.state)
    },500)
    localStorage.clear()
    console.log("autoRefreshData : ",i);
  }

  testShow = (d) =>{
    this.state.tempAccountData = []
    this.state.modalUserMatchType = 'showTempAccount'
    var geturl;
    geturl = $.ajax({
      type: "POST",
     url: "http://www.thai-pga.com/phpadmin/showtempacc.php",
     dataType: 'json',
     data: {
       "matchid": d.matchid,
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       console.log(data);
       localStorage['status']=data.status
       localStorage['username']=data.username
       localStorage['password']=data.password
       localStorage['teamno']=data.teamno
     }
    });
    setTimeout(()=>{
      if(localStorage['status'] != 'error to load'){
        if(localStorage['username']){
          var username = localStorage['username'];
          var password = localStorage['password'];
          var teamno = localStorage['teamno'];

          username = username.split(",",username.length)
          password = password.split(",",password.length)
          teamno = teamno.split(",",teamno.length)

          for(var i = 0;i < username.length;i++){
            this.state.tempAccountData.push({
              username: username[i],
              password: password[i],
              teamno: parseInt(teamno[i]),
            })
          }
          this.modalUserMatchToggle()
        }
      }else{
        alert('กรูณาเลือกแมทช์ที่เป็นทัวร์นาเมนท์')
      }
    },500)
    localStorage.clear()
  }
  clientHistory = () =>{
    console.log("clientHistory :",this.props.loadUserMatchData[0].matchid);
    this.state.clientHistoryData = []
    this.state.modalUserMatchType = 'clientHistory'
    var geturl2;
    geturl2 = $.ajax({
      type: "POST",
     url: "http://www.thai-pga.com/phpadmin/matchresultscore.php",
     dataType: 'json',
     data: {
       "matchid": this.props.loadUserMatchData[0].matchid,
       "sort": 0
     },
     xhrFields: { withCredentials: true },
     success: function(data) {
       localStorage['userid']=data.userid
       localStorage['fullname']=data.full
       localStorage['lastname']=data.last
       //console.log("matchresultscore",data);
     }
    });
    setTimeout(()=>{
      if(localStorage['userid']){
        var userid = localStorage['userid'];
        var fullname = localStorage['fullname'];
        var lastname = localStorage['lastname'];

        userid = userid.split(",",userid.length)
        fullname = fullname.split(",",fullname.length)
        lastname = lastname.split(",",lastname.length)

        for(var i = 0;i < userid.length;i++){
          this.state.clientHistoryData.push({
            userid: userid[i],
            fullname: fullname[i],
            lastname: lastname[i],
            matchid: this.props.loadUserMatchData[0].matchid
          })
        }
        console.log("clientHistory",this.state.clientHistoryData);
      }
      this.modalUserMatchToggle()
    },500)
    localStorage.clear()
  }
  fileSelectedHandler = event =>{
     console.log(event.target.files[0]);
     console.log(event.target.files[0].name);
     this.setState({
       selectedFile: event.target.files[0]
     })
   }

   fileUploadHandler = event => {
     console.log(this.state.selectedFile);
     console.log(this.state.selectedFile.name);
     const data = new FormData();
   }

  render(){
    this.calculateAvgStat()
    return(
      <div className="usermatch">
        <div className="usermatch__userdetail">
          <div className="userdetail__pic">
            <img src={ic_person}/>
            {(this.state.selectedFile)?
              (<div>{this.state.selectedFile.name}</div>):
              (<div>Picture</div>)}
            <input style={{display:'none'}} type = "file" onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput = fileInput}/>
            <button onClick={() => this.fileInput.click()}>Select Image</button>
            {(this.state.selectedFile)?
              (<button onClick={this.fileUploadHandler}>Upload Image</button>):
              (<button onClick={this.fileUploadHandler} disabled>Upload Image</button>)}
          </div>
            {(this.props.userProfileData.length)?
              (
                this.props.userProfileData.map((d)=>
                  <div className="userdetail__label">
                    <div className="userdetail__name">
                      <div className="userdetail__name__icon">
                        {(d.sex ==='female')?
                          (<img src = {ic_female}></img>):(<img src = {ic_male}></img>)}
                      </div>
                      <div className="userdetail__name__fullname">{d.fullname} {d.lastname} {d.nickname}</div>
                    </div>
                    <div className="userdetail__depart">Department : {d.depart}</div>
                    <div className="userdetail__racket__tel">
                      <div className="userdetail__racket">Racket : {d.favtypegolf}</div>
                      <div className="userdetail__tel">{"Tel : "}{d.tel}</div>
                    </div>
                  </div>
                )
              ):
              (
                <div className="userdetail__label">
                  <div className="userdetail__name">
                    <div className="userdetail__name__icon">
                      <img src = {ic_female}></img>
                    </div>
                    <div className="userdetail__name__fullname">Firstname Lastname (Nickname)</div>
                  </div>
                  <div className="userdetail__depart">Department : Department</div>
                  <div className="userdetail__racket__tel">
                    <div className="userdetail__racket">Racket : Racket</div>
                    <div className="userdetail__tel">{"Tel.080-000-0000"}</div>
                  </div>
                </div>
              )}
        </div>
        <div className="usermatch__controller">
          <div className="usermatch__controller__switch">
            Show Tournament Match
            <SwitchToggle switchToggleState={this.props.TournamentToggle}/>
          </div>
          <button
            onClick = {()=>this.clientHistory()}
            style={{margin:'1rem 0 2rem 2rem'}}>Client History</button>
        </div>
        <div className="userscore__stat__label">
          <div className="userscore__stat__label__date">
            <div className="spacer"></div>{"Date"}<div className="spacer"></div>
            </div>
          <div className="userscore__stat__label__matchname">
            <div className="spacer"></div>{"Match"}<div className="spacer"></div>
          </div>
          <div className="userscore__stat__label__in">
            <div className="spacer"></div>{"IN"}<div className="spacer"></div>
          </div>
          <div className="userscore__stat__label__out">
            <div className="spacer"></div>{"OUT"}<div className="spacer"></div>
          </div>
          <div className="userscore__stat__label__gross">
            <div className="spacer"></div>{"Gross"}<div className="spacer"></div>
          </div>
          <div className="userscore__stat__label__par">
            <div className="spacer"></div>{"PAR"}<div className="spacer"></div>
          </div>
        </div>
        <div className="userscore__stat">
          <div className="userscore__stat__result">
            <div className="spacer"></div>{"RESULT"}<div className="spacer"></div>
          </div>
          <div className="userscore__stat__in">
            <div className="spacer"></div>{this.state.avgStat.in}<div className="spacer"></div>
          </div>
          <div className="userscore__stat__out">
            <div className="spacer"></div>{this.state.avgStat.out}<div className="spacer"></div>
          </div>
          <div className="userscore__stat__gross">
            <div className="spacer"></div>{this.state.avgStat.gross}<div className="spacer"></div>
          </div>
          <div className="userscore__stat__par">
            <div className="spacer"></div>{this.state.avgStat.par}<div className="spacer"></div>
          </div>
        </div>
        <div className="usermatch__userscore">
          {(this.props.loadUserMatchData.length)?
            (
              this.props.loadUserMatchData.map((d)=>
                <div className="userscore__grid">
                  <div className="userscore__date"><div className="spacer"></div>{d.date}<div className="spacer"></div></div>
                  <div className="userscore__matchname">
                    <div className="spacer"></div>
                    <div className="userscore__matchname__grid">
                      {d.matchname}
                      <button onClick={()=>this.loadMatchUserDetail(parseInt(d.matchid),'1User',true)}>{"1User"}</button>
                      <button onClick={()=>this.loadMatchUserDetail(parseInt(d.matchid),'allUser',true)}>All</button>
                      <button onClick={()=>this.modalFillScoreToggle()}>FillScore</button>
                      <button onClick={()=>this.testShow(d)}>Show</button>
                    </div>
                    <div className="spacer"></div>
                  </div>
                  <div className="userscore__in"><div className="spacer"></div>{d.in}<div className="spacer"></div></div>
                  <div className="userscore__out"><div className="spacer"></div>{d.out}<div className="spacer"></div></div>
                  <div className="userscore__gross"><div className="spacer"></div>{d.gross}<div className="spacer"></div></div>
                  <div className="userscore__par"><div className="spacer"></div>{d.par}<div className="spacer"></div></div>
                </div>
              )
            ):(
              <div className="userscore__grid">
                <div className="userscore__date"><div className="spacer"></div>Date<div className="spacer"></div></div>
                <div className="userscore__matchname">
                  <div className="spacer"></div>
                  <div className="userscore__matchname__grid">
                    <p>No match</p>
                    <button onClick={()=>this.loadMatchUserDetail(parseInt(1),'1User',true)}>{"1User"}</button>
                    <button onClick={()=>this.loadMatchUserDetail(parseInt(1),'allUser',true)}>All</button>
                    <button onClick={()=>this.modalFillScoreToggle()}>FillScore</button>
                    <button>Show</button>
                  </div>
                  <div className="spacer"></div>
                </div>
                <div className="userscore__in"><div className="spacer"></div>1<div className="spacer"></div></div>
                <div className="userscore__out"><div className="spacer"></div>1<div className="spacer"></div></div>
                <div className="userscore__gross"><div className="spacer"></div>1<div className="spacer"></div></div>
                <div className="userscore__par"><div className="spacer"></div>1<div className="spacer"></div></div>
              </div>
            )}
        </div>
        <ModalFillScore
          modalState = {this.state.modalFillScoreState}
          modalClick = {this.modalFillScoreToggle}/>
        <ModalUserMatch
          autoRefreshData = {this.autoRefreshData}
          loadMatchUserDetail = {this.loadMatchUserDetail}
          modalType = {this.state.modalUserMatchType}
          matchidUserLoadMatch = {this.state.matchidUserLoadMatch}
          loadUserMatchData = {this.props.loadUserMatchData}
          userProfileData = {this.props.userProfileData}
          setTeamData = {this.state.setTeamData}
          setDepartData = {this.state.setDepartData}
          detailMatchFromLoad = {this.state.detailMatchFromLoad}
          detailUserFromLoad = {this.state.detailUserFromLoad}
          oneUserTempHole = {this.state.holescoreTemp}
          tempHole = {this.state.tempHole}
          detailFieldFromLoad = {this.state.detailFieldFromLoad}
          FieldFromLoadDetail = {this.state.FieldFromLoadDetail}
          clientHistory = {this.state.clientHistoryData}
          tempAccountData = {this.state.tempAccountData}
          modalState = {this.state.modalUserMatchState}
          modalClick = {this.modalUserMatchToggle}/>
      </div>
    );
  }
}
export default UserMatch;
