const slack = require('./bot');
const data = require('./data');

// var exports = module.exports = {};

exports.guidlines = function(message, channel){
    //console.log("message guidlines");
    var guidlines = getGuidlinesString();

    slack.bot.postMessageToChannel(
        channel, "All guidlines: "+guidlines
    );
}

exports.tags = function(message, channel){
    //console.log("message tags");
    var tags = getTagsString();

    slack.bot.postMessageToChannel(
        channel, "All tags: \n"+tags
    )
}

function getGuidlinesString(){
    //console.log("getGuidlinesString");
    var temp = "";

    data.guidlines.forEach(guidline => {
        temp += "\n"+(guidline.id+1)+". "+guidline.name+"\n"+
                guidline.text;
    });
    return temp;
}

function getTagsString(){
    //console.log("getTagsString");
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