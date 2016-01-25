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
		if ((list != undefined) && (list != null) && (list != ""))
			chrome.tabs.create({url: info.menuItemId.toString() + '/buglist.cgi?quicksearch=' + list});
	});
}

chrome.contextMenus.removeAll();
var children = []; 
var serverListStr = localStorage["serverList"];
if ((serverListStr != undefined) && (serverListStr != null)) {
	var serverList = serverListStr.split(",");
	if (serverList.length > 0)
		children.push(chrome.contextMenus.create({"title": "List of Bugzilla servers", "id": "dummy", "type": "separator", "contexts": ["all"]}));
	for (var i = 0; i < serverList.length; i++) {
		children.push(chrome.contextMenus.create({"title": "Bugzilla " + i, "id": serverList[i].toString(), "contexts": ["all"], "onclick": genericOnClick}));
	}
}

