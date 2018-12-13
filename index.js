require('dotenv/config')
const slack = require('./src/bot');
const event = require('./src/event');
const guidelines = require('./src/guidelines');
const tag = require('./src/tags');
const user = require('./src/user');
const data = require('./src/data');
//const express = require('./src/express');
const request = require('./src/request');
const schedule = require('./src/schedule');

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
  if (message.includes(' guidelines delete')) {
    guidelines.deleteguidelines(message, channel, userId);
  } else if (message.includes(' guidelines add')) {
    guidelines.addguidelines(message, channel, userId);
  } else if (message.includes(' guidelines')) {
    guidelines.getguidelines(message, channel, userId);
  } else if (message.includes(' tags delete')) {
    tag.deleteTags(message, channel, userId);
  } else if (message.includes(' tags add')) {
    tag.addTags(message, channel, userId);
  } else if (message.includes(' tags')) {
    tag.getTags(message, channel, userId);
  }else if (message.includes(' event create')) {
    event.eventCreateInfo(channel, userId);
  }  else if (message.includes(' event all')) {
    event.eventAll(message, channel, userId); 
  } else if (message.includes(' event delete')) {
    event.deleteEvent(message, channel, userId);
  } else if (message.includes(';') && message.includes(' event ')){
    event.eventCreate(message, channel, userId);
  }else if (message.includes('<@UE743CUJZ>') || message.includes('<@UEHKUE9SP>')){
    help(message, channel, userId);
  }
}


//helper function (what you can do with the bot)
function help(message, channelId, userId){
  slack.web.chat.postEphemeral({
    channel: channelId, 
    user: userId,
    text: "@memoria ...\n"+
    "... guidelines               (show all guidelines for communication)\n"+
    "... tags                         (show all the tags that are in use)\n"+
    "... event all [tag]         (show all events, filter with a tag name)\n"+
    "... event create           (information how to create an event)\n"
  });
}