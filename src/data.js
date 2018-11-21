
// var exports = module.exports = {};

var Tag = class Tag {
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}
var Guidline = class Guidline {
    constructor(id, name, text){
        this.id = id;
        this.name = name;
        this.text = text;
    }
}
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

var tagArray = [];
tagArray.push(new Tag(0, "general"));tagArray.push(new Tag(1, "Helsinki"));tagArray.push(new Tag(2, "development"));tagArray.push(new Tag(3, "managment"));tagArray.push(new Tag(4, "after work"));
tagArray.push(new Tag(5,"marketing"));tagArray.push(new Tag(6, "training"));tagArray.push(new Tag(7, "meeting"));tagArray.push();tagArray.push();
exports.tags = tagArray;

var guidlineArray = [];
guidlineArray.push(new Guidline(0, "language", "For a better understanding of non-Finnish speakers, the English language should be preferred."));
guidlineArray.push(new Guidline(1, "tags", "To have a better conection between slack and confuence we decided to use the same tags in both. \nTo see the tags plese use <@UE743CUJZ> tags"));
exports.guidlines = guidlineArray;

var eventArray = [];
exports.event = eventArray;

var userArray = [];
exports.user = userArray;

var notiArray = [];
notiArray.push(new Notification(0, "morning"));notiArray.push(new Notification(1, "day before"));notiArray.push(new Notification(2, "week before"));
exports.noti = notiArray;

var eventTagArray = [];
exports.eventTag = eventTagArray;

var userEventArray = [];
exports.userEvent = userEventArray;

    