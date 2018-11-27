const slack = require('./bot');
const data = require('./data');
const interCompo = require('./interactiveComponents');
const tags = require('./tags');

// var exports = module.exports = {};

//give out infos to create an event
exports.eventCreateInfo = function(channel){
    console.log("message event create info");

    slack.bot.postMessageToChannel(
        channel, "Create an event: \nTo create an event please use the following format:\n"+
        "<@UE743CUJZ> event [dd.mm.yyy]; [title]; [description](; [subscrip link])\n"+
        "After that you can choose the tags, the start( & end) time and the time of notification."
        );
}

//give out all events
exports.eventAll = function (channel){
    console.log("message event all "+data.event.length);

    if(data.event.length == 0){
        console.log("no event");
        slack.bot.postMessageToChannel(channel, "No events are saved");
    }else{
        console.log("event");

        var string = {
            "text": "All upcomming <http://www.google.com|events>:",
            "response_type": "in_channel",
            "attachments":[]
        }
        slack.bot.postMessageToChannel(channel, "All upcomming <http://www.google.com|events>:", string);
        setTimeout(() => {
            sendEventInfo(channel);
        }, 500);
    }
}

//send messages with events infos
function sendEventInfo(channel){
    //console.log("sendEventInfo");
    var length = data.event.length;
    for(var i = 1; i <= 5; i++){
        var a = length -i;
        var notiArray = getNotiArray();
        if(a >= 0){
            var dateString = data.event[a].date.getDate()+"."+(data.event[a].date.getMonth()+1)+"."+data.event[a].date.getFullYear();
            slack.bot.postMessageToChannel(channel, "",
                interCompo.dropdown(
                    "", dateString+" "+data.event[a].title, "NO", "nofification_art_selection", notiArray
                )
            );
        }
    }
}

//return the time ntification for dropdown
function getNotiArray(){
    //console.log("getNotiArray");
    var notiArray = [];
    
    data.noti_art.forEach(noti => {
        notiArray.push({text: noti.name, value: noti.id});
    });
    
    return notiArray;
}

//give out the event options if you the format is right 
//if not give a hint to the format
exports.eventCreate = function(message, channel){
    console.log("message event create");

    console.log(message);

    if(!createEvent(message)){
        slack.bot.postMessageToChannel(
            channel, "Event could not be created. Please use this formatation: \n <@UE743CUJZ> event [dd.mm.yyy]; [title]; [description](; [subscrip link])");
    }else{
        console.log("Event could be created");

        var tagArray = tags.getTagArray();
        //console.log(tagArray);
        slack.bot.postMessageToChannel(
            channel, "", 
            interCompo.dropdown(
                "Event could be created", "Choose a tag", "Pick a tag...", "tag_selection",tagArray
            )
        );
        setTimeout(() => {
            var timeArray = createTimeArray();
            //console.log(timeArray);
            var dropdown = interCompo.dropdown(
                "", "Choose a time", "Pick a start time...", "start_time_selection", timeArray
            );
            dropdown.attachments[0].actions.push({
                "name": "list",
                "text": "Pick a end time...",
                "type": "select",
                "options": timeArray
            });
            slack.bot.postMessageToChannel(
                channel, "", dropdown
            );
            setTimeout(() => {
                var event = data.event[data.event.length-1];
                var date = new Date(event.date);
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

//return the time array for dropdown
function createTimeArray(){
    //console.log("createTimeArray");
    var timeArray = [];
    for(var i = 9; i <= 20; i++){
        for(var a = 0; a <= 1; a++){
            var string = "";
            if(a == 0){
                string = i+":00";
            } else {
                string = i+":"+(a*30);
            }
            timeArray.push({text: string, value: string});
        }
    }
    return timeArray;
}

//craete an event
function createEvent(message){
    var split = message.split("<@UE743CUJZ> event ");
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
        newEvent.date.setMonth(date[1]-1) //januar:0, februar:1, ...
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