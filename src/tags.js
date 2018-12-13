const slack = require('./bot');
const data = require('./data');
const request = require('./request');

var temp = [];
var tags = [];

// var exports = module.exports = {};

//send post request to server for create a tag
exports.addTags = function(message, channelId, userId){
    var split = message.split("<@UE743CUJZ> tags add ");

    temp[0] = {channel: channelId, user: userId};
    var body = {
        'name': split[1],
    };
    request.post("tags", body, 2);
}

//send a message to confirm that a tag is created
exports.addTagsOut = function(body){
    slack.web.chat.postEphemeral({
        channel:temp[0].channel, user: temp[0].user, text: "The tag "+body.name+" is added"
    })
    temp[0] = [];
}

//send repuest with delete tags
exports.deleteTags = function(message, channelId, userId){
    var split = message.split("<@UE743CUJZ> tags delete ");

    var id = "";
    tags.forEach(tag => {
        if(tag.name == split[1]){
            id = tag._id;
        }
    });

    if(id != ""){
        temp[0] = {channel: channelId, user: userId};
        request.delete("tags", id, 2);
    }else{
        slack.web.chat.postEphemeral({
            channel: channelId, user: userId, text:"There is no tag with this name."
        })
    }
}

//send message with answere of delete tags
exports.deleteTagsOut = function(){
    slack.web.chat.postEphemeral({
        channel: temp[0].channel, user: temp[0].user, text:"The tag is deleted."
    })
}

//send repuest with get tags
exports.getTags = function(message, channelId, userId){
    temp[0] = {channel: channelId, user: userId};
    request.get("tags", 2);
}

//give out the tags 
exports.getTagsOut = function(body){
    var string = "";

    var id = 0;
    tags = body;
    body.forEach(tag => {
        string += tag.name;
        if(id < (body.length-2)){
            string += ", "
        }else if(id < (body.length-1)){
            string += " & "
        }
        id++;
    });

    if(id == 0){
        slack.web.chat.postEphemeral({
            channel: temp[0].channel, user: temp[0].user, text:"There are no tags saved."+
            "\n\nIf you want to add or delete a tag please use: <@UE743CUJZ> tags add/delete [name]"
        })
    }else{
        slack.web.chat.postEphemeral({
            channel: temp[0].channel, user: temp[0].user, text:"All tags: \n"+string+
            "\n\nIf you want to add or delete a tag please use: <@UE743CUJZ> tags add/delete [name]"
        })
    }
    temp[0] = [];
}

//return an array with tags inside
exports.getTagArray = function(){
    var arr = [];

    tags.forEach(tag => {
        arr.push({text: tag.name, value: tag.id});
    });

    return arr;
}

