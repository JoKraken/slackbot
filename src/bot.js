
//crate slack bot

// var exports = module.exports = {};

const SlackBot = require('slackbots');
//const axios = require('axios');

process.env.SLACK_SIGNING_SECRET = "xoxb-482822215075-483139436645-45a99gHaHdqJR2YVWfr3kNjx";
process.env.PORT = 8001;

const bot = new SlackBot({
  token: process.env.SLACK_SIGNING_SECRET,
  name: 'memoria'
});


exports.bot = bot;