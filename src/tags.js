const slack = require('./bot');
const data = require('./data');

// var exports = module.exports = {};

//add a tag
exports.addTags = function(message, channelId, userId){
    //console.log("tags add");
    var split = message.split("<@UE743CUJZ> tags add ");

    data.tags.push(new data.Tag(data.tags.length, split[1]));

    slack.web.chat.postEphemeral({
        channel:channelId, user:userId, text: "The tag "+split[1]+" is added"
    })
}

//delete a tag
exports.deleteTags = function(message, channelId, userId){
    //console.log("tags delete");
    var split = message.split("<@UE743CUJZ> tags delete ");

    var temp = 0;
    data.tags.forEach(tag => {
        if(tag.name == split[1]){
            data.tags.splice(temp, 1);
        }
        temp++;
    });

    slack.web.chat.postEphemeral({
        channel: channelId, user:userId, text:"The tag "+split[1]+" is deleted."
    })
}

//send message with the tags
exports.getTags = function(message, channelId, userId){
    //console.log("message tags");
    var tags = getTagsString();

    slack.web.chat.postEphemeral({
        channel:channelId, user:userId, text:"All tags: \n"+tags
    })
}

//return an array with tags inside
exports.getTagArray = function(){
    //console.log("getTagArray");
    var temp = [];

    data.tags.forEach(tag => {
        temp.push({text: tag.name, value: tag.id});
    });

    return temp;
}

//return the tags as string
function getTagsString(){
    var temp = "";

    data.tags.forEach(tag => {
        temp += tag.name;
        if(tag.id < (data.tags.length-2)){
            temp += ", "
        }else if(tag.id < (data.tags.length-1)){
            temp += " & "
        }
    });

    return temp;
}

