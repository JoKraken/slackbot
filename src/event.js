const slack = require('./bot');
const data = require('./data');
const interCompo = require('./interactiveComponents');
const tags = require('./tags');

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

        var tagArray = tags.getTagArray();
        slack.bot.postMessageToChannel(
            channel, "", 
            interCompo.dropdown(
                "Event could be created", "Choose a tag", "Pick a tag...", "tag_selection",tagArray
            )
        );
        setTimeout(() => {
            var timeArray = createTimeArray();
            slack.bot.postMessageToChannel(
                channel, "", 
                interCompo.dropdown(
                    "", "Choose a start time", "Pick a time...", "start_time_selection", timeArray
                )
            );
            slack.bot.postMessageToChannel(
                channel, "", 
                interCompo.dropdown(
                    "", "Choose a end time", "Pick a time...", "end_time_selection", timeArray
                )
            );
            setTimeout(() => {
                var event = data.event[data.event.length-1];
                console.log(event.date);
                var date = new Date(event.date);
                console.log(date);
                var dateString = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()
                slack.bot.postMessageToChannel(
                    channel, "", 
                    interCompo.confirmButton(
                        "", "You created the event '"+event.title+"' at the "+dateString+". \nWould you like to save the event?", "save_selection"
                    )
                );
            }, 1000);
        }, 500);
        
    }
    
}

function createTimeArray(){
    console.log("createTimeArray");
    var timeArray = [];
    for(var i = 8; i <= 22; i++){
        for(var a = 0; a <= 1; a++){
            var string = "";
            if(a == 0){
                string = i+":00";
            } else {
                string = i+":"+(a*30);
            }
            timeArray.push({name: string, value: string});
        }
    }
    return timeArray;
}

function createEvent(message){
    var split = message.split("<@UE743CUJZ> ");
    console.log(split);
    var newEvent = new data.Event();
    var arr = split[1].split(";");
    if(arr.length >= 3){
        newEvent.id = data.event.length;
        newEvent.title = arr[1];
        newEvent.description = arr[2];

        newEvent.date = new Date();
        var date = arr[0].split(".")
        console.log(date);
        newEvent.date.setDate(date[0])
        newEvent.date.setMonth(date[1]-1)
        newEvent.date.setYear(date[2])
        if(arr.length >= 4){
            newEvent.link = arr[3];
        }
        data.event.push(newEvent);
        console.log(data.event);
    }else{
        return false;
    }

    return true;
}