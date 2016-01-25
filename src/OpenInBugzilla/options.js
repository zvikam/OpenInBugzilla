function commit2Storage(){
	var serverList = [];
	$("#bugzillaServers option").each(function()
	{
		serverList.push($(this).val());
	});
	if (serverList.length == 0)
		localStorage.removeItem("serverList");
	else
		localStorage["serverList"] = serverList;
	chrome.extension.getBackgroundPage().window.location.reload();
}

function addToList(value){
	$('#bugzillaServers').append('<option value="' + value + '"> ' + value + '</option>');
	$('#newBugzillaServer').val("");
	commit2Storage();
}

$(function(){
	$(document).ready(function(){
		$('#newBugzillaServer').keypress(function(e){
			if(e.keyCode==13)
				$('#addServerButton').click();
		});
	});
	$(document).on('click','#addServerButton',function(){
		var value = $('#newBugzillaServer').val().toString();
		
		$.ajax({
			url: value,
			type: 'HEAD',
			error: function (err) {
				if (err.status == 0)
					addToList(value);
				else
					alert("Can't access " + value);
			}
		});
	});
	$(document).on('click','#removeServerButton',function(){
		$("#bugzillaServers option:selected").remove();
		commit2Storage();
	});
	var serverListStr = localStorage["serverList"];
	if ((serverListStr != undefined) && (serverListStr != null)){
		var serverList = serverListStr.split(",");
		$.each( serverList, function( key, value ) {
			$('#bugzillaServers').append('<option value="' + value + '"> ' + value + '</option>');
		});
	}
});
