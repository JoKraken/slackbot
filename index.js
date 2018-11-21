const slack = require('./src/bot');
const event = require('./src/event');
const guidlines = require('./src/guidlines');


// Start Handler
slack.bot.on('start', () => {
  console.log("start");
});

// Error Handler
slack.bot.on('error', err => console.log(err));


// Message Handler
slack.bot.on('message', data => {
  if (data.type !== 'message' || data.bot_id != undefined) {
    return;
  }
  console.log(data);
  const temp = data;
  
  slack.bot.getChannelById(data.channel).always(function(data) {
    //console.log(data)
    const channel = data._value.name

    handleMessage(temp.text, channel);
  })
  
});

// Respons to Data
function handleMessage(message, channel) {
  if (message.includes(' guidlines')) {
    console.log("handleMessage: guidlines")
    guidlines.guidlines(message, channel);
  } else if (message.includes(' tags')) {
    console.log("handleMessage: tags")
    guidlines.tags(message, channel);
  } else if (message.includes(' event all')) {
    console.log("handleMessage: event all")
    event.eventsAll(message, channel);
  } else if (message.includes(' event create')) {
    console.log("handleMessage: event create info")
    event.eventCreateInfo(message, channel);
  } else if (message.includes('; ')){
    console.log("handleMessage: create an event ")
    event.eventCreate(message, channel);
  }else if (message.includes('<@UE743CUJZ>')){
    console.log("help")
    help(message, channel);
  }
}

function help(message, channel){
  console.log("message help");

  slack.bot.postMessageToChannel(channel, 
    "@memoria ... #tag\n"+
    "... guidlines        (show all guidlines)\n"+
    "... tags              (show all the tags that are in use)\n"+
    "... event all        (show all events)\n"+
    "... event create   (information how to create an event)\n"
  );
}