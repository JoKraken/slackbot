// var exports = module.exports = {};

exports.dropdown =  function(textFirst, textSeound, textThird, callback_id, options){
    var string = {
        "text": textFirst,
        "response_type": "in_channel",
        "attachments": [
            {
                "text": textSeound,
                "color": "#3AA3E3",
                "attachment_type": "default",
                "callback_id": callback_id,
                "actions": [
                    {
                        "name": "list",
                        "text": textThird,
                        "type": "select",
                        "options": options
                    }
                ]
            }
        ]
    };

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