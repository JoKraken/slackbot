//crate slack bot

const { RTMClient, WebClient } = require('@slack/client');

// The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(process.env.SLACK_BOTUSER_OAUTH_ACCESS_TOKEN); //getting messages from slack
const web = new WebClient(process.env.SLACK_BOTUSER_OAUTH_ACCESS_TOKEN); //sending messages to slack
rtm.start();

exports.web = web;
exports.bot = rtm;