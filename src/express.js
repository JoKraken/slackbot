// Import dependencies
const { createMessageAdapter } = require('@slack/interactive-messages');
//const http = require('http');
const express = require('express');

// Create the adapter using the app's signing secret, read from environment variable
const slackInteractions = createMessageAdapter("48fcb092548876d6c1f25fbe792cace9");

// Initialize an Express application
// NOTE: You must use a body parser for the urlencoded format before attaching the adapter
const app = express();

slackInteractions.action({ type: 'dialog_submission' }, (payload, response) => {
    console.log("budialog_submissiontton: juhu");
    console.log(response);
    console.log(payload);
});

slackInteractions.action({ type: 'message_action' }, (payload, response) => {
    console.log("message_action: juhu");
    console.log(response);
    console.log(payload);
});

slackInteractions.action({ type: 'button' }, (payload, response) => {
    console.log("button: juhu");
    console.log(response);
    console.log(payload);
});

slackInteractions.action({ type: 'select' } , (payload, response) => {
    console.log("select: juhu");
    console.log(response);
    console.log(payload);
});

// Attach the adapter to the Express application as a middleware
// NOTE: The path must match the Request URL and/or Options URL configured in Slack
app.use('/slack/actions', slackInteractions.expressMiddleware());

const port = process.env.PORT || 8001;

// Start the express application server
// http.createServer(app).listen(port, () => {
//   console.log(`server listening on port ${port}`);
// });

app.listen(port, () => {
  console.log('Server listen on port super ' + port);
});

app.get('/test', (req, res) => {
  console.log(req.protocol);
  res.send('test');
});

app.get('/slack/actions', (req, res) => {
  console.log(req.protocol);
  res.send('test');
});
