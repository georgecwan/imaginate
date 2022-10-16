let popupOpen: boolean = false;

function getUrl(info) {
    chrome.storage.sync.get(function(storage) {
        const urlList = storage.urlList;
        if (urlList !== undefined) {
            urlList.push(info.srcUrl);
        }

        chrome.storage.sync.set({urlList: storage.urlList || [info.srcUrl]});
        console.log(popupOpen);
        if (popupOpen) {
            chrome.runtime.sendMessage({msg: "refresh"});
        }
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "addNewImage",
        "title": "Add image to gallery",
        "contexts": ["image"],
    });
    chrome.contextMenus.onClicked.addListener(getUrl);
});

 chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.msg === "loaded") {
            popupOpen = true;
        }
    }
 );

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function() {
           popupOpen = false;
        });
    }
});
