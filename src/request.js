var request = require('request');
var event = require('./event');
var tag = require('./tags');
var guidelines = require('./guidelines');
var schedule = require('./schedule');

/*
    follow varibale:
    1: event
    2: tag
    3: guidelines
    4: schedule
*/

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/json'
}

//send the POST request
exports.post = function(urlEnd, body, foolow){
    var options = {
        url: process.env.SERVER_URL+urlEnd,
        method: 'POST',
        headers: headers,
        form: body
    }
    
    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body);
            if(foolow == 2){
                tag.addTagsOut(JSON.parse(body).data);
            } else if(foolow == 3){
                guidelines.addGuidelineOut(JSON.parse(body).data);
            }
        }
    })
}

//send the GET request
exports.get = function(urlEnd, follow){
    var options = {
        url: process.env.SERVER_URL+urlEnd,
        method: 'GET',
        headers: headers
    }
    
    // Start the request
    request(options, function (error, response, body) {
        // Print out the response body
        if (!error && response.statusCode == 200) {
            //console.log(JSON.parse(body));
            if(follow == 1){
                event.eventAllOut(JSON.parse(body).data);
            } else if(follow == 2){
                tag.getTagsOut(JSON.parse(body).data);
            } else if(follow == 3){
                guidelines.getGuidelinesOut(JSON.parse(body).data);
            } else if(follow == 4){
                schedule.weekScheduleEvent(JSON.parse(body).data);
            }
        }
    })
}

//send the DELETE request
exports.delete = function(urlEnd, id, follow){
    var options = {
        url: process.env.SERVER_URL+urlEnd+'/'+id,
        method: 'DELETE',
        headers: headers
    }
    
    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body);
            if(follow == 1){
                event.deleteEventOut();
            } else if(follow == 2){
                tag.deleteTagsOut();
            } else if(follow == 3){
                guidelines.deleteGuidelinesOut();
            }
        }
    })
}