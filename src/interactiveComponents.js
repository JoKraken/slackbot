// var exports = module.exports = {};

//create the dropdown
exports.dropdownAtta =  function(textSecound, textThird, callback_id, option){
    var string = {
        "text": textSecound,
        "color": "#3AA3E3",
        "fallback": "You are unable to choose",
        "callback_id": callback_id,
        "actions": [
            {
                "name": "list",
                "text": textThird,
                "type": "select",
                "options": option
            }
        ]
    };

    return string;
}



//create confirm button (save, delete, edit)
exports.confirmButtonAtta = function(textSecound, callback_id){
    var string = {
        "title": textSecound,
        "callback_id": callback_id,
        "fallback": "You are unable to click a button",
        "color": "#3AA3E3",
        "actions": [
            {
                "name": "save",
                "text": "save",
                "type": "button"
            },
            {
                "name": "edit",
                "text": "edit",
                "type": "button",
                "value": "2"
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
    };

    return string;
}