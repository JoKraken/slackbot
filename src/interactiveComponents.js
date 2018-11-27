// var exports = module.exports = {};

//create the dropdown
exports.dropdown =  function(textFirst, textSecound, textThird, callback_id, option){
    console.log("dropdown");
    var string = {
        "text": textFirst,
        "response_type": "in_channel",
        "attachments": [
            {
                "text": textSecound,
                "color": "#3AA3E3",
                "attachment_type": "default",
                "callback_id": callback_id,
                "actions": [
                    {
                        "name": "list",
                        "text": textThird,
                        "type": "select",
                        "options": option
                    }
                ]
            }
        ]
    };

    return string;
}

//create confirm button (save, delete, edit)
exports.confirmButton = function(textFirst, textSecound, callback_id){
    var string = {
        "text": textFirst,
        "attachments": [
            {
                "title": textSecound,
                "callback_id": callback_id,
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "save",
                        "text": "save",
                        "type": "button",
                        "value": "1"
                    },
                    {
                        "name": "edit",
                        "text": "edit",
                        "type": "button",
                        "value": "3"
                    },
                    {
                        "name": "delete",
                        "text": "delete",
                        "type": "button",
                        "style": "danger",
                        "value": "0",
                        "confirm": {
                            "title": "Are you sure?",
                            "text": "Do you realy like to delete this?",
                            "ok_text": "Yes",
                            "dismiss_text": "No"
                        }
                    }
                ]
            }
        ]
    };
    console.log("dropdown end");

    return string;
}


//button
/*{
"text": "<@UE743CUJZ> approved your travel request. Book any airline you like by continuing below.",
"channel": channel,
"attachments": [
    {
        "fallback": "Book your flights at https://flights.example.com/book/r123456",
        "actions": [
            {
            "type": "button",
            "text": "Book flights 🛫",
            "url": "https://flights.example.com/book/r123456"
            }
        ]
    }
]
}*/

//dropdown
/*{
"text": "Would you like to play a game?",
"response_type": "in_channel",
"attachments": [
    {
        "text": "Choose a game to play",
        "fallback": "If you could read this message, you'd be choosing something fun to do right now.",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "callback_id": "game_selection",
        "actions": [
            {
                "name": "games_list",
                "text": "Pick a game...",
                "type": "select",
                "options": [
                    {
                        "text": "Hearts",
                        "value": "hearts"
                    },
                    {
                        "text": "Bridge",
                        "value": "bridge"
                    },{
                        "text": "Checkers",
                        "value": "checkers"
                    },
                    {
                        "text": "Chess",
                        "value": "chess"
                    },
                    {
                        "text": "Poker",
                        "value": "poker"
                    },
                    {
                        "text": "Falken's Maze",
                        "value": "maze"
                    },
                    {
                        "text": "Global Thermonuclear War",
                        "value": "war"
                    }
                ]
            }
        ]
    }
]}*/