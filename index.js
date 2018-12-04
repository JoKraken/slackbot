require('dotenv/config')
const slack = require('./src/bot');
const event = require('./src/event');
const guidlines = require('./src/guidlines');
const tag = require('./src/tags');
const user = require('./src/user');
const data = require('./src/data');
const express = require('./src/express');
const request = require('./src/request');

// Message Handler
slack.bot.on('message', (res) => {
  if (res.type !== 'message' || res.bot_id != undefined) {
    return;
  }
  console.log(res);

  if(!user.UserExist(res.user)){
      user.createUser(res.user);
  }
  handleMessage(res.text, res.channel, res.user);

});

slack.bot.on('', (res) => {
  console.log(res);
});

// Respons to message
function handleMessage(message, channel, userId) {
  console.log("handleMessage");
  //send a message to Johannas private channel (reminder)
  // slack.bot.postEphemeralToUser('johanna.kraken', 'hi!', {icon_emoji: ':cat:' }).always(function(res) {
  //   console.log("postEphemeralToUser");
  //   console.log(res);
  // }); 
  if (message.includes(' guidlines delete')) {
    console.log("handleMessage: guidlines delete");
    guidlines.deleteGuidlines(message, channel, userId);
  } else if (message.includes(' guidlines add')) {
    console.log("handleMessage: guidlines add");
    guidlines.addGuidlines(message, channel, userId);
  } else if (message.includes(' guidlines')) {
    //console.log("handleMessage: guidlines");
    guidlines.getGuidlines(message, channel, userId);
  } else if (message.includes(' tags delete')) {
    console.log("handleMessage: tags delete");
    tag.deleteTags(message, channel, userId);
  } else if (message.includes(' tags add')) {
    console.log("handleMessage: tags add");
    tag.addTags(message, channel, userId);
  } else if (message.includes(' tags')) {
    //console.log("handleMessage: tags");
    tag.getTags(message, channel, userId);
  }else if (message.includes(' event create')) {
    //console.log("handleMessage: event create info");
    event.eventCreateInfo(channel, userId);
  }  else if (message.includes(' event all')) {
    //console.log("handleMessage: event all");
    event.eventAll(channel, userId);
  } else if (message.includes(';') && message.includes(' event ')){
    //console.log("handleMessage: create an event ");
    event.eventCreate(message, channel, userId);
  }else if (message.includes('<@UE743CUJZ>') || message.includes('<@UEHKUE9SP>')){
    //console.log("help")
    help(message, channel, userId);
  }
}


//helper function (what you can do with the bot)
function help(message, channelId, userId){
  console.log("message help");

  slack.web.chat.postEphemeral({
    channel: channelId, 
    user: userId,
    text: "@memoria ...\n"+
    "... guidlines                 (show all guidlines)\n"+
    "... tags                         (show all the tags that are in use)\n"+
    "... event all [#tag]       (show all events, filter with #tag)\n"+
    "... event create           (information how to create an event)\n"
    /*
    "... event ...    \n"+
    "     ... all [#tag]    (show all events, filter with #tag)\n"+
    "     ... create        (information how to create an event)\n"*/
  });
}