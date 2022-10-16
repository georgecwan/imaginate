function getUrl(info) {
    chrome.storage.sync.get(function(storage) {
        const urlList = storage.urlList;
        if (urlList !== undefined) {
            urlList.push(info.srcUrl);
        }

        chrome.storage.sync.set({urlList: storage.urlList || [info.srcUrl]});
        console.log(urlList);
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