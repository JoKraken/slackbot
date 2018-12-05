const slack = require('./bot');
const data = require('./data');

var temp = [];
// var exports = module.exports = {};

//add a tag
exports.addguidelines = function(message, channelId, userId){
    console.log("guidelines add");
    var split = message.split("<@UE743CUJZ> guidelines add ");
    var elements = split[1].split("; ");

    console.log(elements);
    data.guidelines.push(new data.Guidline(
                            data.guidelines.length, 
                            elements[0],
                            elements[1]));

    
    temp[0] = {channel: channelId, user: userId};
    var body = {
        'title': elements[0],
        'description': elements[1]
    };
    request.post("guidelines", body, 3);
    slack.web.chat.postEphemeral({
        channel: channelId, user:userId, text: "The guidline with the title "+elements[0]+" is added"
    })
}

//delete a tag
exports.deleteguidelines = function(message, channelId, userId){
    console.log("guidelines delete");
    var split = message.split(" guidelines delete ");

    var temp = 0;
    data.guidelines.forEach(guidline => {
        if(guidline.name == split[1]){
            data.guidelines.splice(temp, 1);
        }
        temp++;
    });

    slack.web.chat.postEphemeral({
        channel: channelId, user: userId, text:"The tag "+split[1]+" is deleted."
    })
}

//send message with the guidelines
exports.getguidelines = function(message, channelId, userId){
    //console.log("message guidelines");
    var guidelines = getguidelinesString();

    slack.web.chat.postEphemeral({
        channel: channelId, user:userId, text: "All guidelines: "+guidelines+
        "\n\nIf you want to add or delete a tag please use: <@UE743CUJZ> guidelines add/delete [name]"
    });
}

//return the guidelines as a string
function getguidelinesString(){
    //console.log("getguidelinesString");
    var temp = "";

    data.guidelines.forEach(guidline => {
        temp += "\n"+(guidline.id+1)+". "+guidline.name+"\n"+
                guidline.text;
    });
    return temp;
}