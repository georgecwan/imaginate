chrome.storage.local.get(['urlList'], function (result) {
  const {urlList} = result;
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
      // img.classList.add("rounded");
      img.addEventListener('load', () => {
        if (img.width / img.height > 1.3) {
          container.classList.add("col-span-2");
        }
      })
      const del = document.createElement('i');
      del.id = `del${i}`;
      del.className = "invisible opacity-0 bi-icons bi-x text-lg cursor-pointer absolute top-1 right-2 text-white transition duration-250 ease-in-out";
      del.addEventListener("click", () => {
        const index = parseInt(del.id.slice(3));
        chrome.storage.local.get(['urlList'], function (result) {
          const {urlList} = result;
          urlList.splice(index, 1);
          chrome.storage.local.set({urlList: urlList});
          location.reload();
        });
      });
      const modify = document.createElement('i');
      modify.id = `mod${i}`;
      modify.className = "invisible opacity-0 bi-icons bi-pencil-square text-lg cursor-pointer absolute bottom-1 right-2 text-white";
      modify.addEventListener("click", () => {
        const index = parseInt(modify.id.slice(3));
        chrome.storage.local.get(['urlList'], function (result) {
          chrome.tabs.create({'url': `/modify.html?index=${index}`})
        });
      });
      container.appendChild(img)
      container.appendChild(del);
      container.appendChild(modify);
      imageList.appendChild(container);

      container.addEventListener("mouseover", () => {
        del.classList.remove("invisible");
        modify.classList.remove("invisible");
        del.classList.add("opacity-100");
        modify.classList.add("opacity-100");
      });

      container.addEventListener("mouseout", () => {
        del.classList.add("invisible");
        modify.classList.add("invisible");
        del.classList.remove("opacity-100");
        modify.classList.remove("opacity-100");
      });

      console.log(url);
    })
  } else {
    // No images are present at the moment
    imageList.style.display = "none";
    noImages.style.display = "block";
  }
});

chrome.runtime.onMessage.addListener(
    function (request) {
      if (request.msg === "refresh") {
        location.reload();
      }
    }
);

document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.sendMessage({msg: "loaded"});
  chrome.runtime.connect({name: "popup"});

  // const clearButton = document.getElementById('clearImages');
  // clearButton.addEventListener('click', function() {
  //     chrome.storage.local.set({ urlList: [] });
  //     location.reload();
  // });
});