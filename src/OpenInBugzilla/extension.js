function getServerList(){
	var serverList = [];
	try{
		serverList = JSON.parse(localStorage["serverList"]);
	}
	catch (e) {}
	
	return serverList;
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function getBugNumber(s) {
	var prefix = "bug";
	var index = prefix.length;
	if (s.slice(0, prefix.length).toUpperCase() != prefix.toUpperCase())
		return Number.NaN;
	
	if (s.charAt(index) == '#') {
		++index;
	}
	return s.slice(index);
}

function genericOnClick(info, tab) {
	chrome.tabs.executeScript(null, {code:"window.getSelection().toString();"}, function(response){               
		var selection = response.toString();
		var items = selection.split(/[\s,]+/);
		var list = "";
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (!isNumber(item))
				item = getBugNumber(item);
			if (isNumber(item)) {
				if (i > 0)
					list += " ";
				list += item;
			}
		}
		if ((list != undefined) && (list != null) && (list != "")) {
			var serverList = getServerList();
			var itemURL = info.menuItemId.toString();
			for (index = 0; index < serverList.length; index++){
				if (serverList[index].url == itemURL){
					if (serverList[index].type == "Bugzilla")
						chrome.tabs.create({url: itemURL + '/buglist.cgi?quicksearch=' + list});
					else if (serverList[index].type == "Zendesk")
						chrome.tabs.create({url: itemURL + '/search?query=' + list});
					break;
				}
			}
		}
	});
}

chrome.contextMenus.removeAll();
var children = []; 
var serverList = getServerList();
if (serverList.length > 0)
	children.push(chrome.contextMenus.create({"title": "List of Bugzilla servers", "id": "dummy", "type": "separator", "contexts": ["all"]}));
for (var i = 0; i < serverList.length; i++) {
	children.push(chrome.contextMenus.create({"title": serverList[i].name.toString(), "id": serverList[i].url.toString(), "contexts": ["all"], "onclick": genericOnClick}));
}

