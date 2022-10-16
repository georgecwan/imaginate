let popupOpen: boolean = false;

function getUrl(info) {
    chrome.storage.sync.get(function(storage) {
        const urlList = storage.urlList;
        if (urlList !== undefined) {
            urlList.push(info.srcUrl);
        }

        chrome.storage.sync.set({urlList: storage.urlList || [info.srcUrl]});
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

    chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.msg === "loaded") {
            popupOpen = true;
        }
        else if (request.msg === "closed") {
            popupOpen = false;
        }
    });
});
