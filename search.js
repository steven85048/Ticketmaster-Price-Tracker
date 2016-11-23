var apiCode = "4b9Nw9xfcvfZQwmYpeof3PIo0uNWOQql";

var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

getDataFromTextFields();

function getDataFromTextFields(){
	
	var name = "music"
	var type = "";
	
	var totalSearch = name + " " + type;
	
	var url = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=' + totalSearch + '&apikey=' + apiCode;

	var xhr = createCORSRequest('GET', url);
	
	xhr.onload = function() {
		var responseText = xhr.responseText;
		var obj = JSON.parse(responseText);
		var data = parseJSONObject(obj);
		addDataToList(data);
	}
	
	xhr.send();
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

function parseJSONObject(obj){
	var dataArr = [];

	var eventList = obj._embedded.events;
	console.log(eventList);
	for (var i = 0 ; i < eventList.length; i++){
		var currEvent = eventList[i];
		
		var objData = {name : currEvent.name,
					   type : currEvent.type,
						id : currEvent.id,
						url : currEvent.url };
		
		console.log(currEvent.name);
		dataArr.push(objData);
	}
	
	return dataArr;
}

function addDataToList(data){
	
}