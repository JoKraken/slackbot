const slack = require('./bot');
const data = require('./data');
const request = require('./request');

var temp = [];
var guidelines = [];
// var exports = module.exports = {};

//send post request to server for create a guideline
exports.addguidelines = function(message, channelId, userId){
    console.log("guidelines add");
    var split = message.split("<@UE743CUJZ> guidelines add ");
    var elements = split[1].split("; ");
    
    temp[0] = {channel: channelId, user: userId};
    var body = {
        'title': elements[0],
        'description': elements[1]
    };
    request.post("guidelines", body, 3);
}

//send a message to confirm that a guideline is created
exports.addGuidelineOut = function(body){
    slack.web.chat.postEphemeral({
        channel:temp[0].channel, user: temp[0].user, text: "The guideline "+body.title+" is added"
    })
    temp[0] = [];
}

//send delete request to server for delete a guideline
exports.deleteguidelines = function(message, channelId, userId){
    //console.log("guidelines delete");
    var split = message.split(" guidelines delete ");

    var id = "";
    guidelines.forEach(guidline => {
        console.log(guidline);
        if(guidline.title == split[1]){
            id = guidline._id;
        }
    });
    console.log("id: "+id);

    if(id == ""){
        slack.web.chat.postEphemeral({
            channel: channelId, user: userId, text:"There is no guideline with this title."
        })
    }else{
        temp[0] = {channel: channelId, user: userId};
        request.delete("guidelines", id, 3);
    }
}

//send delete request to server for delete a guideline
exports.deleteGuidelinesOut = function(){
    slack.web.chat.postEphemeral({
        channel:temp[0].channel, user: temp[0].user, text:"The guideline is deleted."
    })
    temp[0] = [];
}

//send get request to server for get guidelines
exports.getguidelines = function(message, channelId, userId){
    //console.log("message guidelines");
    temp[0] = {channel: channelId, user: userId};
    request.get("guidelines", 3);
}

//send message with the guidelines
exports.getGuidelinesOut = function(body){
    //console.log("getguidelinesString");
    var string = "";
    var id = 1;
    guidelines = body;
    body.forEach(guidline => {
        string += "\n"+id+". "+guidline.title+"\n"+
                guidline.description;
        id++;
    });

    if(string == ""){
        slack.web.chat.postEphemeral({
            channel:temp[0].channel, user: temp[0].user, text: "There are no guidelines saved."+
            "\n\nIf you want to add or delete a tag please use: <@UE743CUJZ> guidelines add/delete [title]"
        });
    }else{
        slack.web.chat.postEphemeral({
            channel:temp[0].channel, user: temp[0].user, text: "All guidelines: "+string+
            "\n\nIf you want to add or delete a tag please use: <@UE743CUJZ> guidelines add/delete [title]"
        });
    }
    temp[0] = [];
}