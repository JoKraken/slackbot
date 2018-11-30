const slack = require('./bot');
const database = require('./data');

//return if user exist
exports.UserExist = function(userSlackId){
    console.log("UserExist");
    var temp = false;
    database.user.forEach(user => {
        console.log(user);
        if(user.slack_user_id == userSlackId) temp = true;
    });

    return temp;
}

//create user
exports.createUser = function(userSlackId){
    const id = userSlackId;
    console.log("createUser");
    slack.bot.getUsers().always(function(data) {
        data._value.members.forEach(user => {
            console.log(user.name);
            if(user.id == id){
                userId = (database.user.length+1);
                var newUser = new database.User();
                newUser.id = userId;
                newUser.slack_user_id = id;
                newUser.name = user.name;
                console.log(newUser);
                database.user.push(newUser);
            }
        })
        console.log(database.user);
    });
}