const slack = require('./bot');
const data = require('./data');

// var exports = module.exports = {};

//add a tag
exports.addGuidlines = function(message, channel){
    console.log("guidlines add");
    var split = message.split("<@UE743CUJZ> guidlines add ");
    var elements = split[1].split("; ");

    console.log(elements);
    data.guidlines.push(new data.Guidline(
                            data.guidlines.length, 
                            elements[0],
                            elements[1]));

    slack.bot.postMessageToChannel(
        channel, "The guidline with the title "+elements[0]+" is added"
    )
}

//delete a tag
exports.deleteGuidlines = function(message, channel){
    console.log("guidlines delete");
    var split = message.split("<@UE743CUJZ> guidlines delete ");

    var temp = 0;
    data.guidlines.forEach(guidline => {
        if(guidline.name == split[1]){
            data.guidlines.splice(temp, 1);
        }
        temp++;
    });

    slack.bot.postMessageToChannel(
        channel, "The tag "+split[1]+" is deleted."
    )
}

//send message with the guidlines
exports.getGuidlines = function(message, channel){
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