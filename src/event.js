const slack = require('./bot');
const data = require('./data');

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
        slack.bot.postMessageToChannel(
            channel, "");
    }
    
}

function createEvent(message){
    var split = message.split("<@UE743CUJZ> ");
    console.log(split);
    var newEvent = new data.Event();
    var arr = split[1].split(";");
    if(arr.length >= 3){
        newEvent.id = data.event.length;
        console.log(arr);
        newEvent.title = arr[1];
        console.log(arr);
        newEvent.description = arr[2];
        console.log(arr);
        newEvent.date = new Date(arr[0]);
        if(arr.length >= 4){
            newEvent.link = arr[3];
        }
        console.log(newEvent);
    }else{
        return false;
    }

    return true;
}