
//crate slack bot

// var exports = module.exports = {};

const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-482822215075-483139436645-45a99gHaHdqJR2YVWfr3kNjx',
  name: 'memoria'
});

exports.bot = bot;