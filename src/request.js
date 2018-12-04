var request = require('request');
var event = require('./event');

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

//send the POST request
exports.post = function(urlEnd, body){
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
            //console.log(body);
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
            }
        }
    })
}

//send the DELETE request
exports.delete = function(urlEnd, id, func){
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
            func();
        }
    })
}