chrome.storage.local.get(['urlList'], function(result) {
    const { urlList } = result;
    console.log(urlList);
    const imageList = document.getElementById("imageList");
    const noImages = document.getElementById("noImages");
    if (urlList !== undefined && urlList.length > 0) {
        imageList.style.display = "grid";
        noImages.style.display = "none";
        urlList.forEach((url, i) => {
            const container = document.createElement("div");
            container.className = "relative";
            const img = document.createElement('img');
            img.src = url;
            img.addEventListener('load', () => {
                if (img.width / img.height > 1.3) {
                    container.classList.add("col-span-2");
                }
            })
            const del = document.createElement('i');
            del.id = `del${i}`;
            del.className = "bi-icons bi-x text-lg cursor-pointer absolute top-1 right-1 text-white";
            del.addEventListener("click", () => {
                const index = parseInt(del.id.slice(3));
                chrome.storage.local.get(['urlList'], function(result) {
                    const { urlList } = result;
                    urlList.splice(index, 1);
                    chrome.storage.local.set({urlList: urlList});
                    location.reload();
                });
            });
            const modify = document.createElement('i');
            modify.id = `mod${i}`;
            modify.className = "bi-icons bi-pencil-square text-lg cursor-pointer absolute bottom-1 right-1 text-white";
            modify.addEventListener("click", () => {
                const index = parseInt(modify.id.slice(3));
                chrome.storage.local.get(['urlList'], function(result) {
                    chrome.tabs.create( {'url': `/modify.html?index=${index}`} )
                });
            });
            container.appendChild(img)
            container.appendChild(del);
            container.appendChild(modify);
            imageList.appendChild(container);
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
            location.reload();
        }
    }
);

document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ msg: "loaded" });
    chrome.runtime.connect({ name: "popup" });

    const clearButton = document.getElementById('clearImages');
    clearButton.addEventListener('click', function() {
        chrome.storage.local.set({ urlList: [] });
        location.reload();
    });
});