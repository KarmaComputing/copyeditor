// Initalize button with user's preferred color
let editSite = document.getElementById("editSite");

// When the button is clicked, set current website contentEditable to true
editSite.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageContentEditable,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageContentEditable() {
  document.body.contentEditable = "true";
  alert("You can now edit any text on this page.");
}

