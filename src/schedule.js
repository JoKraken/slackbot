const slack = require('./bot');
const data = require('./data');
const request = require('./request');


var schedule = require('node-schedule');

//send a message to the users private channel for weekly reminder
var a = schedule.scheduleJob('50 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
  data.user.forEach(user => {
    console.log(user)
    slack.web.chat.postMessage({channel:'@'+user.slack_user_id, text:'hi!'})
  });
});