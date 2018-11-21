const slack = require('./bot');

// var exports = module.exports = {};

exports.eventsAll =  function(message, channel){
    console.log("message event all");

    slack.bot.postMessageToChannel(channel, "All upcomming events:");
}

exports.eventCreateInfo = function(message, channel){
    console.log("message event create info");

    slack.bot.postMessageToChannel(
        channel, "Create an event: \nTo create an event please use the following format:\n"+
        "<@UE743CUJZ> event [dd.mm.yyy]; [title]; [description](; [subscrip link])\n"+
        "After that you can choose the tags, the start( & end) time and the time of notification."
        );
}

exports.eventCreate = function(message, channel){
    console.log("message event create");

    console.log(message);

    if(!createEvent(message)){
        slack.bot.postMessageToChannel(
            channel, "Event could not be created. Please use this formatation: \n <@UE743CUJZ> event [dd.mm.yyy]; [title]; [description](; [subscrip link])");
    }else{
        console.log("Event could be created");
    }
    
}

function createEvent(message){
    var split = message.split("event ");
    console.log(split);
    var arr = split.split(";").map(function (val) {
        return Number(val) + 1;
    });

    return true;
}