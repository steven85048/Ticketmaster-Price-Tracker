var Influx = require('influx');
var express = require('express');
var http = require('http');
var os = require('os');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var app = express()

var apiCode = "4b9Nw9xfcvfZQwmYpeof3PIo0uNWOQql";

var influx = new Influx.InfluxDB({
  database: 'ticketmaster',
  host: '10.144.159.63',
  port: 8086,
});

function task() {
	console.log("running");
	updateAllDatabases();
	setTimeout(task, 10000);
}

task();

function updateAllDatabases(){
	influx.getMeasurements().then(names => {
		for (var i = 0 ; i < names.length; i++){
			influx.query("select * from user" + (i+1)).then(results => {
			console.log(results);
			
			var dupArray = [];
			for (var j = 0 ; j < results.length; j++)
				dupArray.push(JSON.stringify( results[j].eventID));
			
			var uniqueArray = dupArray.unique();
			
			getTicketAnalytics(uniqueArray, i);
			});
		}
	});
}

function getTicketAnalytics(eventIds, index){

	for (var i = 0 ; i < eventIds.length; i++){
		
		var url = 'https://app.ticketmaster.com/commerce/v2/events/' + eventIds[i] + '/offers.json?&apikey=' + apiCode;
		
		var xhr = createCORSRequest('GET', url);
	
		xhr.onload = function() {
			var responseText = xhr.responseText;
			var obj = JSON.parse(responseText);
			var prices = obj.prices.data;
			
			var lowestPrice = prices[0].attributes.value;
			
			console.log(lowestPrice);
			
			
			influx.writeMeasurement("user" + index, [{
				tags: { eventID: eventIds[i] },
				fields: {ticketPrice: Integer.parseInt(lowestPrice) }
				}]);
			
		}
	
		xhr.send();
	}
}

// prevents array duplicates
Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

// Create the XHR object.
function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
	// XHR for Chrome/Firefox/Opera/Safari.
	xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
	// XDomainRequest for IE.
	xhr = new XDomainRequest();
	xhr.open(method, url);
	} else {
	// CORS not supported.
	xhr = null;
	}
	return xhr;
}