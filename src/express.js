//the conection to the interactive components is not working

// Import dependencies
const { createMessageAdapter } = require('@slack/interactive-messages');
const express = require('express');

// Create the adapter using the app's signing secret
const slackInteractions = createMessageAdapter(process.env.SLACK_SINGING_SECRET);

// Initialize an Express application
const app = express();

// Attach the adapter to the Express application as a middleware
// NOTE: The path must match the Request URL and/or Options URL configured in Slack
app.use('/slack/actions', slackInteractions.expressMiddleware());

const port = process.env.PORT || 8001;

// Start the express application server
app.listen(port, () => {
  console.log('Server listen on port ' + port);
});

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

slackInteractions.options({ type: 'button' }, (payload, response) => {
    console.log("button: juhu");
    console.log(response);
    console.log(payload);
});

slackInteractions.action({ type: 'select' } , (payload, response) => {
    console.log("select: juhu");
    console.log(response);
    console.log(payload);
});