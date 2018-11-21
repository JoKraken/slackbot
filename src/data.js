
// var exports = module.exports = {};

exports.tags = [
    {id: 0, name: "general"}, {id: 1, name: "Helsinki"}, {id: 2, name: "development"}, 
    {id: 3, name: "managment"}, {id: 4, name: "Helsafter workinki"}, {id: 5, name: "marketing"}, 
    {id: 6, name: "training"}, {id: 7, name: "meeting"}
];

exports.guidlines = [
    {id: 0, name: "language", text: "For a better understanding of non-Finnish speakers, the English language should be preferred."}, 
    {id: 1, name: "tags", text: "To have a better conection between slack and confuence we decided to use the same tags in both. \nTo see the tags plese use <@UE743CUJZ> tags"}
];

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