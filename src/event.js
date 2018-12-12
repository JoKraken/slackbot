const slack = require('./bot');
const data = require('./data');
const interCompo = require('./interactiveComponents');
const tags = require('./tags');
const request = require('./request');

var temp = [];
var event = [];

//give out infos to create an event
exports.eventCreateInfo = function(channelId, userId){
    //("message event create info");

    slack.web.chat.postEphemeral({
        channel: channelId, user:userId, text:"Create an event: \nTo create an event please use the following format:\n"+
        "<@UE743CUJZ> event [dd.mm.yyy] [start time:hh:mm]-[end time:hh:mm]; [title]; [description](; [tag])(; [subscrip link])\n"
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
            channel: temp[0].channel, user: temp[0].user, text: "All upcomming <http://www.google.com|events>:", attachments: attachmentArray
        });
    }
    temp[0] = [];
}

//create array with the last 5 events infos
function eventInfoAttachments(eventList){
    event = eventList;
    var array = [];
    var length = eventList.length;
    for(var i = 1; i <= 5; i++){
        var a = length -i;
        //var notiArray = getNotiArray();
        console.log(eventList[a]);
        if(a >= 0){
            var dateString = eventList[a].date;
            var string = dateString+" "+eventList[a].title+"\n";
            if(eventList[a].startTime != undefined) string += eventList[a].startTime;
            if(eventList[a].endTime != undefined) string += "-"+eventList[a].endTime;
            if(eventList[a].tag != undefined) string += " - tag:"+eventList[a].tag;
            string += "\n"+eventList[a].description;
            if(eventList[a].link != undefined) string += "\nTo subscribe to this event please klick <"+eventList[a].link+"|here>";
            array.push(interCompo.dropdownAtta(
                string,
                "NO", "nofification_art_selection", null//notiArray
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
        slack.web.chat.postEphemeral({ 
            channel: channel, 
            user: userId,
            text: "Event could not be created. Please use this formatation: \n <@UE743CUJZ> event [dd.mm.yyy] [start time:hh:mm]-[end time:hh:mm]; [title]; [description](; [tag])(; [subscrip link])" 
        });
    }else{
        //console.log("Event could be created");

        //var attachmentsArray = eventCreateAttachments();
        slack.web.chat.postEphemeral({ 
            channel: channel, 
            user: userId,
            text: "Event could be created"
            //attachments: attachmentsArray
        });       
    }
    
}

exports.createEventOut = function(event){
    console.log(event);
    var dateString = event.date;
    var string = "*"+dateString+" "+event.title+"*\n";
    if(event.startTime != undefined) string += event.startTime;
    if(event.endTime != undefined) string += "-"+event.endTime;
    if(event.tag != undefined) string += " - tag:"+event.tag;
    string += "\n"+event.description;
    if(event.link != undefined) string += "\nTo subscribe to this event please klick <"+event.link+"|here>";
    var arr =[];
    arr.push(interCompo.dropdownAtta(
        string, "", "", null
    ));
    slack.web.chat.postMessage({ 
        channel: "event", 
        text: "",
        attachments: arr
    });  
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
        var link = arr[4].split("<");
        var link = link[1].split("|");
        var body = {
            'title': arr[1],
            'description': arr[2],
            'tag': arr[3],
            'link': link[0]
        };
        var date = arr[0].split(" ");
        if(date.length == 1){
            body["date"] = arr[0];
        }else if(date.length == 2){
            body["date"] = date[0];
            var time = date[1].split("-");
            body["startTime"] = time[0];
            if(time.length ==2) body["endTime"] = time[1];
        } else return false;
        console.log(body);
        temp[1] = body;
        request.post("events", body, 1);
    }else{
        return false;
    }
    return true;
}


//send repuest with delete tags
exports.deleteEvent = function(message, channelId, userId){
    //console.log("tags delete");
    var split = message.split("<@UE743CUJZ> event delete");

    var id = "";
    event.forEach(ev => {
        if(ev.title == split[1]){
            id = ev._id;
        }
    });

    console.log(id);
    if(id != ""){
        temp[0] = {channel: channelId, user: userId};
        request.delete("events", id, 1);
    }else{
        slack.web.chat.postEphemeral({
            channel: channelId, user: userId, text:"There is no event with this title."
        })
    }
}

//send message with answere of delete tags
exports.deleteEventOut = function(){
    slack.web.chat.postEphemeral({
        channel: temp[0].channel, user: temp[0].user, text:"The event is deleted."
    })
    temp[0] = [];
}
