const slack = require('./bot');
const data = require('./data');

// var exports = module.exports = {};

//send message with the tags
exports.getTags = function(message, channel){
    //console.log("message tags");
    var tags = getTagsString();

    slack.bot.postMessageToChannel(
        channel, "All tags: \n"+tags
    )
}

//return an array with tags inside
exports.getTagArray = function(){
    console.log("getTagArray");
    var temp = [];

    data.tags.forEach(tag => {
        temp.push({text: tag.name, value: tag.name});
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

