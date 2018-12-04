const slack = require('./bot');
const data = require('./data');
const interCompo = require('./interactiveComponents');
const tags = require('./tags');
const request = require('./request');

var temp = [];

// var exports = module.exports = {};

//give out infos to create an event
exports.eventCreateInfo = function(channelId, userId){
    //("message event create info");

    slack.web.chat.postEphemeral({
        channel: channelId, user:userId, text:"Create an event: \nTo create an event please use the following format:\n"+
        "<@UE743CUJZ> event [dd.mm.yyy]; [title]; [description](; [subscrip link])\n"+
        "After that you can choose the tags, the start( & end) time and the time of notification."
    });
}

//send get event request to server
exports.eventAll = function (channelId, userId){
    temp = [{channel: channelId, user: userId}];
    request.get("events", 1);
}

//give all events out
exports.eventAllOut = function (eventList){
    console.log("eventAllOut");
    if(eventList.length == 0){
        //console.log("no event");
        slack.web.chat.postEphemeral({
            channel: temp[0].channel, user:temp[0].user, text:"No events are saved"});
    }else{
        //console.log("event");
        var attachmentArray = eventInfoAttachments(eventList);
        slack.web.chat.postEphemeral({
            channel: temp[0].channel, user: temp[0].user, text: "All upcomming <http://www.google.com|events>:", attachments: attachmentArray});
    }
    temp[0] = [];
}

//send messages with events infos
function eventInfoAttachments(eventList){
    var array = [];
    var length = eventList.length;
    for(var i = 1; i <= 5; i++){
        var a = length -i;
        var notiArray = getNotiArray();
        if(a >= 0){
            var dateString = eventList[a].date;//data.event[a].date.getDate()+"."+(data.event[a].date.getMonth()+1)+"."+data.event[a].date.getFullYear();
            array.push(interCompo.dropdownAtta(
                dateString+" "+eventList[a].title, "NO", "nofification_art_selection", notiArray
            ));
        }
    }
    //console.log(array);
    return array;
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
exports.eventCreate = function(message, channel, userId){
    //console.log("message event create");


    if(!createEvent(message)){
        // slack.bot.postEphemeralToChannel(
        //     channel, "Event could not be created. Please use this formatation: \n <@UE743CUJZ> event [dd.mm.yyy]; [title]; [description](; [subscrip link])");
        web.chat.postEphemeral({ 
            channel: channel, 
            user: userId,
            text: "Event could not be created. Please use this formatation: \n <@UE743CUJZ> event [dd.mm.yyy]; [title]; [description](; [subscrip link])" 
        });
    }else{
        //console.log("Event could be created");

        var attachmentsArray = eventCreateAttachments();
        //slack.bot.postEphemeralToChannel(channel, "Event could be created", string); 
        slack.web.chat.postEphemeral({ 
            channel: channel, 
            user: userId,
            text: "Event could be created",
            attachments: attachmentsArray
        });       
    }
    
}

//return the tags, start and end time dropdown & the confirm buttons
function eventCreateAttachments(){
    var array = [];

    var tagArray = tags.getTagArray();
    array.push(interCompo.dropdownAtta(
        "Choose a tag", "Pick a tag...", "tag_selection", tagArray
    ));

    var timeArray = createTimeArray();
    var dropdown = interCompo.dropdownAtta(
        "Choose a time", "Pick a start time...", "start_time_selection", timeArray
    );
    dropdown.actions.push({
        "name": "list",
        "text": "Pick a end time...",
        "type": "select",
        "options": timeArray
    });
    array.push(dropdown);

    var event = temp[1];
    temp[1] = [];
    array.push(interCompo.confirmButtonAtta(
        "You created the event '"+event.title+"' at the "+event.date+". \nWould you like to save the event?", "save_edit_delete_buttons"
    ));
    //console.log(array);

    return array;
}

//return the time array for dropdown
function createTimeArray(){
    //console.log("createTimeArray");
    var timeArray = [];
    for(var i = 8; i <= 20; i++){
        for(var a = 0; a <= 3; a++){
            var string = "";
            if(a == 0){
                string = i+":00";
            } else {
                string = i+":"+(a*15);
            }
            timeArray.push({text: string, value: string});
        }
    }
    return timeArray;
}

//craete an event
function createEvent(message){
    var split = message.split(" event ");
    var arr = split[1].split(";");
    if(arr.length >= 3){

        var body = {
            'title': arr[1],
            'date': arr[0],
            'description': arr[2]
            //'link': arr[3];
        };
        temp[1] = body;
        request.post("events", body);
    }else{
        return false;
    }
    return true;
}