chrome.storage.sync.get(['urlList'], function(result) {
    const { urlList } = result;
    const temp = document.createElement('img');
    temp.src = "https://www.w3schools.com/images/lamp.jpg";
    document.getElementById('imageList').appendChild(temp);
    console.log(urlList);
    if (urlList !== undefined) {
        for (let i = 0; i < urlList.length; i++) {
            const img = document.createElement('img');
            img.src = urlList[i];
            document.getElementById('imageList').appendChild(img);
            console.log(urlList[i]);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const refresh = document.getElementById('refresh');

    refresh.addEventListener('click', function() {
        window.location.reload();
    });

    const clearButton = document.getElementById('clearImages');

    clearButton.addEventListener('click', function() {
        chrome.storage.sync.set({urlList: []});
        window.location.reload();
    });
});
