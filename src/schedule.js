const slack = require('./bot');
const data = require('./data');
const request = require('./request');
const interCompo = require('./interactiveComponents');


var schedule = require('node-schedule');

//send a message to the users private channel for weekly reminder on monday morning 8:00
//send get event request to server
var a = schedule.scheduleJob({hour: 8, minute: 0, dayOfWeek: 1}, function(){
  console.log('The answer to life, the universe, and everything!');
  request.get("events", 4);
});

exports.weekScheduleEvent = function (eventList){
  var attachmentArray = eventInfo(eventList);
  data.user.forEach(user => {
    if(attachmentArray.length == 0){
      slack.web.chat.postMessage({
        channel: '@'+user.slack_user_id, text: "There are no upcomming event this week!", attachments: attachmentArray
      });
    }else{
      slack.web.chat.postMessage({
        channel: '@'+user.slack_user_id, text: "All upcomming event this week:", attachments: attachmentArray
      });
    }
  });
  
}

//create array with this week events infos
function eventInfo(eventList){
  var array = [];
  var length = eventList.length;
  var max = 5;
  for(var i = 1; i <= max; i++){
      var a = length -i;
      if(a >= 0){
        var dateString = eventList[a].date;
        var startDate = new Date().setHours(0);
        startDate = new Date(startDate).setMinutes(0);
        startDate = new Date(startDate).setMilliseconds(0);
        console.log(new Date(startDate));
        var endDate = new Date(new Date(startDate).getTime() + (7 * 24 * 60 * 60 * 1000));
        var arr = eventList[a].date.split(".");
        var date = new Date(arr[2], (arr[1]-1), arr[0])
        date = date.setMinutes(5);
        console.log(date);
        if(startDate <= date && endDate.getTime() >= date){
          var string = dateString+" "+eventList[a].title+"\n";
          if(eventList[a].startTime != undefined) string += eventList[a].startTime;
          if(eventList[a].endTime != undefined) string += "-"+eventList[a].endTime;
          if(eventList[a].tag != undefined) string += " - tag: "+eventList[a].tag;
          if(eventList[a].link != undefined && eventList[a].link != "") string += "\nTo subscribe to this event please klick <"+eventList[a].link+"|here>";
          array.push(interCompo.dropdownAtta(
              string,
              "NO", "schedule_nofification_art_selection", null
          ));
        } else {
          max++;
        }
      }
  }
  return array;
}

//send a message to the users private channel for daily reminder of notifications on 8:00
var b = schedule.scheduleJob('00 8 * * 1-5', function(){
  console.log('Daily nofification at 8:00!');
});