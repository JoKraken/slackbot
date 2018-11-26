const slack = require('./bot');
const data = require('./data');

// var exports = module.exports = {};

//send message with the guidlines
exports.guidlines = function(message, channel){
    //console.log("message guidlines");
    var guidlines = getGuidlinesString();

    slack.bot.postMessageToChannel(
        channel, "All guidlines: "+guidlines
    );
}

//return the guidlines as a string
function getGuidlinesString(){
    //console.log("getGuidlinesString");
    var temp = "";

    data.guidlines.forEach(guidline => {
        temp += "\n"+(guidline.id+1)+". "+guidline.name+"\n"+
                guidline.text;
    });
    return temp;
}