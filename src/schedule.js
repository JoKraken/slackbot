const slack = require('./bot');
const data = require('./data');
const request = require('./request');
const interCompo = require('./interactiveComponents');


var schedule = require('node-schedule');

//send a message to the users private channel for weekly reminder on monday morning 8:00
//send get event request to server
//var a = schedule.scheduleJob({hour: 8, minute: 0, dayOfWeek: 1}, function(){
var a = schedule.scheduleJob('51 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
  request.get("events", 4);
});

exports.weekScheduleEvent = function (eventList){
  var attachmentArray = eventInfo(eventList);
  data.user.forEach(user => {
    slack.web.chat.postMessage({
      channel: '@'+user.slack_user_id, text: "All upcomming event this week:", attachments: attachmentArray
    });
  });
  
}

//create array with this week events infos
function eventInfo(eventList){
  var array = [];
  var length = eventList.length;
  for(var i = 1; i <= 5; i++){
      var a = length -i;
      if(a >= 0){
          var dateString = eventList[a].date;
          var string = dateString+" "+eventList[a].title+"\n";
          if(eventList[a].startTime != undefined) string += eventList[a].startTime;
          if(eventList[a].endTime != undefined) string += "-"+eventList[a].endTime;
          //string += "\n"+eventList[a].description;
          if(eventList[a].link != undefined) string += "\nTo subscribe to this event please klick <"+eventList[a].link+"|here>";
          array.push(interCompo.dropdownAtta(
              string,
              "NO", "schedule_nofification_art_selection", null
          ));
      }
  }
  //console.log(array);
  return array;
}

//send a message to the users private channel for daily reminder of notifications on 8:00
var b = schedule.scheduleJob('00 8 * * 1-5', function(){
  console.log('Daily nofification at 8:00!');
});