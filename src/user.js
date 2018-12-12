const slack = require('./bot');
const database = require('./data');

//return if user exist
exports.UserExist = function(userSlackId){
    //console.log("UserExist");
    var temp = false;
    database.user.forEach(user => {
        if(user.slack_user_id == userSlackId) temp = true;
    });

    return temp;
}

//create user
exports.createUser = function(userSlackId){
    //console.log("createUser");

    userId = (database.user.length+1);
    var newUser = new database.User();
    newUser.id = userId;
    newUser.slack_user_id = userSlackId;
    //console.log(newUser);
    database.user.push(newUser);
}