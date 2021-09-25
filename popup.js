let editSite = document.getElementById("editSite");
let savePreview = document.getElementById("savePreview");

// When the editSite button is clicked, set current website contentEditable to true
editSite.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageContentEditable,
  });
});

// When the savePreview button is clicked, save the document and upload it somewhere for preview
savePreview.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: savePagePreview,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageContentEditable() {
  document.body.contentEditable = "true";
  alert("You can now edit any text on this page.");
}

// Save Page preview and generate share url
function savePagePreview() {
  console.log(document.documentElement.innerHTML);
  fetch("https://copyeditor.karmacomputing.co.uk/echo", {
      method: 'post',
      headers: {
        "Content-type": "text/html; charset=UTF-8"
      },
      body: document.documentElement.innerHTML
    })
    .then(json)
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
}
