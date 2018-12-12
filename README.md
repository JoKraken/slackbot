# MobileProject slackbot

This is the node.js code for the slackbot. With this slackbot you can show/add/edit/delete guidlelines/tags/events. You can use the following commands:
```
@slackbotname
... guidelines             (show all guidelines for communication)
... tags                   (show all the tags that are in use)
... event all [#tag]       (show all events, filter with #tag)
... event create           (information how to create an event) 
```

Also there is an weekly update on every monday of all the events that are coming up the next week.

## Getting Started

To start the Project please download the project and run the following comands:
```
# Install dependencies
npm install

# Serve on localhost:8001
npm start oder nodemon

# Create bot in Slack and generate and include your OAuth bot token and the Signing Secret in the .env
```

## Still to do

There are some things there are not finish yet and if I had the time I would implement:

1. implement user endpoints
2. implement notification endpoints 
3. schedule: daily notification for the events the user has been asigned to
4. fixed the problem with the interactive components (express.js)


## App Info

### Author

Johanna Kraken with Team Blank

### Version

1.0.0

### License

This project is licensed under the MIT License
