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
var apiCode = "4b9Nw9xfcvfZQwmYpeof3PIo0uNWOQql";

function getDataFromTextFields(){

	console.log("asdf");

	var name = document.getElementById("name").value;
	var type = document.getElementById("type").value;

	var totalSearch = name + " " + type;

	var url = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=' + totalSearch + '&apikey=' + apiCode;

	var xhr = createCORSRequest('GET', url);
	
	xhr.onload = function() {
		console.log("FINISHED!");
		var responseText = xhr.responseText;
		var obj = JSON.parse(responseText);
		var data = parseJSONObject(obj);
		addTable(data);
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

function addTable(data) {
	var stock = new Array();
	
	for(var i = 0; i < data.length; i++){
		var event = data[i];
		
		var name = event.name;
		var type = event.type;
		var id = event.id;
		var url = event.url;
		
		var mainArr = new Array(name, type, id, url);
		stock[i] = mainArr;
	}

    var myTableDiv = document.getElementById("metric_results");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
			
    table.border = '1';
    table.appendChild(tableBody);

    var heading = new Array();
    heading[0] = "Name";
    heading[1] = "Type";
    heading[2] = "ID";
    heading[3] = "URL";

    //TABLE COLUMNS
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    for (i = 0; i < heading.length; i++) {
        var th = document.createElement('TH');
        th.width = '275';
        th.appendChild(document.createTextNode(heading[i]));
        tr.appendChild(th);
    }
    //TABLE ROWS
    for (i = 0; i < stock.length; i++) {
		var tr = document.createElement('TR');
		for (j = 0; j < stock[i].length; j++) {
			var td = document.createElement('TD');
			td.appendChild(document.createTextNode(stock[i][j]));
			tr.appendChild(td);
		}
		tableBody.appendChild(tr);
	}
	myTableDiv.appendChild(table);

}


