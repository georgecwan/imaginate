chrome.storage.sync.get(['urlList'], function(result) {
    const { urlList } = result;
    document.getElementById('imageList').innerHTML = "HELLO WORLD";
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
