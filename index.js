const slack = require('./src/bot');
const event = require('./src/event');
const guidlines = require('./src/guidlines');
const tag = require('./src/tags');

const user = require('./src/user');
const data = require('./src/data');

// Start Handler
slack.bot.on('start', () => {
  console.log("start");
});

// Error Handler
slack.bot.on('error', err => console.log(err));


// Message Handler
slack.bot.on('message', res => {
  if (res.type !== 'message' || res.bot_id != undefined) {
    return;
  }
  console.log(res);
  const temp = res;
  
  slack.bot.getChannelById(res.channel).always(function(res2) {
    console.log(temp.user)
    const channel = res2._value.name

    if(!user.UserExist(temp.user)){
        user.createUser(temp.user);
    }
    handleMessage(temp.text, channel);
  });

});

// Respons to message
function handleMessage(message, channel) {
  if (message.includes(' guidlines')) {
    //console.log("handleMessage: guidlines");
    guidlines.guidlines(message, channel);
  } else if (message.includes(' tags')) {
    //console.log("handleMessage: tags");
    tag.getTags(message, channel);
  }else if (message.includes(' event create')) {
    //console.log("handleMessage: event create info");
    event.eventCreateInfo(channel);
  }  else if (message.includes(' event all')) {
    //console.log("handleMessage: event all");
    event.eventAll(channel);
  } else if (message.includes(';') && message.includes('<@UE743CUJZ> ')){
    //console.log("handleMessage: create an event ");
    event.eventCreate(message, channel);
  }else if (message.includes('<@UE743CUJZ>')){
    //console.log("help")
    help(message, channel);
  }
}

//helper function (what you can do with the bot)
function help(message, channel){
  console.log("message help");

  slack.bot.postMessageToChannel(channel, 
    "@memoria ...\n"+
    "... guidlines                 (show all guidlines)\n"+
    "... tags                         (show all the tags that are in use)\n"+
    "... event all [#tag]       (show all events, filter with #tag)\n"+
    "... event create           (information how to create an event)\n"
    /*
    "... event ...    \n"+
    "     ... all [#tag]    (show all events, filter with #tag)\n"+
    "     ... create        (information how to create an event)\n"*/
  );
}