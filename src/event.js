const slack = require('./bot');

// var exports = module.exports = {};

exports.eventsAll =  function(message, channel){
    console.log("message event all");

    slack.bot.postMessageToChannel(channel, "All upcomming events:");
}

exports.eventCreate = function(message, channel){
    console.log("message event create");

    slack.bot.postMessageToChannel(channel, "Create an event:");
}