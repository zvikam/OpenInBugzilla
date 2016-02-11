function serverObject(type, name, url){
	this.name = name;
	this.type = type;
	this.url = url;
}

function updateUI(){
	var serverList = getServerList();

	$('#bugzillaServers').find('option').remove().end();
	$.each( serverList, function( key, value ) {
		$('#bugzillaServers').append('<option value="' + value.url + '"> ' + value.url + '</option>');
	});
	$('#newBugzillaServer').val("");
	$('#newBugzillaServerAlias').val("");
	
	chrome.extension.getBackgroundPage().window.location.reload();
}

function getServerList(){
	var serverList = [];
	try{
		serverList = JSON.parse(localStorage["serverList"]);
	}
	catch (e) {}
	
	return serverList;
}

function addToList(type, name, url){
	var serverList = getServerList();
	
	if ((name == undefined) || (name == ""))
		name = "Server " + serverList.length;
	serverList.push(new serverObject(type, name, url));
	localStorage["serverList"] = JSON.stringify(serverList);
	updateUI();
}

function removeFromList(url){
	var serverList = getServerList();
	
	for (index = 0; index < serverList.length; index++){
		if (serverList[index].url == url){
			serverList.splice(index, 1);
			break;
		}
	}
	localStorage["serverList"] = JSON.stringify(serverList);
	updateUI();
}

$(function(){
	$(document).ready(function(){
		$('#newBugzillaServer').keypress(function(e){
			if(e.keyCode==13)
				$('#addServerButton').click();
		});
	});
	$(document).on('click','#addServerButton',function(){
		var value = $('#newBugzillaServer').val();
		var alias = $('#newBugzillaServerAlias').val();
		var type = $('#serverType:checked').val().toString();
		
		if (value != undefined) {
			$.ajax({
				url: value.toString(),
				type: 'HEAD',
				error: function (err) {
					if (err.status == 0)
						addToList(type, alias, value);
					else
						alert("Can't access " + value.toString());
				}
			});
		}
	});
	$(document).on('click','#removeServerButton',function(){
		removeFromList($("#bugzillaServers option:selected").val().toString());
	});
	updateUI();
	/*
	var serverListStr = localStorage["serverList"];
	if ((serverListStr != undefined) && (serverListStr != null)){
		var serverList = serverListStr.split(",");
		$.each( serverList, function( key, value ) {
			$('#bugzillaServers').append('<option value="' + value.url + '"> ' + value.url + '</option>');
		});
	}
	*/
});
