alert("background is runnig");
var timestamp = new Date().getTime;

var number_of_opened_tabs = 0;

var tabList = [];


chrome.runtime.onMessage.addListener(function(response,sender,sendResponse){
    alert(response);
});

chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.create({url:chrome.extension.getURL('hello.html')});
});

chrome.tabs.onCreated.addListener(function (tab){
    number_of_opened_tabs = number_of_opened_tabs + 1;
    console.log('total opened tabs: ' + number_of_opened_tabs);
    var t = {
        id : tab.id,
        activetime : 0,
        lastActivatedtime : Number(new Date().getTime())
    };
    tabList.push(t);
    console.log(tabList);
})

chrome.tabs.onRemoved.addListener(function (id){
    number_of_opened_tabs = number_of_opened_tabs - 1;
    console.log('total opened tabs: ' + number_of_opened_tabs);
    for (var index in tabList){
        if(tabList[index].id == id){
            tabList.splice( index, 1 );
        }
    }
    console.log(tabList);
})

chrome.tabs.onActivated.addListener(function (tab){
    console.log('Tab activated : ')
    console.log(tab);
    for (var index in tabList){
        if(tabList[index].id == tab.tabId){
            var currTimestamp = Number(new Date().getTime())
            var difference = currTimestamp - tabList[index].lastActivatedtime;
            tabList[index].activetime = tabList[index].activetime + difference;
            console.log(tabList[index].activetime);
        }
    }
    
})