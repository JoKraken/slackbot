
//sample data

// var exports = module.exports = {};

var Tag = class Tag {
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}
exports.Tag = Tag;
var Guidline = class Guidline {
    constructor(id, name, text){
        this.id = id;
        this.name = name;
        this.text = text;
    }
}
exports.Guidline = Guidline;
var Event = class Event {
    constructor(id, title, des, date){
        this.id = id;
        this.title = title;
        this.description = des;
        this.date = date;
        this.start_time = "";
        this.end_time = "";
        this.noti_date = new Date();
        this.not_id = 0;
        this.link = "";
    }
}
exports.Event = Event;
var User = class User {
    constructor(id, slack_user_id, name){
        this.id = id;
        this.slack_user_id = slack_user_id;
        this.name = name;
    }
}
exports.User = User;
var Notification = class Notification{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}
var eventTag = class EventTag{
    constructor(id, eid, tid){
        this.id = id;
        this.event_id = eid;
        this.tag_id = tid;
    }
}
var userEvent = class UserEvent{
    constructor(id, eid, uid){
        this.id = id;
        this.event_id = eid;
        this.user_id = uid;
        this.noti_date = new Date();
        this.noti_id = 0;
    }
}
var eventArray = [];
exports.event = eventArray;

var userArray = [];
exports.user = userArray;

var notiArray_art = [];
notiArray_art.push(new Notification(0, "NO"));notiArray_art.push(new Notification(1, "SLACK"));
notiArray_art.push(new Notification(2, "EMAIL"));notiArray_art.push(new Notification(3, "BOTH"));
exports.noti_art = notiArray_art;

var notiArray_time = [];
notiArray_time.push(new Notification(0, "morning"));notiArray_time.push(new Notification(1, "day before"));notiArray_time.push(new Notification(2, "week before"));
exports.noti_time = notiArray_time;

var eventTagArray = [];
exports.eventTag = eventTagArray;

var userEventArray = [];
exports.userEvent = userEventArray;

    