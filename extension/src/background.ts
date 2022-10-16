function getUrl(info, tab) {
  return alert(info.pageUrl + info.frameUrl + info.srcUrl);
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "addNewImage",
    "title": "Add image to gallery",
    "contexts": ["image"],
  });
  chrome.contextMenus.onClicked.addListener(getUrl);
});