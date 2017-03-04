document.addEventListener('DOMContentLoaded', function() {
	var checkPageButton = document.getElementById('checkPage');
	checkPageButton.addEventListener('click', function() {
	chrome.tabs.getSelected(null, function(tab){
    console.log("current tab is " + tab);
	});
	chrome.windows.getAll({populate:true}, getAllOpenWindows);

		function getAllOpenWindows(winData) {

			var tabs = [];
			for (var i in winData) {
				if (winData[i].focused === true) {
					var winTabs = winData[i].tabs;
					var totTabs = winTabs.length;
					for (var j=0; j<totTabs;j++) {
					tabs.push(winTabs[j].url);
					console.log(winTabs[j].url);
					}
				}
			}
		console.log(tabs);
		}
	}, false);	
}, false);