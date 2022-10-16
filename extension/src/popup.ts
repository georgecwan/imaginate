chrome.storage.local.get(['urlList'], function(result) {
    const { urlList } = result;
    console.log(urlList);
    const imageList = document.getElementById("imageList");
    const noImages = document.getElementById("noImages");
    if (urlList !== undefined && urlList.length > 0) {
        imageList.style.display = "grid";
        noImages.style.display = "none";
        urlList.forEach((url, i) => {
            const img = document.createElement('img');
            img.src = url;
            if (img.width / img.height > 1.3) {
                img.style.gridColumn = "span 2 / span 2";
                console.log("WIDE IMAGE");
            }
            imageList.appendChild(img);
            console.log(url);
        })
    } else {
        // No images are present at the moment
        imageList.style.display = "none";
        noImages.style.display = "block";
    }
});

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.msg === "refresh") {
            window.location.reload();
        }
    }
);

document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ msg: "loaded" });
    chrome.runtime.connect({ name: "popup" });

    const clearButton = document.getElementById('clearImages');

    clearButton.addEventListener('click', function() {
        chrome.storage.local.set({ urlList: [] });
        window.location.reload();
    });
});

document.addEventListener('pageHide', function() {
    chrome.runtime.sendMessage({ msg: "closed" });
});
