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

function getGuidlinesString(){
    //console.log("getGuidlinesString");
    var temp = "";

    data.guidlines.forEach(guidline => {
        temp += "\n"+(guidline.id+1)+". "+guidline.name+"\n"+
                guidline.text;
    });
    return temp;
}